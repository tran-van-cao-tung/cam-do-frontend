import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import API from '../../API';
import edit from './../../asset/img/edit.png';
import ext from './../../asset/img/ext.png';
import './package.css';

const ListStore = () => {
    //
    const [list, setList] = useState([]);
    // Axios
    useEffect(() => {
        
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
            <h1 className="liststorebody-h1">Điều chỉnh gói vay</h1>
            <div className="liststore">
                {/* ================================ */}
                {/* =            Table Show        = */}
                {/* ================================ */}
                <div className="table">
                    <table className="responstable">
                        <tr>
                            <th>Tên gói vay</th>
                            <th data-th="Driver details">
                                <span>Lãi suất</span>
                            </th>
                            <th>Số ngày</th>
                            <th>Kỳ lãi</th>
                            <th>Số ngày trễ hạn</th>
                            <th>Phạt đợt 1</th>
                            <th>Phạt đợt 2</th>
                            <th>Thanh lý vào ngày</th>
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
                                            <img src={ext} alt="..." />
                                            <img src={edit} alt="Edit" />
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
