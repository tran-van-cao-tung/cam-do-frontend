import { Close } from '@mui/icons-material';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip } from '@mui/material';
import React from 'react';

export const DIALOG_SIZE = {
    xs: 'xs',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
};

const CustomizeDiaglog = ({ title, onClose, content, action, open, maxWidth }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItem="center">
                    <Box sx={{ fontSize: '24px', fontWeight: 700 }}>{title}</Box>
                    <Tooltip title="Đóng">
                        <span>
                            <IconButton
                                onClick={onClose}
                                sx={{
                                    '&hover': {
                                        bgcolor: 'red',
                                    },
                                }}
                            >
                                <Close />
                            </IconButton>
                        </span>
                    </Tooltip>
                </Box>
            </DialogTitle>
            <DialogContent>{content}</DialogContent>
            <DialogActions>{action}</DialogActions>
        </Dialog>
    );
};

export default CustomizeDiaglog;
