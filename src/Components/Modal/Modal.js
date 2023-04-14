import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CreateIcon from '@mui/icons-material/Create';

import { Uploader } from 'uploader';
import moment from 'moment';
import { UploadDropzone } from 'react-uploader';
import FormattedInputs from '../NumberFormat/Numberformat';
import SendIcon from '@mui/icons-material/Send';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const uploader = Uploader({ apiKey: 'public_kW15bAuFTht5jafbjpkWCsBg1M4s' }); // Your real API key.
const uploaderOptions = {
    multi: true,

    // Comment out this line & use 'onUpdate' instead of
    // 'onComplete' to have the dropzone close after upload.
    showFinishButton: true,

    styles: {
        colors: {
            primary: '#377dff',
        },
    },
};
export default function BasicModal({ item }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
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
                <form>
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Upload hình ảnh chứng từ
                        </Typography>
                        <UploadDropzone
                            uploader={uploader}
                            options={uploaderOptions}
                            onUpdate={(files) => console.log(files.map((x) => x.fileUrl).join('\n'))}
                            onComplete={(files) => {
                                alert(files.map((x) => x.fileUrl).join('\n'));
                            }}
                            width="600px"
                            height="375px"
                        />
                        <Typography id="modal-modal-description" variant="h6" component="h2" sx={{ mt: 2 }}>
                            Tiền khách trả:
                        </Typography>
                        <FormattedInputs item={item} />
                        <Button
                            variant="contained"
                            sx={{ ml: 15, backgroundColor: '#167F92' }}
                            endIcon={<TaskAltIcon />}
                        >
                            Xong
                        </Button>
                    </Box>
                </form>
            </Modal>
        </div>
    );
}
