import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { AiOutlineSearch } from 'react-icons/ai';

import CustomizeButton from '../../helpers/CustomizeButton';
import { Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { CSVLink } from 'react-csv';
import { Download, Search } from '@mui/icons-material';
import PageHeader from '../../helpers/PageHeader';

function getInteger(value) {
    return value && Number.parseInt(value);
}

const BtnDetails = ({ filters, setFilters, setShowAddContract, prepareExportData, exportDataTable }) => {
    const handleOptionStatus = (e) => {
        console.log(e.target.value);
        setFilters((previous) => {
            return {
                ...previous,
                status: getInteger(e.target.value),
            };
        });
    };

    const handleSearchInput = (e) => {
        setFilters((previous) => {
            return {
                ...previous,
                searchText: e.target.value,
            };
        });
    };

    const handleAddNewContact = () => {
        setShowAddContract(true);
    };

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
                <PageHeader title="Hợp đồng cầm đồ" />
                <Grid display="flex" justifyContent="flex-end" alignItems="center">
                    <TextField
                        id="input-with-icon-adornment"
                        label="Tìm kiếm..."
                        type="search"
                        value={filters.searchText}
                        onChange={(e) => handleSearchInput(e)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        size="small"
                    />

                    <FormControl sx={{ width: 200, marginLeft: '10px' }}>
                        <InputLabel id="demo-controlled-open-select-label">Tình Trạng</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={filters.status}
                            label="Tình Trạng"
                            onChange={(e) => handleOptionStatus(e)}
                            size="small"
                        >
                            <MenuItem value={-1}>Tất Cả</MenuItem>
                            <MenuItem value={1}>Đang cầm</MenuItem>
                            <MenuItem value={2}>Trễ hẹn</MenuItem>
                            <MenuItem value={3}>Thanh lý</MenuItem>
                            <MenuItem value={4}>Đóng hợp đồng</MenuItem>
                        </Select>
                    </FormControl>

                    <CSVLink data={exportDataTable()} filename="Thongtinhopdong">
                        <Button
                            sx={{
                                margin: 'auto 10px',
                                backgroundColor: 'white',
                                padding: 'auto 5px',
                                border: '1px solid green',
                                color: 'green',
                                '&:hover': {
                                    backgroundColor: 'c3c3c3',
                                    opacity: 0.8,
                                },
                            }}
                            startIcon={<Download fontSize="medium" />}
                            size="medium"
                        >
                            Xuất file
                        </Button>
                    </CSVLink>

                    <CustomizeButton title="Thêm mới" handleClick={handleAddNewContact} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default BtnDetails;
