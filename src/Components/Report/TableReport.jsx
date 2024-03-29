import React, { useEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AiOutlineSearch } from 'react-icons/ai';

// import { Link } from "react-router-dom";

const TableReport = ({ setShowUpdateContract }) => {
    const [list, setList] = useState([]);
    const [value, setValue] = useState();

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    const [value1, setValue1] = React.useState();

    const handleChange1 = (newValue) => {
        setValue1(newValue);
    };
    //Axios
    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://tranvancaotung-001-site1.ftempurl.com/api/v1/report/getAll/transaction/0',
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2Y2E4NWE5YS1hMWNhLTQ1ODYtODhkZi01YzQyYzkyNTJiNTUiLCJuYmYiOjE2ODA1MzQ1MzQsImV4cCI6MTY4MDU0MTczNCwiaWF0IjoxNjgwNTM0NTM0fQ.m5JaSAuw7-HUi1kiWZxRPxz9LCasTIvoQAQ81t1c89jZctsM48NzZEFxLYSVno2fWRYc3wMc_E72bB2ssVw0wA`,
            },
        }).then((response) => {
            setList(response.data);
            setSearchAPIData(response.data);
        });
    }, []);

    const handleShow = (id) => {
        setShowUpdateContract(true);
        console.log(id);
    };
    const [searchAPIData, setSearchAPIData] = useState([]);
    const [onFilter, setOnFilter] = useState();
    const onFilterChangeReport = (e) => {
        if (e.target.value == '') {
            setList(searchAPIData);
        } else {
            const filterResult = searchAPIData.filter((item) =>
                item.contractCode.toLowerCase().includes(e.target.value.toLowerCase()),
            );
            setList(filterResult);
        }
        setOnFilter(e.target.value);
    };

    const columns = [
        { field: 'stt', headerName: '#', minWidth: 10, align: 'center' },

        {
            field: 'contractCode',
            headerName: 'Mã HĐ',
            minWidth: 100,
            align: 'center',
        },
        {
            field: 'detailContrac',
            headerName: 'Xem HĐ',
            type: 'actions',
            getActions: (params, index) => [
                <GridActionsCellItem icon={<span>chi tiết</span>} onClick={(e) => handleShow(params.id)} />,
            ],
            minWidth: 170,
            align: 'center',
        },
        {
            field: 'customerName',
            headerName: 'Khách Hàng',
            minWidth: 170,
            align: 'center',
        },
        {
            field: 'assetCode',
            headerName: 'Mã TS',
            align: 'center',
            minWidth: 170,
        },
        {
            field: 'assetName',
            headerName: 'Tài Sản',
            align: 'center',
            minWidth: 170,
        },
        {
            field: 'loan',
            headerName: 'Tiền Cầm',
            minWidth: 210,
            align: 'center',
        },
        {
            field: 'startDate',
            headerName: 'Ngày Cầm',
            minWidth: 210,
            align: 'center',
        },
        {
            field: 'endDate',
            headerName: 'Hạn Cuối HĐ',
            minWidth: 210,
            align: 'center',
        },
    ];

    //   {
    //     id: 1,
    //     stt: 1,
    //     idContract: "CD-0001",
    //     idProperti: "Nguyen Tran Khanh Hoa",
    //     customer: "XM",
    //     properti: "Xe SH Trắng",
    //     pawnMoney: 9400000,
    //     deadlineContract: "25 / 12 / 2022",
    //     pawnDate: "23 / 12 / 2022",
    //   },
    //   {
    //     id: 2,
    //     stt: 2,
    //     idContract: "CD-0001",
    //     idProperti: "Nguyen Tran Khanh Hoa",
    //     customer: "OT",
    //     properti: "Xe SH Trắng",
    //     pawnMoney: 9400000,
    //     deadlineContract: "25 / 12 / 2022",
    //     pawnDate: "23/12/2022",
    //   },
    //   {
    //     id: 3,
    //     stt: 3,
    //     idContract: "CD-0001",
    //     idProperti: "Nguyen Tran Khanh Hoa",
    //     customer: "OT",
    //     properti: "Xe SH Trắng",
    //     pawnMoney: 9400000,
    //     deadlineContract: "25 / 12 / 2022",
    //     pawnDate: "23 / 12 / 2022",
    //   },
    // ];
    return (
        <div className="reportTotalContainer">
            <div className="btn-detail">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <div className="search-hd">
                                <input
                                    placeholder="Tìm Kiếm HĐ"
                                    value={onFilter}
                                    onChange={(e) => onFilterChangeReport(e)}
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
                                        inputFormat="MM/DD/YYYY"
                                        value={value1}
                                        onChange={handleChange1}
                                        renderInput={(params) => <TextField {...params} />}
                                        className="since"
                                    />
                                </Stack>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={2}>
                            <select className="lts">
                                <option>--Loại TS--</option>
                                <option>loại 1</option>
                                <option>loại 2</option>
                            </select>
                        </Grid>
                        <Grid item xs={2}>
                            <select className="lts">
                                <option>Tình Trạng</option>
                                <option>loại 1</option>
                                <option>loại 2</option>
                            </select>
                        </Grid>
                        <Grid item xs={1}>
                            <div className="search-hd">
                                <button className="btn__click-search">
                                    <AiOutlineSearch className="icon-search posi__none" />
                                </button>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={list.map((item, index) => {
                        return { id: index, stt: index + 1, ...item };
                    })}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    style={{ align: 'center' }}
                />
            </div>
        </div>
    );
};

export default TableReport;
