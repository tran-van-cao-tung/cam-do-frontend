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
const BtnDetails = ({ rowsContract, setContract }) => {
    const [pawnableProduct, setPawnableProduct] = useState([]);
    useEffect(() => {
        API({
            method: 'get',
            url: '/pawnableProduct/getAll/0',
        }).then((res) => {
            setPawnableProduct(res.data);
        });
    }, []);

    const [status, setStatus] = useState();
    const [commodityCode, setCommodityCode] = useState();
    const [customerName, setCustomerName] = useState();
    const [CCCD, setCCCD] = useState();
    const handleOptionStatus = (e) => {
        setStatus(e.target.value);
    };

    const handleOptionLTS = (e) => {
        setCommodityCode(e.target.value);
        console.log(commodityCode);
    };

    const handleSearchInput = (e) => {
        setCustomerName(e.target.value);
        setCCCD(e.target.value);
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
                                value={customerName}
                                onChange={(e) => handleSearchInput(e)}
                            />
                            <AiOutlineSearch className="icon-search" />
                        </div>
                    </Grid>
                    
                    <Grid item xs={2}>
                        <select className="ltsPawn" onChange={(e) => handleOptionLTS(e)}>
                            <option>--Loại TS--</option>
                            {pawnableProduct.map((item, index) => {
                                return <option value={item.commodityCode}>{item.typeOfProduct}</option>;
                            })}
                        </select>
                    </Grid>
                    <Grid item xs={2}>
                        <select className="ltsPawn" onChange={(e) => handleOptionStatus(e)}>
                            <option>--Tình Trạng--</option>
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
