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
import {
    Box,
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
import CustomizedTables from '../../../helpers/CustomizeTable';
import { isAvailableArray } from '../../../helpers/utils';

import { formatDate, formatMoney } from '../../../helpers/dateTimeUtils';
import PageHeader from '../../../helpers/PageHeader';
import CustomizeButton from '../../../helpers/CustomizeButton';
import { Search } from '@mui/icons-material';
import AddList from '../AddListStore/AddList';
import EditListStore from '../EditListStore/EditListStore';

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

    const fetchCallAPI = () => {
        API({
            method: 'get',
            url: '/branch/getAll/0',
        }).then((res) => {
            setLogContract(res.data);
        });
    };
    useEffect(() => {
        fetchCallAPI();
    }, []);
    const handlePagination = (e, value) => {
        setPage(value);
    };
    const [showEditStore, setShowEditStore] = useState(false);

    const handleShowEditStore = (id) => {
        setShowEditStore(true);
        localStorage.setItem('brandId', id);
    };
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
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
                    <div className="MuiTableBody_root-status activity">Đang hoạt động</div>
                ) : (
                    <div className="MuiTableBody_root-status">Đã tạm dừng</div>
                );
            },
        },
        {
            nameHeader: 'Chức năng',
            dataRow: (element) => {
                return (
                    <Tooltip title="Cập nhật">
                        <img onClick={(e) => handleShowEditStore(element.branchId)} src={edit} alt="Edit" />
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
    const [showAddStore, setShowAddStore] = useState(false);
    const handleAddStore = () => {
        setShowAddStore(true);
    };

    return (
        <Grid container spacing={2} xs={12}>
            <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
                <PageHeader title="Danh sách cửa hàng" />

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
                        <CustomizeButton title="Thêm mới" handleClick={handleAddStore} />
                        {showAddStore && <AddList showAddStore={showAddStore} setShowAddStore={setShowAddStore} refresh= {fetchCallAPI} />}
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
                    fontSize="14px"
                >
                    <CustomizedTables renderedData={renderedData} dataTable={dataTable} />
                    {showEditStore && (
                        <EditListStore
                            refresh={fetchCallAPI}
                            showEditStore={showEditStore}
                            setShowEditStore={setShowEditStore}
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
};

export default ListStore;
