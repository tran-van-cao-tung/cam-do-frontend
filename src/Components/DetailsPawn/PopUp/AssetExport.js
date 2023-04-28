import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CreateIcon from '@mui/icons-material/Create';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Uploader } from 'uploader';
import { UploadDropzone } from 'react-uploader';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PropTypes from 'prop-types';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { NumericFormat } from 'react-number-format';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { TextField } from '@mui/material';
import callAPI from '../../../API';

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
    zIndex: '99',
};

const styleModal = {
    zIndex: '99',
};

const uploader = Uploader({ apiKey: 'public_W142hpZ5oMgnCoyobLDGdqTbp4NX' }); // Your real API key.
const uploaderOptions = {
    multi: true,

    showFinishButton: true,

    styles: {
        colors: {
            primary: '#377dff',
        },
    },
};

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isAllowed={(values) => {
                const { floatValue } = values;
                return floatValue >= 0;
            }}
            valueIsNumericString
            prefix="VNĐ:"
        />
    );
});

NumericFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
export default function AssetExport({ item }) {
    const [open, setOpen] = React.useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setShowMessage(false);
    };

    const [values, setValues] = React.useState({});
    const formatMoney = (value) => {
        return value.toLocaleString('vi-VN') + ' VNĐ';
    };

    // useEffect(() => {
    //     const slug = item.interestDiaryId;
    //     callAPI({
    //         method: 'get',
    //         url: `interestDiary/getInterestDiariesByContractId/${slug}}`,
    //     }).then((res) => {
    //         setInterestDiary(res.data);
    //     });
    // }, [item.interestDiaryId]);
    const [img, setImg] = useState([]);
    const handleImg = (files) => {
        // setImg(files.map((x) => x.fileUrl).join('\n'));

        setImg(files);
        console.log('img: ', img);
        setShowMessage(true);
    };
    var messageImg = '';
    if (showMessage) {
        messageImg = 'Thêm ảnh thành công!';
    }
    const history = useNavigate();
    const MySwal = withReactContent(Swal);
    const handleSubmit = (event) => {
        event.preventDefault();
        const logassetId = item.logAssetId;
        console.log('userId:', logassetId);

        if (img.length == 0) {
            Swal.fire({
                text: 'Bạn chưa nhập hết thông tin',
                icon: 'warning',
            }).then((result) => {});
            return;
        }

        const data = {
            exportImg: img,
        };
        console.log('data:', data);
        callAPI({
            method: 'put',
            url: `logAsset/updateLogAsset/${logassetId}`,
            data: data,
        }).then((res) => {
            console.log('abc', res.data);
            /* MySwal.fire({
                title: <p>Hello World</p>,
              }).then(() => {
                return MySwal.fire(<p>Shorthand works too</p>)
              }) */
            if (res.data == true) {
                Swal.fire({
                    text: 'Thêm thành công!',
                    icon: 'success',
                }).then((result) => {});
                history('/detaipawn');
            }
        });
    };

    return (
        <div>
            <Button onClick={handleOpen}>
                <CreateIcon />
            </Button>
            <Modal
                sx={styleModal}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={handleSubmit}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Upload hình ảnh chứng từ
                        </Typography>
                        <UploadDropzone
                            uploader={uploader}
                            options={uploaderOptions}
                            onUpdate={(files) => console.log(files.map((x) => x.fileUrl).join('\n'))}
                            onComplete={(files) => {
                                handleImg(files.map((x) => x.fileUrl).join('\n'));
                            }}
                            width="1000px"
                            height="500px"
                        />
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            style={{ position: 'absolute', top: '40%', left: '25%', color: '#45ba30' }}
                        >
                            <div style={{ textAlign: 'center' }}>
                                {messageImg ? (
                                    <CheckCircleOutlineIcon style={{ color: '#45ba30', fontSize: '47px' }} />
                                ) : (
                                    ''
                                )}
                            </div>
                            {messageImg ? messageImg : ''}
                        </Typography>

                        <Button
                            variant="contained"
                            type="submit"
                            sx={{ ml: 15, backgroundColor: '#167F92' }}
                            endIcon={<TaskAltIcon />}
                        >
                            Xong
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
