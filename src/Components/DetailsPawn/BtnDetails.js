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
    const [value, setValue] = React.useState();

    //Ép kiểu dữ liệu date
    const formatDate = (value) => {
        return moment(value).format('DD/MM/YYYY');
    };
    const handleChange = (newValue) => {
        setValue(formatDate(newValue.$d));
    };
    const [value1, setValue1] = React.useState();

    const handleChange1 = (newValue) => {
        setValue1(formatDate(newValue.$d));
    };

    console.log(rowsContract);
    //get dữ liệu pawnableProduct
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
    const handleOptionStatus = (e) => {
        setStatus(e.target.value);
    };

    const handleOptionLTS = (e) => {
        setCommodityCode(e.target.value);
        console.log(commodityCode);
    };

    const handleInputName = (e) => {
        setCustomerName(e.target.value);
    };

    const handleSubmit = () => {
        const data = {
            customerName: customerName,
            contractStartDate: value,
            contractEndDate: value1,
            commodityCode: commodityCode,
            status: status,
        };
        console.log(data);
        setContract(
            rowsContract.filter((item) => {
                if (
                    data.customerName !== '' &&
                    item.customerName.toLowerCase().includes(data.customerName.toLowerCase())
                ) {
                    return true;
                }
                if (data.contractStartDate !== '' && formatDate(item.contractStartDate) === data.contractStartDate) {
                    return true;
                }
                if (data.contractEndDate !== '' && formatDate(item.contractEndDate) === data.contractEndDate) {
                    return true;
                }
                if (data.commodityCode !== '' && item.commodityCode === data.commodityCode) {
                    return true;
                }
                if (data.status !== '' && item.status === data.status) {
                    return true;
                }
                return false;
            }),
        );
    };
    /*   useEffect(() => {
      setSearchedProduct(rowsContract.filter((item) => {
        if (searchTerm.value === "") return item;
        if (
          item.fullName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
          return item;
      }))
    }, []) */

    return (
        <div className="btn-detail">
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <div className="search-hd">
                            <input
                                type="text"
                                placeholder="I'm looking for...."
                                name="customerName"
                                value={customerName}
                                onChange={(e) => handleInputName(e)}
                            />
                            <AiOutlineSearch className="icon-search" />
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
                                <DesktopDatePicker
                                    label="Từ ngày"
                                    inputFormat="DD/MM/YYYY"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                    className="since"
                                />
                            </Stack>
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={2}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
                                <DesktopDatePicker
                                    label="Đến ngày"
                                    inputFormat="DD/MM/YYYY"
                                    value={value1}
                                    onChange={handleChange1}
                                    renderInput={(params) => <TextField {...params} />}
                                    className="since"
                                />
                            </Stack>
                        </LocalizationProvider>
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
                        </select>
                    </Grid>
                    <Grid item xs={1}>
                        <div className="searchDd">
                            <button className="btn__click-search" onClick={handleSubmit}>
                                <AiOutlineSearch className="posi__none" />
                            </button>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default BtnDetails;
