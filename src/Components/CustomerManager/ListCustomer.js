import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../../src/API.js';
import edit from './../../asset/img/edit.png';

import './CustomerManager.css';
import { isAvailableArray } from '../../helpers/utils.js';
import CustomizedTables from '../../helpers/CustomizeTable.jsx';
import { Box, Pagination, Stack } from '@mui/material';
import { formatDate } from '../../helpers/dateTimeUtils';

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
                        <img
                            src={edit}
                            alt="Edit"
                        />
                    </Link>
                );
            },
        },
    ];

    return (
        <>
            <div className="ListCustomerr">
                {/* ===================================== */}
                {/* |             Add and Search        | */}
                {/* ===================================== */}
                <div className="ListCustomer">
                    <Link to="/customer-manager/add-new-customer">
                        <button className="addlistCustomer">Thêm mới khách hàng</button>
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
                </div>
                {/* ================================ */}
                {/* =            Table Show        = */}
                {/* ================================ */}

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
            </div>
        </>
    );
}

export default ListCustomer;
