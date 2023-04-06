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
import callAPI from '../../../API';

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
    const [searchTerm, setSearchTerm] = useState("");
    const searchedProduct = listEmployees.filter((item) => {
        if (searchTerm.value === "") return item;
        if (
            item.fullName
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        )
            return item;
    })
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

    const [branch, setBranch] = useState([]);
    useEffect(() => {
        callAPI({
            method: 'get',
            url: `branch/getChain`,
        }).then((res) => {
            setBranch(res.data);
        });
    }, [])

    console.log(branch)

    console.log(searchedProduct)
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
                                    {/* <select className="employee_search-option">
                                        <option>TP. Hồ Chí Minh</option>
                                        <option>TP. Đà Nẵng</option>
                                        <option>TP. Hà Nội</option>
                                    </select> */}
                                    {/* <input type="text" placeholder="Tìm kiếm..." className="employee_search-input" /> */}
                                    <input
                                        type="text"
                                        placeholder="I'm looking for...."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            {/* <button className="employee_search-btn">
                                <span>Tìm kiếm </span>
                                <img src={search} alt="search" />
                            </button> */}
                        </form>
                        {/* ================================ */}
                        {/* =            Table Show        = */}
                        {/* ================================ */}
                        <div className="table _table-Listemoloyess">
                            <table className="responstable">
                                <tr>
                                    <th>STT</th>
                                    <th data-th="Driver details"><span>Cửa hàng</span></th>
                                    <th>Họ và tên</th>
                                    <th>Tài khoản</th>
                                    <th>Số điện thoại</th>
                                    <th>Nơi làm việc</th>
                                    <th>Ngày tạo</th>
                                    <th>Tình trạng</th>
                                    <th>Chức năng</th>
                                </tr>
                                {searchedProduct.map((i, index) => {
                                    return (
                                        <tr key={index + 1}>
                                            <td>{index + 1}</td>
                                            <td>{i.branchId}</td>
                                            <td>{i.fullName}</td>
                                            <td>{i.userName}</td>
                                            <td>{i.phone}</td>
                                            <td>{i.address}</td>
                                            <td>{moment(i.createTime).format('MM/DD/YYYY')}</td>
                                            <td>
                                                i.status === 1 ? (
                                                <div className="MuiTableBody_root-status">Đã tạm đừng</div>
                                                ) : i.status === 1 ? (
                                                <div className="MuiTableBody_root-status activity">
                                                    Đang hoạt động
                                                </div>
                                                )
                                            </td>
                                            <td>
                                                <div className="MuiTableBody_root-itemLast">
                                                    <Link to={`/editemployee/${i.userId}`}>
                                                        <img src={edit} alt="Edit" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </table>
                        </div>
                    </Item>
                </Grid>
            </Grid>
        </div>
    );
}

export default ListEmployees