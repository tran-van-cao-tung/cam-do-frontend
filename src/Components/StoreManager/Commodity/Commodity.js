import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Commodity.css';
import './Table.scss';
import callAPI from '../../../API';
import ReactPaginate from 'react-paginate';

function Commodity() {
    const [commodity, setCommodity] = useState([]);
    useEffect(() => {
        callAPI({
            method: 'get',
            url: `/pawnableProduct/getAll/1`,
        }).then((res) => {
            console.log(res.data);
            setCommodity(res.data);
        })

    }, []);
    // =========================================
    // |                Search                 |
    // =========================================
    // const [searchTerm, setSearchTerm] = useState("");
    // const commoditySearch = commodity.filter((item) => {
    //     if (searchTerm.value === "") return item;
    //     if (
    //         item.typeOfProduct
    //             .toLowerCase()
    //             .includes(searchTerm.toLowerCase())
    //     )
    //         return item;
    // })
    // =================================

    // ==================================
    // |  Filter Value Radio and Search |
    // ==================================
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = commodity.filter((item) => {
        if (statusFilter === 'all' && searchTerm === '') return true;
        if (statusFilter !== 'all' && item.status !== (statusFilter === 'active' ? 0 : 1)) return false;
        if (searchTerm !== '' && !item.typeOfProduct.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        return true;
    });
    // ==================================
    // |            Phân trang          |
    // ==================================
    const [pageNumber, setPageNumber] = useState(0);

    const usersPerPage = 6;// số lượng cửa hàng hiển thị trên mỗi trang
    const pagesVisited = pageNumber * usersPerPage;
    // được sử dụng để hiển thị danh sách sản phẩm trên trang hiện tại
    const displayUsers = filteredData
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((val) => (
            <tr>
                <td>{val.pawnableProductId}</td>
                <td>Cầm đồ</td>
                <td>
                    <Link to={`/commodity/edit/${val.pawnableProductId}`}>
                        {val.typeOfProduct}
                    </Link>
                </td>
                <td>
                    <Link to={`/commodity/edit/${val.pawnableProductId}`}>
                        {val.commodityCode}
                    </Link>
                </td>
                <td className="Style Frond">
                    {val.status === 0 ? (
                        <div className="MuiTableBody_working-status">
                            <p>Đang hoạt động</p>
                        </div>
                    ) : (
                        <div className="MuiTableBody_stop-status">
                            <p>Đã tạm dừng</p>
                        </div>
                    )}
                </td>
            </tr>
        ));

    const pageCount = Math.ceil(filteredData.length / usersPerPage);// tính toán số lượng trang

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    return (
        <>
            <h1 className="liststore-h1">Danh sách hàng hóa</h1>
            <div className="liststore">
                <div className="liststorebody">
                    {/* Button  Add */}
                    <a href="/commodity/add">
                        <button className="addliststore">Thêm mới hàng hóa</button>
                    </a>
                    {/* Status */}
                    <div className="status">
                        <span>Tình Trạng</span>
                        {/* From status  */}
                        <span className="fromstatus">
                            <FormControl className="form-iteam">
                                <RadioGroup
                                    className="radio-item"
                                    aria-label="status"
                                    name="status"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
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
                            {/* <input
                                type="text"
                                class="searchTerm"
                                placeholder="Tìm kiếm..."
                            ></input> */}
                            <input
                                type="text"
                                placeholder="Tìm kiếm cửa hàng..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        {/* Button Search */}
                        {/* <span className="buttonsearch">
                    <button>Tìm Kiếm</button>
                </span> */}
                    </div>
                </div>
                {/* ================================ */}
                {/* =            Table Show        = */}
                {/* ================================ */}
                <div className="table">
                    <table class="responstable">
                        <tr>
                            <th>STT</th>
                            <th data-th="Driver details">
                                <span>Lĩnh vực</span>
                            </th>
                            <th>Tên hàng hoá</th>
                            <th>Mã</th>
                            <th>Tình trạng</th>
                        </tr>
                        {displayUsers}
                    </table>
                    {/* ================================ */}
                    {/* =            Phân trang        = */}
                    {/* ================================ */}
                    <ReactPaginate
                        className='paginate-commodity'
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                    />
                </div>
            </div>
        </>
    );
}

export default Commodity;
