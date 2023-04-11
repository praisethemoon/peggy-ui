import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useHookstate } from '@hookstate/core';
import { editorOptionsState } from '../states/States';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Box, Slider, FormControlLabel, Checkbox } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

export const UISettingsModal: React.FC<{ open: boolean, handleClose: () => void }> = ({ open, handleClose }) => {


    const uioptions = useHookstate(editorOptionsState)

    const handleThemeChange = (event: SelectChangeEvent) => {
        uioptions.theme.set(event.target.value as string);
    };

    const editorThemes = [
        'ambiance',
        'chaos',
        'chrome',
        'cloud9_day',
        'cloud9_night',
        'cloud9_night_low_color',
        'clouds',
        'clouds_midnight',
        'cobalt',
        'crimson_editor',
        'dawn',
        'dracula',
        'dreamweaver',
        'eclipse',
        'github',
        'gob',
        'gruvbox',
        'gruvbox_dark_hard',
        'gruvbox_light_hard',
        'idle_fingers',
        'iplastic',
        'katzenmilch',
        'kr_theme',
        'kuroir',
        'merbivore',
        'merbivore_soft',
        'mono_industrial',
        'monokai',
        'nord_dark',
        'one_dark',
        'pastel_on_dark',
        'solarized_dark',
        'solarized_light',
        'sqlserver',
        'terminal',
        'textmate',
        'tomorrow',
        'tomorrow_night',
        'tomorrow_night_blue',
        'tomorrow_night_bright',
        'tomorrow_night_eighties',
        'twilight',
        'vibrant_ink',
        'xcode',
    ]

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                hideBackdrop
                open={open}

            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} >
                    UI Settings
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <FormControl fullWidth style={{ minWidth: 400 }}>
                        <InputLabel id="demo-simple-select-label">Editor Theme</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={uioptions.theme.get()}
                            label="Editor Theme"
                            onChange={handleThemeChange}
                        >
                            {editorThemes.map(e => (
                                <MenuItem key={e} value={e}>{e}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                    <FormControl fullWidth style={{ minWidth: 400 }}>
                        <Box sx={{ width: "100%" }} mt={3}>
                            <Typography>Font Size</Typography>
                            <Slider
                                aria-label="Font Size"
                                defaultValue={uioptions.fontSize.get()}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                onChange={(e, v) => uioptions.fontSize.set(v as number)}
                                min={9}
                                max={30}
                            />
                        </Box>
                    </FormControl>
                    <FormControl fullWidth style={{ minWidth: 400 }}>
                        <Box sx={{ width: "100%" }} mt={3}>
                            <Typography>Tab Size</Typography>
                            <Slider
                                aria-label="Font Size"
                                defaultValue={uioptions.tabSize.get()}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                onChange={(e, v) => uioptions.tabSize.set(v as number)}
                                min={1}
                                max={12}
                            />
                        </Box>
                    </FormControl>


                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}