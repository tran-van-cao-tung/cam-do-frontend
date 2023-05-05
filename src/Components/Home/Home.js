import React, { useContext, useEffect, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './home.css';
import { useNavigate } from 'react-router-dom';
import API from '../../API';
import { AuthContext } from '../../helpers/AuthContext';
import { Pagination, Stack } from '@mui/material';
import { formatDate, formatMoney, formatTime } from '../../helpers/dateTimeUtils';
import { isAvailableArray } from '../../helpers/utils';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: '22px 0 22px 27px',
    borderRadius: '10px',
    color: theme.palette.text.secondary,
}));

const DEFAULT = {
    pageNumber: 1,
    pageSize: 6,
    totalPage: 1
}

const Home = () => {
    const history = useNavigate();

    const [homePage, setHomePage] = useState();
    const { token, authState } = useContext(AuthContext);


    // State
    const [logContract, setLogContract] = useState([]);
    const [page, setPage] = useState(DEFAULT.pageNumber);
    const [pageSize] = useState(DEFAULT.pageSize);

    // Memorize
    const totalPage = useMemo(() => {
        const result = Math.ceil(logContract.length / pageSize);
        return result;
    }, [logContract?.length, pageSize]);

    const renderedData = useMemo(() => {
        if (!isAvailableArray(logContract)) return [];

        const start = (page - 1) * 6;
        const end = page * 6;
        return logContract.slice(start, end);
    }, [logContract, page]);


    useEffect(() => {
        if (!token && !localStorage.getItem('accessToken')) {
            history('/login');
        } else {
            console.log('Login with token');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    useEffect(() => {
        if (authState?.branchId) {
            API({
                method: 'get',
                url: `/contract/homepage/${authState.branchId}`,
            }).then((res) => {
                setHomePage(res.data);
            });
        }
    }, [authState.branchId]);

    //Ép kiểu dữ liệu date

    const handlePagination = (e, value) => {
        setPage(value);
    }

    useEffect(() => {
        //Get all log contract

        API({
            method: 'get',
            url: `/logContract/all/0`,
        }).then((res) => {
            setLogContract(res.data);
        });
    }, [page])

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
                                {renderedData.map((item, index) => {
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
                                    <Pagination
                                        style={{ margin: "0 auto" }}
                                        count={totalPage}
                                        page={page}
                                        onChange={handlePagination}
                                        color="primary"
                                    />
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
