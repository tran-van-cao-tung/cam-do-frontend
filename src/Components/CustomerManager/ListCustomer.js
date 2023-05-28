import React, { useEffect, useMemo, useState } from 'react';

import API from '../../../src/API.js';
import edit from './../../asset/img/edit.png';

import './CustomerManager.css';
import { isAvailableArray } from '../../helpers/utils.js';
import CustomizedTables from '../../helpers/CustomizeTable.jsx';
import { Box, Grid, InputAdornment, Pagination, Stack, TextField, Tooltip } from '@mui/material';
import { formatDate } from '../../helpers/dateTimeUtils';
import CustomizeButton from '../../helpers/CustomizeButton.jsx';
import PageHeader from '../../helpers/PageHeader.jsx';
import AddNewCustomer from './Popup/AddNewCustomer.js';
import { Search } from '@mui/icons-material';
import UpdateInfor from './Popup/UpdateInfor.js';

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

    const fetchListCustomer = () => {
        console.log('test Call API');
        API({
            method: 'GET',
            url: '/customer/getAll/0',
        }).then((response) => {
            setSearchAPIData(response.data);

            setCustomer(response.data);
        });
    };

    useEffect(() => {
        fetchListCustomer();
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
    const [showEditCustomer, setShowEditCustomer] = useState(false);

    const handleShowEditCustomer = (id) => {
        setShowEditCustomer(true);
        localStorage.setItem('CustomerId', id);
        console.log('Update ', id);
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
                    <Tooltip title="Cập Nhật">
                        <img src={edit} alt="Edit" onClick={(e) => handleShowEditCustomer(element.customerId)} />
                    </Tooltip>
                );
            },
        },
    ];

    const [showAddCustomer, setShowAddCustomer] = useState(false);

    const handleShowAddCustomer = () => {
        setShowAddCustomer(true);
    };
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
                <PageHeader title="Quản Lý Khách Hàng" />

                <Grid item display="flex" justifyContent="flex-end" alignItems="center">
                    {/* Search */}
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
                    <Grid item>
                        {' '}
                        <CustomizeButton title="Thêm mới" handleClick={handleShowAddCustomer} />
                    </Grid>
                    {showAddCustomer && (
                        <AddNewCustomer
                            refresh={fetchListCustomer}
                            showAddCustomer={showAddCustomer}
                            setShowAddCustomer={setShowAddCustomer}
                        />
                    )}
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
                    {showEditCustomer && (
                        <UpdateInfor
                            refresh={fetchListCustomer}
                            showEditCustomer={showEditCustomer}
                            setShowEditCustomer={setShowEditCustomer}
                        />
                    )}
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
