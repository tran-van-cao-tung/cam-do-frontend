import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import API from '../../../API';
import edit from './../../../asset/img/edit.png';
import ext from './../../../asset/img/ext.png';
import './liststore.css';
import { CircularProgress } from '@mui/material';

const ListStore = () => {
    //
    const [list, setList] = useState([]);
    // Axios
    useEffect(() => {
        API({
            method: 'get',
            url: '/branch/getAll/1',
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
            return item.status === (statusFilter === 'active' ? 1 : 0);
        })
        .filter((item) => {
            if (searchTerm.value === '') return item;
            if (item.branchName.toLowerCase().includes(searchTerm.toLowerCase())) return item;
        });
    // ==================================
    // |            Phân Trang        |
    // ==================================
    const [currentPage, setCurrentPage] = useState('');
    const storesPerPage = 5; // số lượng cửa hàng hiển thị trên mỗi trang
    const totalPages = Math.ceil(filteredData.length / storesPerPage); // tính toán số lượng trang
    const startIndex = currentPage * storesPerPage;
    const endIndex = startIndex + storesPerPage;
    const currentPageData = filteredData.slice(startIndex, endIndex);
    const [loading, setLoading] = useState(false);

    const handlePageClick = async ({ selected: selectedPage }) => {
        setLoading(true); // bắt đầu loading
        setCurrentPage(selectedPage);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // giả lập thời gian loading
        setLoading(false); // kết thúc loading
    };

    // const handlePageClick = ({ selected: selectedPage }) => {
    //     setCurrentPage(selectedPage);
    // };

    const formatMoney = (value) => {
        return value.toLocaleString('vi-VN') + ' VNĐ';
    };

    return (
        <>
            <div className="listStoreContainer">
                <h1 id="heading">Danh sách cửa hàng</h1>
                <div className="ListStore1">
                    <div className="liststorebody">
                        {/* Button  Add */}
                        <Link to="/Addliststore/add">
                            <button className="addlistStore">Thêm mới cửa hàng</button>
                        </Link>
                        {/* Status */}
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
                    </div>
                    {/* ================================ */}
                    {/* =            Table Show        = */}
                    {/* ================================ */}
                    <div className="tableContainer">
                        <div className="tableStore">
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

                                {loading ? (
                                    <div>
                                        <CircularProgress />
                                    </div>
                                ) : (
                                    currentPageData.map((item, index) => (
                                        <tr key={index.branchId}>
                                            <td>{index + 1}</td>
                                            <td>{item.branchName}</td>
                                            <td>{item.address}</td>
                                            <td>{item.phoneNumber}</td>
                                            <td>
                                                {Intl.NumberFormat({ style: 'currency', currency: 'VND' }).format(
                                                    item.fund,
                                                )}
                                            </td>
                                            <td>{moment(item.createDate).format('DD/MM/YYYY')}</td>
                                            <td>
                                                {item.status === 1 ? (
                                                    <div className="MuiTableBody_root-status activity">Đang hoạt động</div>
                                                ) : (
                                                    <div className="MuiTableBody_root-status">
                                                        Đã tạm dừng
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <div className="MuiTableBody_root-itemLast">
                                                    {/* <Link to={`/detailsStore/${item.branchId}`}>
                                                        <img src={ext} alt="..." />
                                                    </Link> */}
                                                    <Link to={`/editliststore/edit/${item.branchId}`}>
                                                        <img src={edit} alt="Edit" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </table>
                        </div>
                    </div>
                    {/* ================================ */}
                    {/* =            Phân Trang        = */}
                    {/* ================================ */}
                </div>
            </div>
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
        </>
    );
};

export default ListStore;
