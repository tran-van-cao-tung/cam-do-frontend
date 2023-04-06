import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import { Uploader } from 'uploader';
import moment from 'moment';
import { UploadDropzone } from 'react-uploader';
import callAPI from '../../../API';

function PayInterest({ showContractId }) {

    //xử lý dữ liệu đóng tiền lãi
    const [check, setCheck] = useState();
    const [show, setShow] = useState([]);
    const [paidMoney, setPaidMoney] = useState(0);
    const [values, setValues] = useState([]);


    const [interestDiary, setInterestDiary] = useState([])
    useEffect(() => {
        const id = showContractId;
        console.log(id)
        callAPI({
            method: 'get',
            url: `interestDiary/getInterestDiariesByContractId${id}`,
        }).then((res) => {
            setInterestDiary(res.data)
        });
        console.log(interestDiary)

    }, [showContractId, check])

    const [dis, setDis] = useState(false);
    const handleCheckbox = (e, id) => {
        if (e.target.checked) {
            setCheck(id);
            setShow({ ...show, [id]: id });
            setDis(true);
        }
        else {
            setShow({ ...show, [id]: 0 });
            setDis(false);
        }
    }
    useEffect(() => {
        const id = check;
        callAPI({
            method: 'put',
            url: `interestDiary/updateInterestDiary/${id}?paidMoney=${paidMoney}`,
        }).then((res) => {
            if (res.data) {
                setValues({ ...values, [id]: paidMoney })
            }
        });
    }, [dis, check])

    const [showNote, setShowNote] = useState([]);
    const handleNote = (id) => {
        if (showNote[`${id}`] === id) {
            setShowNote({ ...showNote, [id]: 0 })
        }
        else {
            setShowNote({ ...showNote, [id]: id })
        }
    }

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
    }


    return (
        <div className="contents">
            <h2> Lịch sử đóng tiền lãi</h2>
            <Table className="table-detailContract">
                <TableHead>
                    <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell>Ngày</TableCell>
                        <TableCell>Tiền lãi</TableCell>
                        <TableCell>Tiền khác</TableCell>
                        <TableCell>Tổng tiền</TableCell>
                        <TableCell>Tiền khách trả</TableCell>
                        <TableCell></TableCell>
                        <TableCell>Ghi Chú</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        interestDiary.map((item, index) => {
                            return (
                                <>
                                    <TableRow>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{moment(item.dueDate).format('MM/DD/YYYY')} - {moment(item.nextDueDate).format('MM/DD/YYYY')}</TableCell>
                                        <TableCell>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.payment)}</TableCell>
                                        <TableCell>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.penalty)}</TableCell>
                                        <TableCell>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.totalPay)}</TableCell>
                                        <TableCell>{
                                            show[item.interestDiaryId] === item.interestDiaryId ?
                                                <span>{values[item.interestDiaryId] ? Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(values[item.interestDiaryId]) : Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.paidMoney)}</span>
                                                :
                                                <input
                                                    type="text"
                                                    placeholder="0"
                                                    style={{ padding: "5px" }}
                                                    onChange={(e) => {
                                                        setPaidMoney(e.target.value);
                                                    }}
                                                    /* value={paidMoney} */ />
                                        }</TableCell>
                                        <TableCell>
                                            <FormGroup onClick={(e) => handleCheckbox(e, item.interestDiaryId)}>
                                                <FormControlLabel control={<Checkbox />} />
                                            </FormGroup>
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleNote(item.interestDiaryId)}>
                                                <CreateIcon />
                                            </Button >
                                        </TableCell>
                                    </TableRow>
                                    {
                                        showNote[`${item.interestDiaryId}`] === item.interestDiaryId ?
                                            (<>
                                                <TableRow style={{ height: "200px" }}>
                                                    <h3 style={{ padding: "10px" }}>Upload hình ảnh chứng từ</h3>
                                                    <UploadDropzone uploader={uploader}
                                                        options={uploaderOptions}
                                                        onUpdate={files => console.log(files.map(x => x.fileUrl).join("\n"))}
                                                        onComplete={files => {
                                                            handleImg(files, item.interestDiaryId);
                                                            alert(files.map(x => x.fileUrl).join("\n"))
                                                        }}
                                                        width="600px"
                                                        height="375px" />
                                                </TableRow>
                                            </>) : ""
                                    }
                                </>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default PayInterest