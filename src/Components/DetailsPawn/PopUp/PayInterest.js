import React, { useEffect, useState } from 'react';
import {
    Button,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    imageListItemBarClasses,
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Uploader } from 'uploader';
import moment from 'moment';
import { UploadDropzone } from 'react-uploader';
import callAPI from '../../../API';
import BasicModal from '../../Modal/Modal';

import { NumericFormat } from 'react-number-format';
import SwipeableTextMobileStepper from './CarouselImg';
import ModalImg from './ModalImg';

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
            valueIsNumericString
            prefix="VNĐ:"
        />
    );
});

function PayInterest({ showContractId }) {
    //xử lý dữ liệu đóng tiền lãi
    const [isChecked, setIsChecked] = useState([]);
    const [check, setCheck] = useState();
    const [show, setShow] = useState([]);
    const [paidMoney, setPaidMoney] = useState(0);
    const [values, setValues] = useState([]);
    const [showCheck, setShowCheck] = useState([]);
    const [interestDiary, setInterestDiary] = useState([]);

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

    useEffect(() => {
        const id = showContractId;
        console.log('dasssssssdasdasd', id);
        callAPI({
            method: 'get',
            url: `interestDiary/getInterestDiariesByContractId/${id}`,
        }).then((res) => {
            setInterestDiary(res.data);
            for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].paidMoney > 0) {
                    setIsChecked({
                        ...isChecked,
                        [res.data[i].interestDiaryId]: res.data[i].status == 1 ? false : true,
                    });
                }
            }
            console.log('interestDiary:', interestDiary);
        });
    }, [showContractId, check]);

    const [dis, setDis] = useState(false);
    const handleCheckbox = (e, id) => {
        if (e.target.checked) {
            setShow({ ...show, [id]: id });
            setCheck(id);
            setDis(true);
        } else {
            setShow({ ...show, [id]: 0 });
            setDis(false);
        }
    };
    useEffect(() => {
        const id = check;
        callAPI({
            method: 'put',
            url: `interestDiary/updateInterestDiary/${id}`,
        }).then((res) => {
            if (res.data) {
                setValues({ ...values, [id]: paidMoney });
            }
        });
    }, [dis, check]);

    const [showNote, setShowNote] = useState([]);
    const handleNote = (id) => {
        if (showNote[`${id}`] === id) {
            setShowNote({ ...showNote, [id]: 0 });
        } else {
            setShowNote({ ...showNote, [id]: id });
        }
    };

    //Upload img

    const uploader = Uploader({ apiKey: 'public_FW25bDE3z6GM9yWkBESNoAkzEgWY' }); // Your real API key.
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

    // Axios
    /*     useEffect(() => {
            API({
                method: 'get',
                url: 'contract/uploadContractImg/' + showContractId,
            }).then((res) => {
                setRansom(res.data);
            });
        }, []); */
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    const handleImg = (img, id) => {
        const urlImg = img[0].fileUrl;
        callAPI({
            method: 'put',
            url: `interestDiary/uploadInterestImg/${id}?interestImg=${urlImg}`,
        }).then((res) => {
            console.log(res.data);
        });
    };

    const formatMoney = (value) => {
        return value.toLocaleString('vi-VN') + ' VNĐ';
    };

    const handleCheck = (e, value) => {
        setIsChecked({ ...isChecked, [e.target.name]: !isChecked[e.target.name] });
        /* console.log(e.target.checked) */
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = (id) => {
        if (showNote[`${id}`] === id) {
            setOpen({ ...showNote, [id]: 0 });
        } else {
            setOpen({ ...showNote, [id]: id });
        }
    };
    const handleClose = () => setOpen(false);

    console.log(isChecked);
    console.log(showContractId);

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
        console.log('value:', setPaidMoney);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const userId = isChecked;
        console.log('userId:', userId);
        const data = {
            userId: userId,
            paidMoney: interestDiary.paidMoney,
            proofImg: interestDiary.proofImg,
        };
        callAPI({
            method: 'put',
            url: `interestDiary/updateInterestDiary`,
            data: data,
        }).then((res) => {
            alert('Chỉnh sửa Thành công!');
        });
    };
    useEffect(() => {
        const slug = interestDiary.interestDiaryId;
        console.log('slug', slug);
        callAPI({
            method: 'get',
            url: `interestDiary/getInterestDiariesByContractId/${slug}}`,
        }).then((res) => {
            setInterestDiary(res.data);
        });
    }, [interestDiary.interestDiaryId]);
    const handleInput = (e) => {
        e.persist();
        setInterestDiary({ ...interestDiary, [e.target.name]: e.target.value });
    };
    return (
        <div className="contents">
            <h2> Lịch sử đóng tiền lãi</h2>
            <TableContainer>
                <Table
                    sx={{ minWidth: '700px', '&:last-child td, &:last-child ': { border: 0 } }}
                    aria-label="simple table"
                >
                    <TableHead
                        sx={{ '&:last-child td, &:last-child th': { borderRadius: '10px' } }}
                        style={{ borderRadius: '10px' }}
                    >
                        <TableRow
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: '1px solid rgba(0, 0, 0, 0.1)',
                                    background: '#167F92',
                                    textAlign: 'center',
                                    color: '#fff',
                                },
                            }}
                            style={{ borderRadius: '5px' }}
                        >
                            <TableCell>STT</TableCell>
                            <TableCell> Từ ngày - Đến ngày</TableCell>
                            <TableCell>Tiền lãi</TableCell>
                            <TableCell>Tiền khác</TableCell>
                            <TableCell>Tổng tiền</TableCell>
                            <TableCell>Tiền khách trả</TableCell>
                            <TableCell>Ghi Chú</TableCell>
                            <TableCell>Hình ảnh</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody
                        style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
                        sx={{ '&:last-child td, &:last-child th': { background: 'rgba(80, 157, 168, 0.2)' } }}
                    >
                        {interestDiary.map((item, index) => {
                            /* if (item.paidMoney != 0) {
                                    
                                }
                                if (show[item.interestDiaryId] === item.interestDiaryId) {
                                }
                                else {
                                    if (item.paidMoney === 0) {

                                    } else {
                                        setShow({ ...show, [item.interestDiaryId]: item.interestDiaryId });
                                    }
                                } */
                            return (
                                <>
                                    <TableRow
                                        key={index}
                                        style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}
                                        sx={{ '& td, & th': { textAlign: 'center' } }}
                                    >
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>
                                            {moment(item.dueDate).format('DD/MM/YYYY')} -{' '}
                                            {moment(item.nextDueDate).format('DD/MM/YYYY')}
                                        </TableCell>
                                        <TableCell>{formatMoney(item.payment)}</TableCell>
                                        <TableCell>{formatMoney(item.penalty)}</TableCell>
                                        <TableCell>{formatMoney(item.totalPay)}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>
                                            <span>{formatMoney(item.paidMoney)}</span>
                                        </TableCell>
                                        <TableCell>
                                            <BasicModal item={item} />
                                        </TableCell>
                                        <TableCell>
                                            <ModalImg item={item} />
                                        </TableCell>
                                    </TableRow>
                                    {showNote[`${item.interestDiaryId}`] === item.interestDiaryId ? (
                                        <>
                                            <TableRow
                                                style={{ height: '200px' }}
                                                sx={{
                                                    '&:last-child td, &:last-child th': {
                                                        border: '1px solid rgba(0, 0, 0, 0.1)',
                                                    },
                                                }}
                                            >
                                                <h3 style={{ padding: '10px' }}>Upload hình ảnh chứng từ</h3>
                                                <UploadDropzone
                                                    uploader={uploader}
                                                    options={uploaderOptions}
                                                    onUpdate={(files) =>
                                                        console.log(files.map((x) => x.fileUrl).join('\n'))
                                                    }
                                                    onComplete={(files) => {
                                                        handleImg(files, item.interestDiaryId);
                                                        alert(files.map((x) => x.fileUrl).join('\n'));
                                                    }}
                                                    width="600px"
                                                    height="375px"
                                                />
                                            </TableRow>
                                        </>
                                    ) : (
                                        ''
                                    )}
                                </>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default PayInterest;
