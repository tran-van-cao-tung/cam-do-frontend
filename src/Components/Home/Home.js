import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './home.css';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import API from '../../API';
import { AuthContext } from '../../helpers/AuthContext';
import { Pagination, PaginationItem, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Home = () => {
    const history = useNavigate();
    const { authState } = useContext(AuthContext);
    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            history('/login');
        } else {
            console.log('Login with token');
        }
    }, []);

    useEffect(() => {
        const shouldReload = !localStorage.getItem('pageLoaded');
        if (shouldReload) {
            localStorage.setItem('pageLoaded', 'true');
            window.location.reload(false);
        }
    }, []);



    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: '22px 0 22px 27px',
        borderRadius: '10px',
        color: theme.palette.text.secondary,
    }));

    const [logContract, setLogContract] = useState([]);
   /*  useEffect(() => {
        API({
            method: 'get',
            url: `/logContract/all/2`,
        }).then((res) => {
            setLogContract(res.data);
        });
    }, [authState.branchId]);
    console.log(logContract); */



    const [homePage, setHomePage] = useState();
    useEffect(() => {
        API({
            method: 'get',
            url: `/contract/homepage/${authState.branchId}`,
        }).then((res) => {
            setHomePage(res.data);
            console.log(res.data);
        });
    }, [authState.branchId]);


    //Ép kiểu dữ liệu date
    const formatDate = (value) => {
        return moment(value).format('DD/MM/YYYY');
    };

    const formatTime = (value) => {
        return moment(value).format('HH:mm');
    };

    const formatMoney = (value) => {
        return value.toLocaleString('vi-VN') + ' VNĐ';
    };

    const [page,setPage] = useState(1);
    const handlePagination = (e,value) => {
        setPage(value);
        console.log(value);
    }

    useEffect(()=>{
        API({
            method: 'get',
            url: `/logContract/all/${page}`,
        }).then((res) => {
            setLogContract(res.data);
            console.log(res.data);
        });
    },[page])

    return (
        <div className="conten">
            <h1 className="heading">Trang chủ</h1>
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Item>
                            <p className="title">VỐN ĐẦU TƯ</p>
                            <span className="title">{homePage ? formatMoney(homePage.fund) : '0 VNĐ'}</span>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <p className="title">HỢP ĐỒNG MỞ</p>
                            <span className="title">{homePage ? homePage.openContract : '0'}</span>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <p className="title">HỢP ĐỒNG TRỄ HẸN</p>
                            <span className="title">{homePage ? homePage.lateContract : '0'}</span>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <p className="title">HỢP ĐỒNG THANH LÝ</p>
                            <span className="title">{homePage ? homePage.liquidationContract : '0'}</span>
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                            <div className="transaction">
                                <h1>Giao dịch trong tháng</h1>
                            </div>
                            <div className="content">
                                {logContract.map((item, index) => {
                                    return (
                                        <div key={index} className="detai-content">
                                            <div className="timme">
                                                <p>{formatDate(item.logTime)}</p>
                                                <span>{formatTime(item.logTime)}</span>
                                            </div>
                                            <div>
                                                <span className="colum-blue"></span>
                                            </div>
                                            <div className="create-new">
                                                <p>
                                                    <b>
                                                        {item.eventType === 1
                                                            ? 'Tạo hợp đồng'
                                                            : item.eventType === 2
                                                                ? 'Chưa đóng lãi'
                                                                : item.eventType === 3
                                                                    ? 'Đã đóng lãi'
                                                                    : item.eventType === 4
                                                                        ? 'Đóng hợp đồng'
                                                                        : ''}
                                                        :{' '}
                                                    </b>
                                                    {item.customerName}{' '}
                                                    <span>{item.debt.toLocaleString('vi-VN') + ' VNĐ'}</span>
                                                </p>
                                                <span>Tạo bởi: {item.userName}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div >
                                <Stack spacing={2} >
                                    <Pagination style={{margin:"0 auto"}} count={logContract.length > 0 ? logContract.length : 0} page={page} onChange={handlePagination} color="primary" />
                                </Stack>
                            </div>
                        </Item>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Home;
