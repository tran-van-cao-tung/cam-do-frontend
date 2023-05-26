import React, { useEffect, useState } from 'react';
import './popup.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, styled } from '@mui/material';
import API from '../../../API.js';
import { Uploader } from 'uploader';
import { UploadDropzone } from 'react-uploader';
import CurrencyFormat from 'react-currency-format';
import BtnSubmit from '../../ButtonUI/btnSubmit/BtnSubmit';
import BtnSave from '../../ButtonUI/BtnSave/BtnSave';
import BtnCloseAnimation from '../../ButtonUI/BtnCloseAnimation/BtnCloseAnimation';
import { toast } from 'react-toastify';

const Ransom = ({ showContractId, contract, showdetailContract, setshowdetailContract }) => {
    // Function active button (Button Deatail Contract)
    const Item = styled(Box)(({ theme }) => ({
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const uploader = Uploader({ apiKey: 'public_FW25bMK3mpqVXpSPo5c1xtLs1fF1' }); // Your real API key.
    const uploaderOptions = {
        multi: true,

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

    useEffect(() => {
        API({
            method: 'get',
            url: 'ramsom/ransombyid/' + localStorage.getItem('PawnDetailID'),
        }).then((res) => {
            setRansom(res.data);
            // setImg(res.data);
            console.log('id', res.data);
        });

        API({
            method: 'get',
            url: '/contract/getContractInfoByContractId/' + showContractId,
        }).then((res) => {
            setPackageInt(res.data.packageInterest);
            setTotalProfit(res.data.totalProfit);
            setTotalRecived(res.data.totalRecived);
            // console.log('aaaaa', res.data);
        });
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
    };

    const handleSubmit = () => {
        console.log(img);
        if (img == '') {
            toast.error(`Chưa thêm ảnh`);
            return;
        }
        API({
            method: 'put',
            url: `ramsom/saveransom/${ransomDetail.ransomId}?proofImg=${img}`,
        }).then((res) => {
            toast.success(`Chuộc đồ thành công`);

            console.log('link', res.data);
            console.log('id', ransomDetail.ransomId);
            setRansom(res.data);
            window.location.reload(false);
        });
    };

    const formatMoney = (value) => {
        return value.toLocaleString('vi-VN') + ' VNĐ';
    };

    return (
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
                        {ransomDetail.penalty ? formatMoney(ransomDetail.penalty) : '0 VNĐ'}
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
                {contract.status === 4 ? (
                    ''
                ) : (
                    <Grid item xs={12}>
                        {/* {packageInt >= 7 && totalRecived == totalProfit / 2 &&  */}
                        <Button onClick={handleSubmit}>
                            <BtnSave />
                        </Button>
                        <Button>
                            <BtnCloseAnimation
                                showdetailContract={showdetailContract}
                                setshowdetailContract={setshowdetailContract}
                            />
                        </Button>
                        {/* // )} */}
                    </Grid>
                )}
            </Grid>
        </div>
    );
};

export default Ransom;
