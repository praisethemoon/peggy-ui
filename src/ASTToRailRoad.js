import rr from './railroad';

function escapeFn(str){
    return str.replace("\n", "\\n", "\t", "\\t", "\r", "\\r")
}

function stringifyClass(expr, escapeFn) {
    var rawText;
    if (expr.rawText) {
      rawText = expr.rawText;
    } else {
      var inverted = expr.inverted ? '^' : '';
      var ignoreCase = expr.ignoreCase ? 'i' : '';
      var body = expr.parts
        .map(x => typeof x === "string" ? x : x.join("-"))
        .map(escapeFn)
        .map(s => s.replace(/\[|\]/g, x => "\\" + x))
        .join("");
      rawText = '['+inverted+body+']'+ignoreCase;
    }
    return rawText;
  }
  

export function createDiagram(node, ast) {
    switch(node.type) {
        case 'rule':
            return rr.Diagram(node.name, createDiagram(node.expression, ast))
        case 'text':
        case 'labeled':
        case 'named':
        case 'action':
        case 'group':
            return createDiagram(node.expression, ast)
        case 'sequence':
            return rr.Sequence(...node.elements.map(((n) => createDiagram(n, ast))))
        case 'choice':
            return rr.Choice(0, ...node.alternatives.map((n) => createDiagram(n, ast)))
        case 'optional':
            return rr.Optional(createDiagram(node.expression, ast));
        case "zero_or_more":
            return rr.ZeroOrMore(createDiagram(node.expression, ast))
        case "one_or_more":
            return rr.OneOrMore(createDiagram(node.expression, ast))
        case "rule_ref":
            return rr.NonTerminal(node.name);
        case 'literal':
            console.log('literal', node.value)
            return rr.Terminal(escapeFn(node.value), {cls: "ast-literal-node"});
        case 'class':
            return rr.Terminal(stringifyClass(node, escapeFn), {cls: "ast-class-node"});
        case 'any':
            return rr.Terminal('[any]');
        case 'simple_and':
            return createDiagram(node.expression, ast)
        case 'simple_not':
            // needs testing
            return rr.Optional(rr.Sequence(rr.End(), createDiagram(node.expression, ast)), rr.Skip() );
        case 'semantic_and':
            return rr.Terminal('[match:' + node.code + ']');
        case 'semantic_not':
            return createDiagram({
                type: 'simple_not',
                expression: {type: 'class', rawText: '[match:' + node.code + ']'}
            }, ast);
    }
    return rr.Terminal('unknown');
}

export function makeDiagram(node, ast, index) {
    /*if(!(node instanceof rr.Diagram)) {
        const diagram = createDiagram(ast.rules[index], ast);
        return rr.Diagram(ast.rules[index].name, diagram);
    }*/
    return node
}