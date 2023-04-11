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
        'vs-dark', 'light'
    ]

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                hideBackdrop
                transitionDuration={0}
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
                                value={uioptions.fontSize.get()}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                onChange={(e, v) => uioptions.fontSize.set(v as number || 0)}
                                min={9}
                                max={30}
                            />
                        </Box>
                    </FormControl>
                    <FormControl fullWidth style={{ minWidth: 400 }}>
                        <Box sx={{ width: "100%" }} mt={3}>
                            <Typography>Tab Size</Typography>
                            <Slider
                                aria-label="Tab Size"
                                value={uioptions.tabSize.get()}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                onChange={(e, v) => uioptions.tabSize.set(v as number || 0)}
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