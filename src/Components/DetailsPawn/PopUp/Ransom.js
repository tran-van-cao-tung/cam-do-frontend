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
const Ransom = ({ showContractId, contract }) => {
    // Function active button (Button Deatail Contract)
    const Item = styled(Box)(({ theme }) => ({
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

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
    const [ransomDetail, setRansom] = useState([]);
    const [packageInt, setPackageInt] = useState([]);
    const [totalProfit, setTotalProfit] = useState([]);
    const [totalRecived, setTotalRecived] = useState([]);

    // const [contract, setContract] = useState([]);
    // useEffect(() => {
    //     const id = showContractId;
    //     console.log('contract', contract);
    //     API({
    //         method: 'get',
    //         url: `contract/getContractDetail/${id}`,
    //     }).then((response) => setContract(response.data));
    // }, [showContractId]);
    // Axios
    useEffect(() => {
        API({
            method: 'get',
            url: 'ramsom/ransombyid/' + showContractId,
            headers: {
                Authorization: `Bearer  ${localStorage.getItem('accessToken')}`,
            },
        }).then((res) => {
            setRansom(res.data);
            // setImg(res.data);
            // console.log('aaaaa', res.data);
        });

        API({
            method: 'get',
            url: '/contract/getContractInfoByContractId/' + showContractId,
            headers: {
                Authorization: `Bearer  ${localStorage.getItem('accessToken')}`,
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

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    const [img, setImg] = useState([]);

    const handleImg = (files) => {
        // setImg(files.map((x) => x.fileUrl).join('\n'));

        setImg(files);
        console.log('img: ', img);
        API({
            method: 'put',
            url: `ramsom/saveransom/${showContractId}?proofImg=${files}`,
        }).then((res) => {
            console.log('link', res.data);
        });
    };

    const handleSubmit = () => {
        console.log(img);
        if (img == '') {
            alert(`Chưa thêm ảnh`);
            return;
        }
    };

    const formatMoney = (value) => {
        return value.toLocaleString('vi-VN') + ' VNĐ';
    };

    return (
        console.log(packageInt),
        (
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
                            {ransomDetail.payment ? formatMoney(ransomDetail.payment) : '0 VNĐ'}
                        </Item>
                    </Grid>
                    <Grid item xs={3} sx={{ textAlign: 'center', alignItems: 'center' }}>
                        <Item sx={{ textAlign: 'right', fontWeight: 700, fontSize: '25px' }}>Tiền phạt:</Item>{' '}
                    </Grid>
                    <Grid item xs={3} sx={{ textAlign: 'left' }}>
                        <Item sx={{ textAlign: 'center', fontSize: '25px', color: '#107287' }}>
                            {ransomDetail.paidMoney ? formatMoney(ransomDetail.paidMoney) : '0 VNĐ'}
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
                            {ransomDetail.totalPay ? formatMoney(ransomDetail.totalPay) : '0 VNĐ'}
                        </Item>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    {contract.status === 4 ? (
                        <div
                            style={{
                                // maxWidth: '250px',
                                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                                margin: '20px auto',
                                borderRadius: '12px',
                            }}
                        >
                            <div style={{ padding: '10px', fontSize: '25px', fontWeight: '700' }}>
                                <p>Hình Ảnh Tài Sản</p>
                            </div>
                            <img style={{ maxWidth: '800px' }} src={ransomDetail.proofImg} alt="ảnh tài sản" />
                        </div>
                    ) : (
                        <div
                            style={{
                                margin: '20px auto',
                            }}
                        >
                            <div
                                style={{
                                    // maxWidth: '250px',
                                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                                    borderRadius: '12px',
                                }}
                            >
                                <div style={{ padding: '10px', fontSize: '25px', fontWeight: '700', width: '800px' }}>
                                    <p> Upload Hình ảnh:</p>
                                    <img src={img} alt="" />
                                </div>
                            </div>
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
                        </div>
                        // <>
                        //     <Grid item xs={6}>
                        //         <Item
                        //             sx={{
                        //                 textAlign: 'center',
                        //                 fontSize: '25px',
                        //                 fontWeight: '700',
                        //                 // display: 'flex',
                        //                 // alignItems: 'center',
                        //                 // justifyContent: 'center',
                        //             }}
                        //         >

                        //         </Item>
                        //     </Grid>
                        //     <Grid item xs={6}>
                        //         <Item sx={{ textAlign: 'right', fontSize: '25px', fontWeight: '700' }}>

                        //         </Item>{' '}
                        //     </Grid>
                        // </>
                    )}
                    <Grid item xs={12}>
                        {packageInt >= 7 && totalRecived == totalProfit / 2 && (
                            <Button
                                sx={{
                                    color: 'black',
                                    backgroundColor: '#107287',
                                }}
                                onClick={handleSubmit}
                            >
                                Chuộc đồ
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </div>
        )
    );
};

export default Ransom;
