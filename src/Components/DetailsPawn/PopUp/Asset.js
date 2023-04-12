import React, { useEffect, useState } from 'react'
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import axios from 'axios';
import moment from 'moment';
import './popup.css'
import CreateIcon from '@mui/icons-material/Create';
import callAPI from '../../../API';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { UploadDropzone } from 'react-uploader';
import { Uploader } from 'uploader';

function Asset({ showContractId }) {

    //Ép kiểu dữ liệu date
    const formatDate = (value) => {
        return moment(value).format('MM/DD/YYYY');
    }

    //Ép kiểu dữ liệu vnd
    const formatVND = (value) => {
        return Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
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


    return (
        <div className="contents">
            <h2> Lịch sử đóng tiền lãi</h2>
            <TableContainer>
                <Table
                    sx={{ minWidth: '700px', '&:last-child td, &:last-child ': { border: 0 } }}
                    aria-label="simple table"
                >
                    <TableHead
                        sx={{ '&:last-child td, &:last-child th': { borderRadius: "10px" } }}
                        style={{ borderRadius: "10px"}}
                    >
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: "1px solid rgba(0, 0, 0, 0.1)", background: "#167F92", textAlign: "center",color:"#fff" } }}
                            style={{ borderRadius: "5px" }}
                        >
                            <TableCell>Tên tài sản</TableCell>
                            <TableCell>Kho lưu trữ</TableCell>
                            <TableCell>Biên nhập kho</TableCell>
                            <TableCell>Biên xuất kho</TableCell>
                            <TableCell>Giao dịch viên</TableCell>
                            <TableCell>Ghi chú</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }} sx={{ '&:last-child td, &:last-child th': { background: "rgba(80, 157, 168, 0.2)", textAlign: "center" } }}>
                        <TableRow style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }} sx={{ '& td, & th': { textAlign: "center" } }}>
                            <TableCell>Xe SH trắng</TableCell>
                            <TableCell>Kho 1</TableCell>
                            <TableCell>
                                <Button /* style={{ border: "2px solid #000", width: "30px", height: "30px", borderRadius: "10px", margin: "0 auto" }} */>
                                    <CreateIcon />
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button /* style={{ border: "2px solid #000", width: "30px", height: "30px", borderRadius: "10px", margin: "0 auto" }} */>
                                    <CreateIcon />
                                </Button>
                            </TableCell>
                            <TableCell>User1</TableCell>
                            <TableCell>
                                <input
                                    style={{ padding: "5px", borderRadius: "5px", border: "1px solid rgba(0, 0, 0, 0.1)", backgroundColor: "rgba(80, 157, 168, 0.1)", borderRadius: "10px" }}
                                    type="text"
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow style={{ height: "200px" }} sx={{ '&:last-child td, &:last-child th': { border: "1px solid rgba(0, 0, 0, 0.1)" } }} >
                            <h3 style={{ padding: "10px" }}>Upload hình ảnh chứng từ</h3>
                            <UploadDropzone uploader={uploader}
                                options={uploaderOptions}
                                onUpdate={files => console.log(files.map(x => x.fileUrl).join("\n"))}
                                onComplete={files => {
                                   /*  handleImg(files, item.interestDiaryId); */
                                    alert(files.map(x => x.fileUrl).join("\n"))
                                }}
                                width="600px"
                                height="375px" />
                        </TableRow>
                        <TableRow style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }} sx={{ '& td, & th': { textAlign: "center" } }}>
                            <TableCell>Xe SH trắng</TableCell>
                            <TableCell>Kho 1</TableCell>
                            <TableCell>
                                <Button /* style={{ border: "2px solid #000", width: "30px", height: "30px", borderRadius: "10px", margin: "0 auto" }} */>
                                    <CreateIcon />
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button /* style={{ border: "2px solid #000", width: "30px", height: "30px", borderRadius: "10px", margin: "0 auto" }} */>
                                    <CreateIcon />
                                </Button>
                            </TableCell>
                            <TableCell>User1</TableCell>
                            <TableCell>
                                <input
                                    style={{ padding: "5px", borderRadius: "5px", border: "1px solid rgba(0, 0, 0, 0.1)", backgroundColor: "rgba(80, 157, 168, 0.1)", borderRadius: "10px" }}
                                    type="text"
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow style={{ height: "200px" }} sx={{ '&:last-child td, &:last-child th': { border: "1px solid rgba(0, 0, 0, 0.1)" } }} >
                            <h3 style={{ padding: "10px" }}>Upload hình ảnh chứng từ</h3>
                            <UploadDropzone uploader={uploader}
                                options={uploaderOptions}
                                onUpdate={files => console.log(files.map(x => x.fileUrl).join("\n"))}
                                onComplete={files => {
                                   /*  handleImg(files, item.interestDiaryId); */
                                    alert(files.map(x => x.fileUrl).join("\n"))
                                }}
                                width="600px"
                                height="375px" />
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    )
}

export default Asset