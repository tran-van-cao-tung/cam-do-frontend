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
import callAPI from '../../API';
import { useState } from 'react';
import { Input, TextField } from '@mui/material';
import { useEffect } from 'react';
import { NumericFormat } from 'react-number-format';
import PropTypes from 'prop-types';
import { unstable_HistoryRouter, useNavigate } from 'react-router-dom';

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

const uploader = Uploader({ apiKey: 'public_FW25bDE3z6GM9yWkBESNoAkzEgWY' }); // Your real API key.
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
export default function BasicModal({ item }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [interestDiary, setInterestDiary] = useState({ paidMoney: '0', proofImg: [] });

    const [values, setValues] = React.useState({});
    const formatMoney = (value) => {
        return value.toLocaleString('vi-VN') + ' VNĐ';
    };

    const id = item.interestDiaryId;
    console.log('interestDiaryId:', id);
    console.log('contractID', item.contractId);
    const [paidMoney, setPaidMoney] = useState(0);
    const [img, setImg] = useState([]);

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
        console.log('value:', setPaidMoney);
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
    const handleImg = (files) => {
        // setImg(files.map((x) => x.fileUrl).join('\n'));

        setImg(...img, files);
        console.log('img: ', img);
    };
    const handleInput = (e) => {
        setInterestDiary({ ...interestDiary, [e.target.name]: e.target.value });
        console.log('alo', interestDiary);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const interestDiaryId = item.interestDiaryId;
        console.log('userId:', interestDiaryId);

        const data = {
            interestDiaryId: interestDiaryId,
            paidMoney: interestDiary.paidMoney,
            proofImg: img,
        };
        console.log('data:', data);
        callAPI({
            method: 'put',
            url: `interestDiary/updateInterestDiary/${interestDiaryId}`,
            data: data,
        }).then((res) => {
            alert('Chỉnh sửa Thành công!');
        });
    };
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
                            alert={(files) => {
                                files.map((x) => x.fileUrl).join('\n');
                            }}
                            width="1000px"
                            height="500px"
                        />
                        <Typography id="modal-modal-description" variant="h6" component="h2" sx={{ mt: 2 }}>
                            Tiền khách trả:
                        </Typography>
                        <Box
                            sx={{
                                '& > :not(style)': {
                                    m: 1,
                                },
                            }}
                        >
                            <TextField
                                label="Tiền khách trả"
                                onChange={(e) => handleInput(e)}
                                name="paidMoney"
                                id="formatted-numberformat-input"
                                placeholder="Please input a number more than 0"
                                InputProps={{
                                    inputComponent: NumericFormatCustom,
                                }}
                                variant="standard"
                            />
                        </Box>
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