import React, { useContext, useEffect, useMemo, useState } from 'react';

import {
    Box,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    Stack,
    TextField,
    Tooltip,
} from '@mui/material';

import edit from './../../../asset/img/edit.png';
import './employee.css';
import { Link, useNavigate } from 'react-router-dom';

import API from '../../../API';

import { AuthContext } from '../../../helpers/AuthContext';
import { isAvailableArray } from '../../../helpers/utils';
import CustomizedTables from '../../../helpers/CustomizeTable';
import { formatDate } from '../../../helpers/dateTimeUtils';
import PageHeader from '../../../helpers/PageHeader';
import CustomizeButton from '../../../helpers/CustomizeButton';
import { Search } from '@mui/icons-material';
import AddEmployee from '../addEmployee/AddEmployee';
import EditEmployee from '../editEmployee/EditEmployee';

const DEFAULT = {
    pageNumber: 1,
    pageSize: 6,
    totalPage: 4,
};

function ListEmployees() {
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
    const fetchListEmployees = () => {
        if (currentBranchId) {
            API({
                method: 'get',
                url: '/user/getAll/0/' + currentBranchId,
            }).then((res) => {
                setLogContract(res.data);
            });
        }
    };
    // Axios
    useEffect(() => {
        fetchListEmployees();
    }, [currentBranchId]);

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
    const [showEditEmployee, setShowEditEmployee] = useState(false);

    const handleShowEditEmployee = (id) => {
        setShowEditEmployee(true);
        localStorage.setItem('EmployeeId', id);
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
                    <div className="MuiTableBody_root-status">Tạm Khóa</div>
                ) : (
                    <div className="MuiTableBody_root-status activity">Đang Làm Việc</div>
                );
            },
        },
        {
            nameHeader: 'Chức năng',
            dataRow: (element) => {
                return (
                    <Tooltip title="Cập Nhật">
                        <img src={edit} alt="Edit" onClick={(e) => handleShowEditEmployee(element.userId)} />
                    </Tooltip>
                );
            },
        },
    ];

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const [showAddEmployee, setShowAddEmployee] = useState(false);

    const handleAddEmployee = () => {
        setShowAddEmployee(true);
    };
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
                <PageHeader title="Danh Sách Nhân Viên" />
                <Grid display="flex" justifyContent="flex-end" alignItems="center">
                    <Grid item>
                        <TextField
                            id="input-with-icon-adornment"
                            label="Tìm kiếm cửa hàng..."
                            type="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
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
                    <Grid margin="0 10px" item>
                        <FormControl sx={{ width: 200 }}>
                            <InputLabel id="demo-controlled-open-select-label">Tình Trạng</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={open}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                value={statusFilter}
                                label="Tình Trạng"
                                onChange={(e) => setStatusFilter(e.target.value)}
                                size="small"
                            >
                                <MenuItem value={-1}>Tất Cả</MenuItem>
                                <MenuItem value={1}>Đang Hoạt Động</MenuItem>
                                <MenuItem value={2}>Đã Tạm Dừng</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <CustomizeButton title="Thêm mới" handleClick={handleAddEmployee} />
                        {showAddEmployee && (
                            <AddEmployee
                                showAddEmployee={showAddEmployee}
                                setShowAddEmployee={setShowAddEmployee}
                                refresh={fetchListEmployees}
                            />
                        )}
                    </Grid>
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
                    {showEditEmployee && (
                        <EditEmployee
                            refresh={fetchListEmployees}
                            showEditEmployee={showEditEmployee}
                            setShowEditEmployee={setShowEditEmployee}
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

export default ListEmployees;
