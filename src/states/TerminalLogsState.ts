import { hookstate } from "@hookstate/core";
import * as peggy from "peggy";

export interface TerminalLogInterface  {
    type: "info" | "error" | "warning" | "success";
    message: string,
    location?: peggy.LocationRange,
}

export const terminalLogsState = hookstate<TerminalLogInterface[]>([
    //{type: "success", message: "You have successfully made your way to peggy-ui!"},
    //{type: "warning", message: "@suren-atoyan hello suren, in your provided example the editor does indeed auto resize, but only the code view, not the monaco container, in other words it's resizing internally/virtually, that's why it has a vertical slider, i seek for autoresize for both the code view and the editor container so all the code is visible and without the slider, this behaviour option is built-in (or default) in editors like codemirror editor -> example and ace editor ->xample, try to add new lines on those examples, you'll get what i mean. Maybe monaco does not have an built in option to enable this behaviour, the container will retain it's fixed size once provided as @KalebMatthews commented ."},
    //{type: "error", message: "@suren-atoyan hello suren, in your provided example the editor does indeed auto resize, but only the code view, not the monaco container, in other words it's resizing internally/virtually, that's why it has a vertical slider, i seek for autoresize for both the code view and the editor container so all the code is visible and without the slider, this behaviour option is built-in (or default) in editors like codemirror editor -> example and ace editor ->xample, try to add new lines on those examples, you'll get what i mean. Maybe monaco does not have an built in option to enable this behaviour, the container will retain it's fixed size once provided as @KalebMatthews commented ."},
    //{type: "info", message: "@suren-atoyan hello suren, in your provided example the editor does indeed auto resize, but only the code view, not the monaco container, in other words it's resizing internally/virtually, that's why it has a vertical slider, i seek for autoresize for both the code view and the editor container so all the code is visible and without the slider, this behaviour option is built-in (or default) in editors like codemirror editor -> example and ace editor ->xample, try to add new lines on those examples, you'll get what i mean. Maybe monaco does not have an built in option to enable this behaviour, the container will retain it's fixed size once provided as @KalebMatthews commented ."}
])