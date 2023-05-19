import React, { useContext, useEffect, useMemo, useState } from 'react';

import { Box, FormControl, FormControlLabel, Grid, Pagination, Radio, RadioGroup, Stack } from '@mui/material';

import edit from './../../../asset/img/edit.png';
import './employee.css';
import { Link, useNavigate } from 'react-router-dom';

import API from '../../../API';

import { AuthContext } from '../../../helpers/AuthContext';
import { isAvailableArray } from '../../../helpers/utils';
import CustomizedTables from '../../../helpers/CustomizeTable';
import { formatDate } from '../../../helpers/dateTimeUtils';
import PageHeader from '../../../helpers/PageHeader';

const DEFAULT = {
    pageNumber: 1,
    pageSize: 6,
    totalPage: 4,
};

function ListEmployees() {
    const navigate = useNavigate();

    const [logContract, setLogContract] = useState([]);
    const [page, setPage] = useState(DEFAULT.pageNumber);
    const [pageSize] = useState(DEFAULT.pageSize);

    const [statusFilter, setStatusFilter] = useState('all');
    const { currentBranchId } = useContext(AuthContext);
    const [listEmployees, setListEmployee] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const searchedProduct = listEmployees
        .filter((item) => {
            if (searchTerm.value === '') return item;
            if (item.fullName.toLowerCase().includes(searchTerm.toLowerCase())) return item;
        })
        .filter((item) => {
            if (statusFilter === 'all') return true;
            return item.status === (statusFilter === 'active' ? 0 : 1);
        });
    // Axios
    useEffect(() => {
        if (currentBranchId) {
            API({
                method: 'get',
                url: '/user/getAll/0/' + currentBranchId,
            }).then((res) => {
                setLogContract(res.data);
            });
        }
    }, [currentBranchId, setListEmployee]);

    console.log(searchedProduct);
    // ==================================
    // |            Phân Trang        |
    // ==================================

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
            nameHeader: 'Tài khoản',
            dataRow: (element) => {
                return element.userName;
            },
        },
        {
            nameHeader: 'Số điện thoại',
            dataRow: (element) => {
                return element.phone;
            },
        },
        {
            nameHeader: 'Nơi làm việc',
            dataRow: (element) => {
                return element.address;
            },
        },
        {
            nameHeader: 'Ngày tạo',
            dataRow: (element) => {
                return formatDate(element.createTime);
            },
        },
        {
            nameHeader: 'Tình trạng',
            dataRow: (element) => {
                return element.status === 2 ? (
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
                    <div className="MuiTableBody_root-itemLast">
                        <Link to={`/editemployee/${element.userId}`}>
                            <img src={edit} alt="Edit" />
                        </Link>
                    </div>
                );
            },
        },
    ];

    return (
        <>
            <div className="box_employee">
                <PageHeader title="Danh sách nhân viên" />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div className="list_box-employee">
                            <button
                                className="employee_button"
                                onClick={() => {
                                    navigate('/addemployee');
                                }}
                            >
                                Thêm mới
                            </button>
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
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

export default ListEmployees;
