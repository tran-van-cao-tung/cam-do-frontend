<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 0f6f24a6c77d5116fe180c8937a266274b985fc3
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Grid, InputAdornment, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
<<<<<<< HEAD
=======
=======
import React, { useState } from 'react'
import { styled } from "@mui/material/styles";
import { Grid, InputAdornment, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import Paper from "@mui/material/Paper";
>>>>>>> Vi
>>>>>>> 0f6f24a6c77d5116fe180c8937a266274b985fc3
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import search from './../../asset/img/employees/search.png';
import account from './../../asset/img/employees/account.png';
import edit from './../../asset/img/employees/edit.png';
<<<<<<< HEAD
import './employee.css';
=======
<<<<<<< HEAD
import './employee.css';
=======
import "./employee.css";



>>>>>>> Vi
>>>>>>> 0f6f24a6c77d5116fe180c8937a266274b985fc3

function ListEmployees() {
    const [age, setAge] = useState(10);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 0f6f24a6c77d5116fe180c8937a266274b985fc3
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: '22px 19px 22px 27px',
        borderRadius: '10px',
<<<<<<< HEAD
=======
=======



    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: "22px 19px 22px 27px",
        borderRadius: "10px",
>>>>>>> Vi
>>>>>>> 0f6f24a6c77d5116fe180c8937a266274b985fc3
        color: theme.palette.text.secondary,
    }));

    return (
        <div className="box_employee">
            <h1 className="employee_heading">Danh sách nhân viên</h1>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Item>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 0f6f24a6c77d5116fe180c8937a266274b985fc3
                        <button className="employee_button">Thêm mới</button>
                        <form className="employee_search">
                            <div>
                                <div className="employee_search-check">
                                    <span className="employee_search-heading">Tình trạng</span>
                                    <input type="radio" name="radio" value="all" />
                                    <label className="check1">Tất cả</label>
                                    <input type="radio" name="radio" value="all" />
                                    <label className="check2">Đang làm việc</label>
                                    <input type="radio" name="radio" value="all" />
                                    <label className="check3">Tạm khóa</label>
                                </div>
                                <div className="employee_search-select">
                                    <FormControl sx={{ width: '100%' }}>
                                        <Select className="employee_search-option" value={age} onChange={handleChange}>
                                            <MenuItem value={10}>TP. Hồ Chí Minh</MenuItem>
<<<<<<< HEAD
=======
=======
                        <button className='employee_button'>Thêm mới</button>
                        <form className='employee_search'>
                            <div >
                                <div className='employee_search-check'>
                                    <span className='employee_search-heading'>Tình trạng</span>
                                    <input type="radio" name="radio" value="all" />
                                    <label className='check1'>Tất cả</label>
                                    <input type="radio" name="radio" value="all" />
                                    <label className='check2'>Đang làm việc</label>
                                    <input type="radio" name="radio" value="all" />
                                    <label className='check3'>Tạm khóa</label>
                                </div >
                                <div className='employee_search-select'>
                                    <FormControl sx={{ width: '100%' }}>
                                        <Select
                                            className='employee_search-option'
                                            value={age}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={10} >TP. Hồ Chí Minh</MenuItem>
>>>>>>> Vi
>>>>>>> 0f6f24a6c77d5116fe180c8937a266274b985fc3
                                            <MenuItem value={20}>TP. Đà Nẵng</MenuItem>
                                            <MenuItem value={30}>TP. Hà Nội</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        variant="outlined"
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 0f6f24a6c77d5116fe180c8937a266274b985fc3
                                        placeholder="Tìm kiếm..."
                                        className="employee_search-input"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                    <img src={search} alt="search" />
<<<<<<< HEAD
=======
=======
                                        placeholder='Tìm kiếm...'
                                        className='employee_search-input'
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                    <img src={search} alt='search' />
>>>>>>> Vi
>>>>>>> 0f6f24a6c77d5116fe180c8937a266274b985fc3
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 0f6f24a6c77d5116fe180c8937a266274b985fc3
                                </div>
                            </div>
                            <button className="employee_search-btn">
                                <span>Tìm kiếm </span>
                                <img src={search} alt="search" />
                            </button>
                        </form>
                        <div>
                            <Table className="MuiTable-bordered">
                                <TableHead className="MuiTableHead-root-wrap">
                                    <TableRow>
                                        <TableCell>STT</TableCell>
                                        <TableCell>Cửa hàng</TableCell>
                                        <TableCell>Họ và tên</TableCell>
                                        <TableCell>Tài khoản</TableCell>
                                        <TableCell>Số điện thoại</TableCell>
                                        <TableCell>Nơi làm việc</TableCell>
                                        <TableCell>Ngày tạo</TableCell>
                                        <TableCell>Tình trạng</TableCell>
                                        <TableCell>Chức năng</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody className="MuiTableBody-root">
                                    <TableRow>
                                        <TableCell>1</TableCell>
                                        <TableCell>S1</TableCell>
                                        <TableCell className="MuiTableBody_root-name">
                                            <span>Nguyen Van A</span>
                                        </TableCell>
<<<<<<< HEAD
=======
=======
                                </div >
                            </div >
                            <button className='employee_search-btn' >
                                <span>Tìm kiếm </span>
                                <img src={search} alt='search' />
                            </button>
                        </form>
                        <div>
                            <Table className="MuiTable-bordered" >
                                <TableHead className="MuiTableHead-root">
                                    <TableRow>
                                        <TableCell >STT</TableCell>
                                        <TableCell >Cửa hàng</TableCell>
                                        <TableCell >Họ và tên</TableCell>
                                        <TableCell >Tài khoản</TableCell>
                                        <TableCell >Số điện thoại</TableCell>
                                        <TableCell >Nơi làm việc</TableCell>
                                        <TableCell >Ngày tạo</TableCell>
                                        <TableCell >Tình trạng</TableCell>
                                        <TableCell >Chức năng</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody className='MuiTableBody-root'>
                                    <TableRow>
                                        <TableCell>1</TableCell>
                                        <TableCell>S1</TableCell>
                                        <TableCell className='MuiTableBody_root-name'><span>Nguyen Van A</span></TableCell>
>>>>>>> Vi
>>>>>>> 0f6f24a6c77d5116fe180c8937a266274b985fc3
                                        <TableCell>nguyenvana</TableCell>
                                        <TableCell>0958394293</TableCell>
                                        <TableCell>120 Gò Dầu, Tân Quý, Tân Phú, TP.Hồ Chí Minh</TableCell>
                                        <TableCell>24/12/2022</TableCell>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 0f6f24a6c77d5116fe180c8937a266274b985fc3
                                        <TableCell>
                                            <div className="MuiTableBody_root-status activity">Đang làm việc</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="MuiTableBody_root-itemLast">
                                                <img src={account} alt="" />
                                                <img src={edit} alt="" />
<<<<<<< HEAD
=======
=======
                                        <TableCell><div className='MuiTableBody_root-status activity'>Đang làm việc</div ></TableCell>
                                        <TableCell >
                                            <div className='MuiTableBody_root-itemLast'>
                                                <img src={account} alt='' />
                                                <img src={edit} alt='' />
>>>>>>> Vi
>>>>>>> 0f6f24a6c77d5116fe180c8937a266274b985fc3
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>2</TableCell>
                                        <TableCell>S2</TableCell>
<<<<<<< HEAD
                                        <TableCell className="MuiTableBody_root-name">
                                            <span>Nguyen Van B</span>
                                        </TableCell>
=======
<<<<<<< HEAD
                                        <TableCell className="MuiTableBody_root-name">
                                            <span>Nguyen Van B</span>
                                        </TableCell>
=======
                                        <TableCell className='MuiTableBody_root-name'><span>Nguyen Van B</span></TableCell>
>>>>>>> Vi
>>>>>>> 0f6f24a6c77d5116fe180c8937a266274b985fc3
                                        <TableCell>nguyenvanb</TableCell>
                                        <TableCell>0958394292</TableCell>
                                        <TableCell>120 Gò Dầu, Tân Quý, Tân Phú, TP.Hồ Chí Minh</TableCell>
                                        <TableCell>24/12/2022</TableCell>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 0f6f24a6c77d5116fe180c8937a266274b985fc3
                                        <TableCell>
                                            <div className="MuiTableBody_root-status ">Tạm khóa</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="MuiTableBody_root-itemLast">
                                                <img src={account} alt="" />
                                                <img src={edit} alt="" />
<<<<<<< HEAD
=======
=======
                                        <TableCell><div className='MuiTableBody_root-status '>Tạm khóa</div ></TableCell>
                                        <TableCell >
                                            <div className='MuiTableBody_root-itemLast'>
                                                <img src={account} alt='' />
                                                <img src={edit} alt='' />
>>>>>>> Vi
>>>>>>> 0f6f24a6c77d5116fe180c8937a266274b985fc3
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </Item>
                </Grid>
            </Grid>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 0f6f24a6c77d5116fe180c8937a266274b985fc3
        </div>
    );
}

export default ListEmployees;
<<<<<<< HEAD
=======
=======
        </div >
    )
}

export default ListEmployees
>>>>>>> Vi
>>>>>>> 0f6f24a6c77d5116fe180c8937a266274b985fc3
