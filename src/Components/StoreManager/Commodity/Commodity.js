import FormControl from '@mui/material/FormControl';

import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './Commodity.css';
import './Table.scss';
import callAPI from '../../../API';

import CustomizedTables from '../../../helpers/CustomizeTable';
import { Box, Grid, InputAdornment, InputLabel, MenuItem, Pagination, Select, Stack, TextField } from '@mui/material';
import { isAvailableArray } from '../../../helpers/utils';
import PageHeader from '../../../helpers/PageHeader';
import CustomizeButton from '../../../helpers/CustomizeButton';
import { Search } from '@mui/icons-material';
import Addcommondity from '../AddCommondity/Addcommondity';

const DEFAULT = {
    pageNumber: 1,
    pageSize: 6,
    totalPage: 1,
};

function Commodity() {
    const [logContract, setLogContract] = useState([]);
    const [page, setPage] = useState(DEFAULT.pageNumber);
    const [pageSize] = useState(DEFAULT.pageSize);
    useEffect(() => {
        callAPI({
            method: 'get',
            url: `/pawnableProduct/getAll/0`,
        }).then((res) => {
            console.log(res.data);
            setLogContract(res.data);
        });
    }, []);

    // ==================================
    // |  Filter Value Radio and Search |
    // ==================================
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = logContract.filter((item) => {
        if (statusFilter === 'all' && searchTerm === '') return true;
        if (statusFilter !== 'all' && item.status !== (statusFilter === 'active' ? 1 : 0)) return false;
        if (searchTerm !== '' && !item.typeOfProduct.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        return true;
    });
    // // ==================================
    // // |            Phân trang          |
    // // ==================================

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
    const handlePagination = (e, value) => {
        setPage(value);
    };

    const dataTable = [
        {
            nameHeader: 'STT',
            dataRow: (element) => {
                return element.pawnableProductId;
            },
        },
        {
            nameHeader: 'Lĩnh vực',
            dataRow: (element) => {
                return <p>Cầm Đồ</p>;
            },
        },
        {
            nameHeader: 'Tên hàng hoá',
            dataRow: (element) => {
                return <Link to={`/commodity/edit/${element.pawnableProductId}`}>{element.typeOfProduct}</Link>;
            },
        },
        {
            nameHeader: 'Mã',
            dataRow: (element) => {
                return <Link to={`/commodity/edit/${element.pawnableProductId}`}>{element.commodityCode}</Link>;
            },
        },
        {
            nameHeader: 'Tình trạng',
            dataRow: (element) => {
                return element.status === 1 ? (
                    <div className="MuiTableBody_working-status">Đang hoạt động</div>
                ) : (
                    <div className="MuiTableBody_stop-status">Đã tạm dừng</div>
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
    const [showAddCommodity, setShowAddCommodity] = useState(false);
    const handleAddCommodity = () => {
        setShowAddCommodity(true);
    };
    return (
        <Box>
            <Grid container spacing={2} xs={12}>
                <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
                    <PageHeader title="Loại Tài Sản" />
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
                            <CustomizeButton title="Thêm mới" handleClick={handleAddCommodity} />
                            {showAddCommodity && (
                                <Addcommondity
                                    showAddCommodity={showAddCommodity}
                                    setShowAddCommodity={setShowAddCommodity}
                                />
                            )}
                        </Grid>
                    </Grid>
                </Grid>
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
        </Box>
    );
}

export default Commodity;
