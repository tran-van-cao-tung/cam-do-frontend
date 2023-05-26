import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../../src/API.js';
import edit from './../../asset/img/edit.png';

import { isAvailableArray } from '../../helpers/utils.js';
import CustomizedTables from '../../helpers/CustomizeTable.jsx';
import { Box, Grid, InputAdornment, Pagination, Stack, TextField } from '@mui/material';
import PageHeader from '../../helpers/PageHeader.jsx';
import { Search } from '@mui/icons-material';

const DEFAULT = {
    pageNumber: 1,
    pageSize: 6,
    totalPage: 1,
};

function ListCustomer({ numPage }) {
    const [searchAPIData, setSearchAPIData] = useState([]);
    const [onFilter, setOnFilter] = useState();

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
        API({
            method: 'GET',
            url: '/customer/getAllBlackList/0',
        }).then((response) => {
            setLogContract(response.data);
            setSearchAPIData(response.data);
            console.log(response.data);
        });
    }, []);

    const handlePagination = (e, value) => {
        setPage(value);
    };

    const onFilterChange = (e) => {
        if (e.target.value == '') {
            setSearchAPIData(searchAPIData);
        } else {
            const filterResult = searchAPIData.filter((item) =>
                item.fullName.toLowerCase().includes(e.target.value.toLowerCase()),
            );
            setSearchAPIData(filterResult);
        }
        setOnFilter(e.target.value);
    };

    function setccnd(e) {
        sessionStorage.setItem('num', e);
    }
    // ==================================
    // |            Phân Trang        |
    // ==================================
    const dataTable = [
        {
            nameHeader: 'Họ và tên',
            dataRow: (element) => {
                return element.fullName;
            },
        },
        {
            nameHeader: 'CMND/CCCD',
            dataRow: (element) => {
                return element.cccd;
            },
        },
        {
            nameHeader: 'Số điện thoại',
            dataRow: (element) => {
                return element.phone;
            },
        },
        {
            nameHeader: 'Địa chỉ',
            dataRow: (element) => {
                return element.address;
            },
        },

        {
            nameHeader: 'Chức năng',
            dataRow: (element) => {
                return (
                    <Link to={`/customer-manager/updateinfo/${element.customerId}`}>
                        <img src={edit} alt="Edit" onClick={setccnd(element.cccd)} />
                    </Link>
                );
            },
        },
    ];
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
                <PageHeader title="Khách Hàng Bị Báo Xấu" />
                {/* ===================================== */}
                {/* |             Add and Search        | */}
                {/* ===================================== */}
                <Grid item marginRight="5px">
                    <TextField
                        id="input-with-icon-adornment"
                        label="Tìm kiếm..."
                        type="search"
                        value={onFilter}
                        onChange={(e) => onFilterChange(e)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        size="small"
                    />
                </Grid>
            </Grid>
            {/* ================================ */}
            {/* =            Table Show        = */}
            {/* ================================ */}
            <Grid item xs={12}>
                <Box
                    padding="20px"
                    boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
                    borderRadius="8px"
                    bgcolor="#fff"
                >
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
}

export default ListCustomer;
