import React, { useContext, useEffect, useMemo, useState } from 'react';

import Grid from '@mui/material/Grid';
import './home.css';

import API from '../../API';
import { AuthContext } from '../../helpers/AuthContext';
import { Box, Pagination, Stack } from '@mui/material';
import { formatDate, formatMoney, formatTime } from '../../helpers/dateTimeUtils';
import { isAvailableArray } from '../../helpers/utils';
import PageHeader from '../../helpers/PageHeader';
import StatisticCard from '../../helpers/StatisticCard';
import { AccountBalance } from '@mui/icons-material';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CustomizedTables from '../../helpers/CustomizeTable';

const DEFAULT = {
    pageNumber: 1,
    pageSize: 6,
    totalPage: 1,
};

const Home = () => {
    const [homePage, setHomePage] = useState();
    const { currentBranchId } = useContext(AuthContext);

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

        const start = (page - 1) * pageSize;
        const end = page * pageSize;
        return logContract.slice(start, end);
    }, [logContract, page, pageSize]);

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

    const dataTable = [
        {
            nameHeader: 'Tên Khách Hàng',
            dataRow: (element) => {
                return element.customerName;
            },
        },
        {
            nameHeader: 'Tiền',
            dataRow: (element) => {
                return element.debt.toLocaleString('vi-VN') + ' VNĐ';
            },
        },
        {
            nameHeader: 'Loại Giao Dịch',
            dataRow: (element) => {
                return element.eventType === 1
                    ? 'Tạo hợp đồng'
                    : element.eventType === 2
                    ? 'Chưa đóng lãi'
                    : element.eventType === 3
                    ? 'Đã đóng lãi'
                    : element.eventType === 4
                    ? 'Đóng hợp đồng'
                    : element.eventType === 5
                    ? 'Tiền lãi còn nợ'
                    : '';
            },
        },
        {
            nameHeader: 'Thời Gian Giao Dịch',
            dataRow: (element) => {
                return (
                    <>
                        {formatDate(element.logTime)}
                        <br />
                        {formatTime(element.logTime)}
                    </>
                );
            },
        },
        {
            nameHeader: 'Người Tạo Giao DỊch',
            dataRow: (element) => {
                return element.userName;
            },
        },
    ];

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PageHeader title="Tổng Quan" />
            </Grid>
            {statisticData.map((i, index) => (
                <Grid item key={index} lg={3} md={6} xs={12}>
                    <StatisticCard {...i} label={i.label.toLocaleLowerCase()} />
                </Grid>
            ))}

            <Grid item xs={12}>
                <Box
                    padding="20px"
                    boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
                    borderRadius="8px"
                    bgcolor="#fff"
                    fontSize="14px"
                >
                    <Box marginBottom="12px" fontWeight="700">
                        <h3>Giao dịch trong năm</h3>
                    </Box>
                    <CustomizedTables renderedData={renderedData} dataTable={dataTable} />
                    <Box marginTop="14px">
                        <Stack spacing={2}>
                            <Pagination
                                style={{ margin: '0 auto' }}
                                count={totalPage}
                                page={page}
                                onChange={handlePagination}
                                color="primary"
                            />
                        </Stack>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Home;
