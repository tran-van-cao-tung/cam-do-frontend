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
import PageHeader from '../../helpers/PageHeader';
import StatisticCard from '../../helpers/StatisticCard';
import { AccountBalance } from '@mui/icons-material';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentIcon from '@mui/icons-material/Assignment';

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
    totalPage: 1,
};

const Home = () => {
    const history = useNavigate();

    const [homePage, setHomePage] = useState();
    const { token, authState, currentBranchId } = useContext(AuthContext);

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
        if (currentBranchId) {
            API({
                method: 'get',
                url: `/contract/homepage/${currentBranchId}`,
            }).then((res) => {
                setHomePage(res.data);
            });
        }
    }, [currentBranchId]);

    //Ép kiểu dữ liệu date

    const handlePagination = (e, value) => {
        setPage(value);
    };

    useEffect(() => {
        //Get all log contract

        API({
            method: 'get',
            url: `/logContract/all/0`,
        }).then((res) => {
            setLogContract(res.data);
        });
    }, [page]);

    const statisticData = useMemo(
        () => [
            {
                Icon: AccountBalance,
                label: 'VỐN ĐẦU TƯ',
                value: homePage ? formatMoney(homePage.fund) : '0 VNĐ',
                iconColor: '#FF9F43',
                bgColor: 'rgba(249, 110, 111, 0.12)',
            },
            {
                Icon: AssignmentIcon,
                label: 'HỢP ĐỒNG MỞ',
                value: homePage ? homePage.openContract : '0',
                iconColor: '#00a600',
                bgColor: 'rgba(40, 199, 111, 0.12)',
            },
            {
                Icon: AssignmentLateIcon,
                label: 'HỢP ĐỒNG TRỄ HẸN',
                value: homePage ? homePage.lateContract : '0',
                iconColor: '#ea5455',
                bgColor: 'rgba(234, 84, 85, 0.12)',
            },
            {
                Icon: AssignmentTurnedInIcon,
                label: 'HỢP ĐỒNG THANH LÝ',
                value: homePage ? homePage.liquidationContract : '0',
                iconColor: '#1a2850',
                bgColor: 'rgba(26, 40, 80, 0.12)',
            },
        ],
        [homePage],
    );
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PageHeader title="Trang chủ" />
            </Grid>
            {statisticData.map((i, index) => (
                <Grid item key={index} lg={3} md={6} xs={12}>
                    <StatisticCard {...i} label={i.label.toLocaleLowerCase()} />
                </Grid>
            ))}

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
                    <div>
                        <Stack spacing={2}>
                            <Pagination
                                style={{ margin: '0 auto' }}
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
    );
};

export default Home;
