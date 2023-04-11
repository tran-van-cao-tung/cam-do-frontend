import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import edit from './../../../asset/img/edit.png';
import ext from './../../../asset/img/ext.png';
import './liststore.css';
import ReactPaginate from 'react-paginate';
import API from '../../../API';

const ListStore = () => {
    //
    const [list, setList] = useState([]);
    // Axios
    useEffect(() => {
        API({
            method: 'get',
            url: '/branch/getChain',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        }).then((res) => {
            setList(res.data);
            // console.log('aaaaa', res.data);
        });
    }, []);
    // ==================================
    // |  Filter Value Radio and Search |
    // ==================================
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const filteredData = list
        .filter((item) => {
            if (statusFilter === 'all') return true;
            return item.status === (statusFilter === 'active' ? 0 : 1);
        })
        .filter((item) => {
            if (searchTerm.value === '') return item;
            if (item.branchName.toLowerCase().includes(searchTerm.toLowerCase())) return item;
        });
    // ==================================
    // |            Phân Trang        |
    // ==================================
    const [currentPage, setCurrentPage] = useState('');
    const storesPerPage = 4; // số lượng cửa hàng hiển thị trên mỗi trang
    const totalPages = Math.ceil(filteredData.length / storesPerPage); // tính toán số lượng trang
    const startIndex = currentPage * storesPerPage;
    const endIndex = startIndex + storesPerPage;
    const currentPageData = filteredData.slice(startIndex, endIndex);

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };
    return (
        <>
            <h1 className="liststorebody-h1">Danh sách cửa hàng</h1>
            <div className="liststore">
                <div className="liststorebody">
                    {/* Button  Add */}
                    <Link to="/Addliststore/add">
                        <button className="addliststore">Thêm mới cửa hàng</button>
                    </Link>
                    {/* Status */}
                    <div className="status">
                        <span>Tình Trạng</span>
                        {/* From status  */}
                        <span className="fromstatus">
                            <FormControl className="form-iteam">
                                <RadioGroup
                                    className="radio-item"
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
                </div>
                {/* ================================ */}
                {/* =            Table Show        = */}
                {/* ================================ */}
                <div className="table">
                    <table className="responstable">
                        <tr>
                            <th>STT</th>
                            <th data-th="Driver details">
                                <span>Cửa hàng</span>
                            </th>
                            <th>Địa chỉ</th>
                            <th>Số điện thoại</th>
                            <th>Vốn đầu tư</th>
                            <th>Ngày tạo</th>
                            <th>Tình trạng</th>
                            <th>Chức năng</th>
                        </tr>
                        {currentPageData.map((item, index) => (
                            <tr key={index.branchId}>
                                <td>{index + 1}</td>
                                <td>{item.branchName}</td>
                                <td>{item.address}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{Intl.NumberFormat({ style: 'currency', currency: 'VND' }).format(item.fund)}</td>
                                <td>{moment(item.createDate).format('DD/MM/YYYY')}</td>
                                <td>
                                    {item.status === 1 ? (
                                        <div className="MuiTableBody_root-status">Đã tạm đừng</div>
                                    ) : (
                                        <div className="MuiTableBody_root-status activity">Đang hoạt động</div>
                                    )}
                                </td>
                                <td>
                                    <div className="MuiTableBody_root-itemLast">
                                        <Link to={`/detailsStore/${item.branchId}`}>
                                            <img src={ext} alt="..." />
                                        </Link>
                                        <Link to={`/editliststore/edit/${item.branchId}`}>
                                            <img src={edit} alt="Edit" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
                {/* ================================ */}
                {/* =            Phân Trang        = */}
                {/* ================================ */}
                <ReactPaginate
                    className="paginate-listStore"
                    previousLabel={'Trang trước'}
                    nextLabel={'Trang sau'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </div>
        </>
    );
};

export default ListStore;
