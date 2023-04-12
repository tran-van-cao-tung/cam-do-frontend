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
import axios from 'axios';
import { Uploader } from 'uploader';
import moment from 'moment';
import { UploadDropzone } from 'react-uploader';
import callAPI from '../../../API';
import { Label } from '@mui/icons-material';

function PayInterest({ showContractId }) {
    //xử lý dữ liệu đóng tiền lãi
    const [isChecked, setIsChecked] = useState([]);
    const [check, setCheck] = useState();
    const [show, setShow] = useState([]);
    const [paidMoney, setPaidMoney] = useState(0);
    const [values, setValues] = useState([]);
    const [showCheck, setShowCheck] = useState([]);

    const [contract, setContract] = useState([]);
    useEffect(() => {
        const id = showContractId;
        callAPI({
            method: 'GET',
            url: `/contract/getContractDetail/${id}`,
        }).then((response) => {
            setContract(response.data);
        });
    });

    const [interestDiary, setInterestDiary] = useState([]);
    useEffect(() => {
        const id = showContractId;
        console.log(id);
        callAPI({
            method: 'get',
            url: `interestDiary/getInterestDiariesByContractId${id}`,
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
            url: `interestDiary/updateInterestDiary/${id}?paidMoney=${paidMoney}`,
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
    const [ransomDetail, setRansom] = useState([]);
    // Axios
    /*     useEffect(() => {
            API({
                method: 'get',
                url: 'contract/uploadContractImg/' + showContractId,
            }).then((res) => {
                setRansom(res.data);
            });
        }, []); */
    async function getUploadPart(params) {
        const baseUrl = 'https://api.upload.io';
        const path = `/v2/accounts/${params.accountId}/uploads/${params.uploadId}/parts/${params.uploadPartIndex}`;
        const entries = (obj) => Object.entries(obj).filter(([, val]) => (val ?? null) !== null);
        const response = await fetch(`${baseUrl}${path}`, {
            method: 'GET',
            headers: Object.fromEntries(
                entries({
                    Authorization: `Bearer ${params.apiKey}`,
                }),
            ),
        });
        const result = await response.json();
        if (Math.floor(response.status / 100) !== 2) throw new Error(`Upload API Error: ${JSON.stringify(result)}`);
        return result;
    }

    getUploadPart({
        accountId: 'kW15bAu',
        apiKey: 'public_kW15bAuFTht5jafbjpkWCsBg1M4s',
        uploadId: 'Kd759aLFxttm69kZ',
        uploadPartIndex: 7,
    }).then(
        (response) => console.log(`Success: ${JSON.stringify(response)}`),
        (error) => console.error(error),
    );
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

    var showInputOrValue = '';

    const handleCheck = (e, value) => {
        setIsChecked({ ...isChecked, [e.target.name]: !isChecked[e.target.name] });
        /* console.log(e.target.checked) */
    };

    console.log(isChecked);
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
                            <TableCell>Đóng tiền</TableCell>
                            <TableCell>Ghi Chú</TableCell>
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
                                            {show[item.interestDiaryId] == item.interestDiaryId ? (
                                                <span>
                                                    {values[item.interestDiaryId]
                                                        ? formatMoney(values[item.interestDiaryId])
                                                        : formatMoney(item.paidMoney)}
                                                </span>
                                            ) : item.paidMoney === 0 || isChecked[item.interestDiaryId] == false ? (
                                                <input
                                                    style={{
                                                        padding: '5px',
                                                        borderRadius: '5px',
                                                        border: '1px solid rgba(0, 0, 0, 0.1)',
                                                        backgroundColor: 'rgba(80, 157, 168, 0.1)',
                                                        borderRadius: '10px',
                                                    }}
                                                    type="text"
                                                    placeholder="0"
                                                    onChange={(e) => {
                                                        setPaidMoney(e.target.value);
                                                    }}
                                                />
                                            ) : (
                                                <span>{formatMoney(item.paidMoney)}</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <FormGroup onClick={(e) => handleCheckbox(e, item.interestDiaryId)}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            style={{ marginLeft: '40px' }}
                                                            name={item.interestDiaryId}
                                                            checked={isChecked[item.interestDiaryId] ? true : false}
                                                            onChange={(e) => {
                                                                handleCheck(e, item.paidMoney);
                                                            }}
                                                        />
                                                    }
                                                />
                                            </FormGroup>
                                            ) : (
                                            <FormGroup onClick={(e) => handleCheckbox(e, item.interestDiaryId)}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            style={{ marginLeft: '40px' }}
                                                            onClick={() => {
                                                                setShowCheck(!showCheck);
                                                                console.log(showCheck);
                                                            }}
                                                            checked={showCheck ? true : false}
                                                        />
                                                    }
                                                />
                                            </FormGroup>
                                            )
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleNote(item.interestDiaryId)}>
                                                <CreateIcon />
                                            </Button>
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
