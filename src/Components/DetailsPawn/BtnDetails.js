import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { AiOutlineSearch } from 'react-icons/ai';

import CustomizeButton from '../../helpers/CustomizeButton';
import { Button } from '@mui/material';

function getInteger(value) {
    return value && Number.parseInt(value);
}

const BtnDetails = ({ filters, setFilters, setShowAddContract }) => {
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
    return (
        <div className="btn-detail">
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Grid container spacing={2} xs={8}>
                    <Grid item xs={5}>
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
                    <Grid item xs={3}>
                        <select className="ltsPawn" onChange={(e) => handleOptionStatus(e)} value={filters.status}>
                            <option value={-1}>--Tất cả--</option>
                            <option value={1}>Đang cầm</option>
                            <option value={2}>Trễ hẹn</option>
                            <option value={3}>Thanh lý</option>
                            <option value={4}>Đóng hợp đồng</option>
                        </select>
                    </Grid>
                </Grid>

                <Grid>
                    <CustomizeButton title="Thêm mới" handleClick={handleAddNewContact} />

                    <Button
                        sx={{
                            marginLeft: '10px',
                            fontFamily: 'Frank Ruhl Libre',
                            fontStyle: 'normal',
                            fontSize: '24px',
                            borderRadius: '10px',
                            padding: '0px 20px',
                            backgroundColor: 'white',
                            border: '1px solid green',
                            color: 'green',
                            '&:hover': {
                                backgroundColor: 'c3c3c3',
                                opacity: 0.8,
                            },
                        }}
                    >
                        Xuất file.xlsx
                    </Button>
                </Grid>
            </Box>
        </div>
    );
};

export default BtnDetails;
