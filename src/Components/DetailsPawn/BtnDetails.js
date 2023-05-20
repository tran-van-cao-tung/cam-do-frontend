import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AiOutlineSearch } from 'react-icons/ai';
import API from '../../API';
import moment from 'moment';

function getInteger(value){
    return value && Number.parseInt(value);
}

const BtnDetails = ({filters, setFilters}) => {
    const handleOptionStatus = (e) => {
        console.log(e.target.value);
        setFilters((previous) =>{
            return {
                ...previous, status: getInteger(e.target.value)
            }
        })
    };

    const handleSearchInput = (e) => {
        setFilters((previous) =>{
            return {
                ...previous, searchText: e.target.value
            }
        })
    };

    return (
        <div className="btn-detail">
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <div className="search-hd">
                            <input
                                type="text"
                                placeholder="Nhập tên KH, CMND"
                                name="customerName"
                                value={filters.searchText}
                                onChange={(e) => handleSearchInput(e)}
                            />
                            <AiOutlineSearch className="icon-search" />
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <select className="ltsPawn" onChange={(e) => handleOptionStatus(e)} 
                        value={filters.status}>
                            <option value={-1}>--Tất cả--</option>
                            <option value={1}>Đang cầm</option>
                            <option value={2}>Trễ hẹn</option>
                            <option value={3}>Thanh lý</option>
                            <option value={4}>Đóng hợp đồng</option>
                        </select>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default BtnDetails;
