import React, { useEffect, useState } from 'react'
import { styled } from "@mui/material/styles";
import { Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Paper from "@mui/material/Paper";
import search from './../../../asset/img/search.png';
import account from './../../../asset/img/account.png';
import edit from './../../../asset/img/edit.png';
import "./employee.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

function ListEmployees() {
    const history = useNavigate();
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: "22px 19px 22px 27px",
        borderRadius: "10px",
        color: theme.palette.text.secondary,
    }));


    const [listEmployees, setListEmployee] = useState([]);
    // Axios
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://tranvancaotung-001-site1.ftempurl.com/api/v1/user/getAll/0',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            },
        }).then((res) => {
            setListEmployee(res.data);
            console.log('aaaaa', res.data);
        }).catch((err) => {
            alert('Token đã hết hạn, vui lòng đăng nhập lại');
            history('/')
          });
    }, []);
    return (
        <div className="box_employee">
            <h1 className="employee_heading">Danh sách nhân viên</h1>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Item>
                        <button
                            className="employee_button"
                            onClick={() => {
                                history('/addemployee');
                            }}
                        >
                            Thêm mới
                        </button>
                        <form className="employee_search">
                            <div>
                                <div className="employee_search-check">
                                    <span className="employee_search-heading">Tình trạng:</span>
                                    <input type="radio" name="radio" value="all" />
                                    <label className="check1">Tất cả</label>
                                    <input type="radio" name="radio" value="all" />
                                    <label className="check2">Đang làm việc</label>
                                    <input type="radio" name="radio" value="all" />
                                    <label className="check3">Tạm khóa</label>
                                </div>
                                <div className="employee_search-select">
                                    <select className="employee_search-option">
                                        <option>TP. Hồ Chí Minh</option>
                                        <option>TP. Đà Nẵng</option>
                                        <option>TP. Hà Nội</option>
                                    </select>
                                    <input type="text" placeholder="Tìm kiếm..." className="employee_search-input" />
                                </div>
                            </div>
                            <button className="employee_search-btn">
                                <span>Tìm kiếm </span>
                                <img src={search} alt="search" />
                            </button>
                        </form>
                        <div>
                            <Table className="MuiTable-bordered">
                                <TableHead className="MuiTableHead-root">
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
                                    {listEmployees.map((i, index) => (
                                        <TableRow key={index+1}>
                                            <TableCell>{index+1}</TableCell>
                                            <TableCell>{i.branchId}</TableCell>
                                            <TableCell>{i.fullName}</TableCell>
                                            <TableCell>{i.userName}</TableCell>
                                            <TableCell>{i.phone}</TableCell>
                                            <TableCell>{i.address}</TableCell>
                                            <TableCell>{moment(i.createTime).format('MM/DD/YYYY')}</TableCell>
                                            <TableCell>
                                                {i.status === 1 ? (
                                                    <div className="MuiTableBody_root-status">Đã tạm đừng</div>
                                                ) : (
                                                    <div className="MuiTableBody_root-status activity">
                                                        Đang hoạt động
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="MuiTableBody_root-itemLast">
                                                    <Link to={`/editemployee/${i.userId}`}>
                                                        <img src={edit} alt="Edit" />
                                                    </Link>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Item>
                </Grid>
            </Grid>
        </div>
    );
}

export default ListEmployees