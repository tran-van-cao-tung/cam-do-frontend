import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../../src/API.js';
import edit from './../../asset/img/edit.png';

import { isAvailableArray } from '../../helpers/utils.js';
import CustomizedTables from '../../helpers/CustomizeTable.jsx';
import { Box, Pagination, Stack } from '@mui/material';

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
            url: '/customer/getAllBlackList/1',
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
            nameHeader: 'Lý do',
            dataRow: (element) => {
                return element.reason;
            },
        },
        {
            nameHeader: 'Hạng TD',
            dataRow: (element) => {
                return <span className="rank_F">F</span>;
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
        <>
            <div className="ListCustomerr">
                {/* ===================================== */}
                {/* |             Add and Search        | */}
                {/* ===================================== */}
                <div className="ListCustomer">
                    {/* Status */}
                    <div className="status">
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
