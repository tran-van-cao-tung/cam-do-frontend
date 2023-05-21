import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../../src/API.js';
import edit from './../../asset/img/edit.png';

import './CustomerManager.css';
import { isAvailableArray } from '../../helpers/utils.js';
import CustomizedTables from '../../helpers/CustomizeTable.jsx';
import { Box, Grid, Pagination, Stack } from '@mui/material';
import { formatDate } from '../../helpers/dateTimeUtils';
import CustomizeButton from '../../helpers/CustomizeButton.jsx';
import PageHeader from '../../helpers/PageHeader.jsx';

const DEFAULT = {
    pageNumber: 1,
    pageSize: 6,
    totalPage: 1,
};

function ListCustomer({ numPage }) {
    const [searchAPIData, setSearchAPIData] = useState([]);
    const [onFilter, setOnFilter] = useState();
    const [customer, setCustomer] = useState([]);
    const [page, setPage] = useState(DEFAULT.pageNumber);
    const [pageSize] = useState(DEFAULT.pageSize);

    useEffect(() => {
        API({
            method: 'GET',
            url: '/customer/getAll/0',
        }).then((response) => {
            setSearchAPIData(response.data);
            console.log(response.data);
            setCustomer(response.data);
        });
    }, []);

    const onFilterChange = (e) => {
        if (e.target.value == '') {
            setCustomer(searchAPIData);
        } else {
            const filterResult = searchAPIData.filter((item) =>
                item.fullName.toLowerCase().includes(e.target.value.toLowerCase()),
            );
            setCustomer(filterResult);
        }
        setOnFilter(e.target.value);
    };

    // ==================================
    // |            Phân Trang        |
    // ==================================

    const totalPage = useMemo(() => {
        const result = Math.ceil(customer.length / pageSize);
        return result;
    }, [customer?.length, pageSize]);

    const renderedData = useMemo(() => {
        if (!isAvailableArray(customer)) return [];

        const start = (page - 1) * pageSize;
        const end = page * pageSize;
        return customer.slice(start, end);
    }, [customer, page, pageSize]);
    const handlePagination = (e, value) => {
        setPage(value);
    };

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
            nameHeader: 'Ngày tạo',
            dataRow: (element) => {
                return formatDate(element.createdDate);
            },
        },
        {
            nameHeader: 'Hạng TD',
            dataRow: (element) => {
                return element.point;
            },
        },
        {
            nameHeader: 'Chức năng',
            dataRow: (element) => {
                return (
                    <Link to={`/customer-manager/updateinfo/${element.customerId}`}>
                        <img src={edit} alt="Edit" />
                    </Link>
                );
            },
        },
    ];

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PageHeader title="Quản Lý Khách Hàng" />
                </Grid>

                {/* ===================================== */}
                {/* |             Add and Search        | */}
                {/* ===================================== */}
                <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
                    <Link to="/customer-manager/add-new-customer">
                        <CustomizeButton title="Thêm mới" />
                    </Link>

                    {/* Status */}
                    <div className="statusCustomer">
                        {/* Search */}
                        <div className="searchinput">
                            <input
                                type="text"
                                class="searchTerm"
                                placeholder="Tìm kiếm..."
                                value={onFilter}
                                onChange={(e) => onFilterChange(e)}
                            ></input>
                        </div>
                    </div>
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
        </>
    );
}

export default ListCustomer;
