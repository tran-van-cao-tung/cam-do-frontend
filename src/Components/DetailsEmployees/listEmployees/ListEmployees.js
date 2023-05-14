import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import edit from './../../../asset/img/edit.png';
import './employee.css';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import API from '../../../API';
import ReactPaginate from 'react-paginate';
import { AuthContext } from '../../../helpers/AuthContext';

function ListEmployees() {
    const history = useNavigate();

    const [statusFilter, setStatusFilter] = useState('all');
    const {currentBranchId } = useContext(AuthContext);
    const [listEmployees, setListEmployee] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const searchedProduct = listEmployees
        .filter((item) => {
            if (searchTerm.value === '') return item;
            if (item.fullName.toLowerCase().includes(searchTerm.toLowerCase())) return item;
        })
        .filter((item) => {
            if (statusFilter === 'all') return true;
            return item.status === (statusFilter === 'active' ? 0 : 1);
        });
    // Axios
    useEffect(() => {
        if(currentBranchId){
            API({
                method: 'get',
                url: '/user/getAll/1/'+ currentBranchId,
            }).then((res) => {
                setListEmployee(res.data);
                console.log('aaaaa', res.data);
            });
        }
    }, [currentBranchId, setListEmployee]);


    console.log(searchedProduct);
    // ==================================
    // |            Phân Trang        |
    // ==================================
    const [currentPage, setCurrentPage] = useState(0);
    const [productsPerPage, setProductsPerPage] = useState(5); // số lượng cửa hàng hiển thị trên mỗi trang
    const totalPages = Math.ceil(listEmployees.length / productsPerPage); // tính toán số lượng trang
    const indexOfLastProduct = (currentPage + 1) * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = listEmployees.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };
    return (
        <>
            <div className="box_employee">
                <h1 id="heading">Danh sách nhân viên</h1>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div className="list_box-employee">
                            <button
                                className="employee_button"
                                onClick={() => {
                                    history('/addemployee');
                                }}
                            >
                                Thêm mới
                            </button>
                            <div className="statusStore">
                                <span>Tình Trạng</span>
                                {/* From status  */}
                                <span className="fromstatusStore">
                                    <FormControl className="formIteam">
                                        <RadioGroup
                                            className="radioItem"
                                            aria-label="filter"
                                            name="filter"
                                            value={statusFilter}
                                            onChange={(event) => setStatusFilter(event.target.value)}
                                        >
                                            <FormControlLabel
                                                value="all"
                                                control={<Radio />}
                                                label="Tất cả"
                                                className="radio-all"
                                            />
                                            <FormControlLabel
                                                value="active"
                                                control={<Radio />}
                                                label="Đang hoạt động"
                                                className="radio-active"
                                            />
                                            <FormControlLabel
                                                value="stop"
                                                control={<Radio />}
                                                label="Đã tạm dừng"
                                                className="radio-stop"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </span>
                                {/* Search */}
                                <div className="searchinput">
                                    {/* <input type="text" class="searchTerm" placeholder="Tìm kiếm..."></input> */}
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm cửa hàng..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            {/* ================================ */}
                            {/* =            Table Show        = */}
                            {/* ================================ */}
                            <div className="tableContainer">
                                <div
                                    className="tableEmployee _table-Listemoloyess"
                                    style={{ overflowX: 'scroll', minWidth: '500px', borderRadius: '10px' }}
                                >
                                    <table className="responstable" style={{ width: '110%' }}>
                                        <tr>
                                            <th>STT</th>
                                            <th data-th="Driver details">
                                                <span>Cửa hàng</span>
                                            </th>
                                            <th style={{ width: '15%' }}>Họ và tên</th>
                                            <th>Tài khoản</th>
                                            <th>Số điện thoại</th>
                                            <th style={{ width: '23%' }}>Nơi làm việc</th>
                                            <th>Ngày tạo</th>
                                            <th>Tình trạng</th>
                                            <th>Chức năng</th>
                                        </tr>
                                        {currentProducts.map((i, index) => {
                                            return (
                                                <tr key={index + 1}>
                                                    <td>{index + 1}</td>
                                                    <td>{i.branchId}</td>
                                                    <td style={{ padding: '0px', margin: '9px 0' }}>{i.fullName}</td>
                                                    <td>{i.userName}</td>
                                                    <td>{i.phone}</td>
                                                    <td>{i.address}</td>
                                                    <td>{moment(i.createTime).format('MM/DD/YYYY')}</td>
                                                    <td>
                                                        {i.status === 2 ? (
                                                            <div className="MuiTableBody_root-status">Đã tạm đừng</div>
                                                        ) : (
                                                            <div className="MuiTableBody_root-status activity">
                                                                Đang hoạt động
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="MuiTableBody_root-itemLast">
                                                            <Link to={`/editemployee/${i.userId}`}>
                                                                <img src={edit} alt="Edit" />
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </table>
                                    {/* ================================ */}
                                    {/* =            Phân Trang        = */}
                                    {/* ================================ */}
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <ReactPaginate
                className="paginate-listemployees"
                previousLabel={'Trang Trước'}
                nextLabel={'Trang Sau'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        </>
    );
}

export default ListEmployees;
