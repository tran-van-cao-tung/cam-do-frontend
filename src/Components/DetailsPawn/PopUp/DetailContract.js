import React, { useEffect, useState } from 'react';
import './popup.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import API from '../../../API.js';
import { Uploader } from 'uploader';
import { UploadDropzone } from 'react-uploader';
import { display } from '@mui/system';
import Ransom from './Ransom';
import BasicTabs from './Tab';
const DetailContract = ({ setshowdetailContract }) => {
    // Function active button (Button Deatail Contract)
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
    const [detailPawn, setDetailPawn] = useState([]);
    // Axios
    useEffect(() => {
        API({
            method: 'get',
            url: 'contract/getContractDetail/' + localStorage.getItem('PawnDetailID'),
        }).then((res) => {
            setDetailPawn(res.data);
            // console.log('aaaaa', res.data);
        });

        // API({
        //   method: 'get',
        //   url: 'https://api.upload.io/'
        // }).then((res) =>{

        // });
    }, []);
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
    return (
        <div className="add-contract" onClick={() => setshowdetailContract(false)}>
            <div className="content-contract" onClick={(e) => e.stopPropagation()}>
                {/* Tiêu đề */}
                <div className="heading-contract">
                    <h1>Bảng chi tiết hợp đồng cầm đồ</h1>
                </div>
                <div className="contents">
                    <div className="box__liquidation">
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <table className="table__liquidation">
                                        <tr>
                                            <th>Khách hàng</th>
                                            <th colSpan="2">
                                                <span className="start-red">{detailPawn.customerName} </span>-{' '}
                                                {detailPawn.phone}
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>Tiền cầm</th>
                                            <th colSpan="2">{detailPawn.loan}</th>
                                        </tr>
                                        <tr>
                                            <th>Vay từ ngày</th>
                                            <th>{detailPawn.contractStartDate}</th>
                                            <th>{detailPawn.contractEndDate}</th>
                                        </tr>
                                    </table>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <table className="table__liquidation">
                                        <tr>
                                            <th>Lãi xuất</th>
                                            <th colSpan="2">
                                                <span className="start-red">{detailPawn.packageInterest}%</span>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>Tiền lãi đã đóng</th>
                                            <th className="start-red">{detailPawn.interestPaid} VND</th>
                                        </tr>
                                        <tr>
                                            <th>
                                                Nợ lãi cũ:{' '}
                                                <span className="start-red">{detailPawn.interestDebt} VND</span>
                                            </th>
                                            <th>
                                                Trạng thái:{' '}
                                                {detailPawn.status === 1 ? <span>Đang Cầm</span> : <span>Trễ hẹn</span>}{' '}
                                            </th>
                                        </tr>
                                    </table>
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
                    <div sx={{ alignItems: 'center', alignContent: 'center' }}>
                        <BasicTabs />
                    </div>
                </div>
                {/* Lịch sử đóng tiền lãi */}
                {/* <div className="contents">
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
                <TableCell>...</TableCell>
                <TableCell>Ghi Chú</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell>1</TableCell>
              <TableCell>1/12/2022 - 7/12/2022</TableCell>
              <TableCell>1.000.000</TableCell>
              <TableCell>0</TableCell>
              <TableCell>1.000.000</TableCell>
              <TableCell>1.000.000</TableCell>
              <TableCell>...</TableCell>
              <TableCell>Ghi Chú</TableCell>
            </TableBody>
          </Table>
        </div> */}
                {/* Chứng từ */}
            </div>
        </div>
    );
};

export default DetailContract;
