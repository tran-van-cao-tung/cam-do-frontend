import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import CreateIcon from '@mui/icons-material/Create';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal({ item, refresh }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        refresh();
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>
                <CreateIcon />
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            Hình nhập kho
                            <img src={item.importImg} alt="" style={{ width: '400px', height: '300px' }} />
                        </Grid>
                        <Grid item xs={6}>
                            Hình Xuất kho
                            <img src={item.exportImg} alt="" style={{ width: '400px', height: '300px' }} />
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}
