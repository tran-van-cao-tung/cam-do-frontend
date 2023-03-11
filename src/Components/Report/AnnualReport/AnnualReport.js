import Button from '@mui/material/Button';

import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import { MenuItem, Select, StyledEngineProvider } from '@mui/material';

import './AnnualReport.css';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const AnnualReport = () => {
    const [yearFilter, setYearFilter] = useState('2022');

    const handleYearFilter = (e) => {
        setYearFilter(e.target.value);
    };

    const columns = [
        { field: 'thang', headerName: 'Tháng', width: 10, textAlign: 'center' },
        { field: 'tienVon', headerName: 'Tiền vốn', width: 20, type: 'number' },
        { field: 'tienVay', headerName: 'Tiền cho vay', width: 200, type: 'number' },
        {
            field: 'laiDaNhan',
            headerName: 'Tiền lãi đã nhận',
            type: 'number',
        },
        {
            field: 'tienThanhLy',
            headerName: 'Tiền thanh lý',
            width: 160,
            type: 'number',
        },
        {
            field: 'duCuoiThang',
            headerName: 'Số dư cuối tháng',
            width: 160,
            type: 'number',
        },
        {
            field: 'tienGocDaNhan',
            headerName: 'Tiền gốc đã nhận',
            type: 'number',
        },
        {
            field: 'tongQuan',
            headerName: 'Tổng quan',
            type: 'number',
            valueGetter: (params) => `${params.row.tongQuan === 0 ? 'Lỗ' : params.row.tongQuan === 1 ? 'Lời' : ''}`,
        },
    ];

    const rows = [
        {
            id: 1,
            thang: 1,
            tienVon: 170000000,
            tienVay: 170000000,
            laiDaNhan: 170000000,
            tienThanhLy: 170000000,
            duCuoiThang: 170000000,
            tienGocDaNhan: 150000000,
            tongQuan: 0,
        },
    ];

    return (
        <StyledEngineProvider injectFirst>
            <div className="report-wrapper">
                <h4 className="report-title">Báo cáo năm</h4>

                <div className="report-content">
                    <div className="search-section">
                        <FormControl className="city-group" sx={{ minWidth: 100 }}>
                            <Select
                                value={yearFilter}
                                onChange={handleYearFilter}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                className="select-box"
                            >
                                <MenuItem value="2022">2022</MenuItem>
                                <MenuItem value="2021">2021</MenuItem>
                                <MenuItem value={'2020'}>2020</MenuItem>
                                <MenuItem value={'2019'}>2019</MenuItem>
                            </Select>
                        </FormControl>

                        <Button className="search-btn" variant="contained" endIcon={<SearchIcon />}>
                            Tìm kiếm
                        </Button>
                    </div>

                    <div className="table-section" style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            style={{ textAlign: 'center' }}
                        />
                    </div>
                </div>
            </div>
        </StyledEngineProvider>
    );
};

export default AnnualReport;
