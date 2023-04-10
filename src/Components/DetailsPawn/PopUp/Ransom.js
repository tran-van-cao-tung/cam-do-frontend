import React, { useEffect, useState } from 'react';
import './popup.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, Paper, styled, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import API from '../../../API.js';
import { Uploader } from 'uploader';
import { UploadDropzone } from 'react-uploader';
import { display } from '@mui/system';
import CurrencyFormat from 'react-currency-format';
import axios from 'axios';
const Ransom = ({ setshowdetailContract, showContractId }) => {
    // Function active button (Button Deatail Contract)
    const Item = styled(Box)(({ theme }) => ({
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

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
    const [packageInt, setPackageInt] = useState([]);
    const [totalProfit, setTotalProfit] = useState([]);
    const [totalRecived, setTotalRecived] = useState([]);

    // Axios
    useEffect(() => {
        API({
            method: 'get',
            url: 'ramsom/ransombyid/' + setshowdetailContract,
            headers: {
                "Authorization": `Bearer  ${localStorage.getItem('accessToken')}`
            },
        }).then((res) => {
            setRansom(res.data);
            // console.log('aaaaa', res.data);
        });

        API({
            method: 'get',
            url: '/contract/getContractInfoByContractId/' + setshowdetailContract,
            headers: {
                "Authorization": `Bearer  ${localStorage.getItem('accessToken')}`
            },
        }).then((res) => {
            setPackageInt(res.data.packageInterest);
            setTotalProfit(res.data.totalProfit);
            setTotalRecived(res.data.totalRecived);
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
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;


    const [img, setImg] = useState('');



    const handleImg = (url) => {
        setImg(url[0].fileUrl)
    }

    const handleSubmit = () => {
        console.log(img)
        if (img == '') {
            alert(`Chưa thêm ảnh`);
            return;
        }
        API({
            method: 'put',
            url: `ramsom/saveransom/${ransomDetail.ransomId}?proofImg=${img}`,
        }).then((res) => {
            console.log(res.data);
        });
    }

    const formatMoney = (value) => {
        return (value).toLocaleString('vi-VN') + ' VNĐ';
    }

    return (
        console.log(packageInt),
        <div>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Item sx={{ textAlign: 'right', fontWeight: 700, fontSize: '25px' }}>Thời gian chuộc đồ: </Item>
                </Grid>
                <Grid item xs={3}>
                    <Item sx={{ textAlign: 'center', fontSize: '25px', fontWeight: 700 }}>
                        {ransomDetail.status === 1 ? (
                            <span>Chuộc trước hạn</span>
                        ) : ransomDetail.status === 2 ? (
                            <span>Chuộc đúng hạn</span>
                        ) : (
                            <span>Chuộc trễ hạn</span>
                        )}
                    </Item>
                </Grid>

                <Grid item xs={3}>
                    <Item sx={{ textAlign: 'right', fontWeight: 700, fontSize: '25px' }}> Ngày chuộc đồ: </Item>
                </Grid>
                <Grid item xs={3}>
                    <Item sx={{ textAlign: 'center', fontSize: '25px' }}> {today}</Item>
                </Grid>
                <Grid item xs={3}>
                    <Item sx={{ textAlign: 'right', fontWeight: 700, fontSize: '25px' }}>Tiền cầm:</Item>
                </Grid>
                <Grid item xs={3} sx={{ textAlign: 'left' }}>
                    <Item sx={{ textAlign: 'center', color: '#107287', fontSize: '25px', fontWeight: 400 }}>
                    {ransomDetail.payment ? formatMoney(ransomDetail.payment) : "0 VNĐ"}
                    </Item>
                </Grid>
                <Grid item xs={3} sx={{ textAlign: 'center', alignItems: 'center' }}>
                    <Item sx={{ textAlign: 'right', fontWeight: 700, fontSize: '25px' }}>Tiền phạt:</Item>{' '}
                </Grid>
                <Grid item xs={3} sx={{ textAlign: 'left' }}>
                    <Item sx={{ textAlign: 'center', fontSize: '25px', color: '#107287' }}>
                        {ransomDetail.paidMoney ? formatMoney(ransomDetail.paidMoney) : "0 VNĐ"}
                    </Item>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Item sx={{ textAlign: 'right', fontSize: '25px', fontWeight: '700' }}> Tổng tiền chuộc:</Item>{' '}
                </Grid>
                <Grid item xs={6}>
                    {' '}
                    <Item sx={{ textAlign: 'left', fontSize: '25px', color: '#E83A3A' }}>
                        {ransomDetail.totalPay ? formatMoney(ransomDetail.totalPay) : "0 VNĐ"}
                    </Item>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Item sx={{ textAlign: 'right', fontSize: '25px', fontWeight: '700' }}>Hình ảnh:</Item>{' '}
                </Grid>
                <Grid item xs={6}>
                    <Item sx={{ textAlign: 'right', fontSize: '25px', fontWeight: '700' }}>
                        <UploadDropzone
                            uploader={uploader}
                            options={uploaderOptions}
                            onUpdate={(files) => { console.log(files.map((x) => x.fileUrl).join('\n')) }}
                            onComplete={(files) => {
                                handleImg(files);
                                alert(files.map((x) => x.fileUrl).join('\n'))
                            }}
                            width="1000px"
                            height="500px"
                        />
                    </Item>{' '}
                </Grid>
                <Grid item xs={12}>
                    {(packageInt >= 7 && totalRecived == (totalProfit / 2)) &&
                        <Button
                            sx={{
                                color: 'black',
                                backgroundColor: '#107287',
                            }}
                            onClick={handleSubmit}
                        >
                            Chuộc đồ
                        </Button>}

                </Grid>
            </Grid>
        </div>
    );
};

export default Ransom;
