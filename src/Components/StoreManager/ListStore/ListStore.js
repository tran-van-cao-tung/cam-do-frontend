import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import React, { useEffect, useMemo, useState } from 'react';

import { Link } from 'react-router-dom';
import API from '../../../API';
import edit from './../../../asset/img/edit.png';
import ext from './../../../asset/img/ext.png';
import './liststore.css';
import { Box, Pagination, Stack } from '@mui/material';
import CustomizedTables from '../../../helpers/CustomizeTable';
import { isAvailableArray } from '../../../helpers/utils';

import { formatDate, formatMoney } from '../../../helpers/dateTimeUtils';

const DEFAULT = {
    pageNumber: 1,
    pageSize: 6,
    totalPage: 1,
};

const ListStore = () => {
    //

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
    // Axios
    useEffect(() => {
        API({
            method: 'get',
            url: '/branch/getAll/1',
        }).then((res) => {
            setLogContract(res.data);
        });
    }, []);
    const handlePagination = (e, value) => {
        setPage(value);
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const dataTable = [
        {
            nameHeader: 'Cửa hàng',
            dataRow: (element) => {
                return element.branchName;
            },
        },
        {
            nameHeader: 'Địa chỉ',
            dataRow: (element) => {
                return element.address;
            },
        },
        {
            nameHeader: 'Số điện thoại',
            dataRow: (element) => {
                return element.phoneNumber;
            },
        },
        {
            nameHeader: 'Vốn đầu tư',
            dataRow: (element) => {
                return formatMoney(element.fund);
            },
        },
        {
            nameHeader: 'Ngày tạo',
            dataRow: (element) => {
                return formatDate(element.createDate);
            },
        },
        {
            nameHeader: 'Tình trạng',
            dataRow: (element) => {
                return element.status === 1 ? (
                    <div className="MuiTableBody_root-status">Đã tạm đừng</div>
                ) : (
                    <div className="MuiTableBody_root-status activity">Đang hoạt động</div>
                );
            },
        },
        {
            nameHeader: 'Chức năng',
            dataRow: (element) => {
                return (
                    <div className="MuiTableBody_root-elementLast">
                        <Link to={`/detailsStore/${element.branchId}`}>
                            <img src={ext} alt="..." />
                        </Link>
                        <Link to={`/editliststore/edit/${element.branchId}`}>
                            <img src={edit} alt="Edit" />
                        </Link>
                    </div>
                );
            },
        },
    ];
    return (
        <>
            <div className="listStoreContainer">
                <h1 id="heading">Danh sách cửa hàng</h1>
                <div className="ListStore1">
                    <div className="liststorebody">
                        {/* Button  Add */}
                        <Link to="/Addliststore/add">
                            <button className="addlistStore">Thêm mới cửa hàng</button>
                        </Link>
                        {/* Status */}
                        <div className="statusStore">
                            <span>Tình Trạng</span>
                            {/* From status  */}
                            <span className="fromstatusStore">
                                <FormControl className="formIteam">
                                    <RadioGroup
                                        className="radioItem"
                                        aria-label="filter"
                                        name="filter"
                                        value={statusFilter}
                                        onChange={(event) => setStatusFilter(event.target.value)}
                                    >
                                        <FormControlLabel
                                            value="all"
                                            control={<Radio />}
                                            label="Tất cả"
                                            className="radio-all"
                                        />
                                        <FormControlLabel
                                            value="active"
                                            control={<Radio />}
                                            label="Đang hoạt động"
                                            className="radio-active"
                                        />
                                        <FormControlLabel
                                            value="stop"
                                            control={<Radio />}
                                            label="Đã tạm dừng"
                                            className="radio-stop"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </span>
                            {/* Search */}
                            <div className="searchinput">
                                {/* <input type="text" class="searchTerm" placeholder="Tìm kiếm..."></input> */}
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm cửa hàng..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
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
            </div>
        </>
    );
};

export default ListStore;
