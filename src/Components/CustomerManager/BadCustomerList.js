import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../../src/API.js';
import edit from './../../asset/img/edit.png';
import ReactPaginate from 'react-paginate';

function ListCustomer({ numPage }) {
    const [customers, setCustomers] = useState([]);
    const [searchAPIData, setSearchAPIData] = useState([]);
    const [onFilter, setOnFilter] = useState();

    useEffect(() => {
        API({
            method: 'GET',
            url: '/customer/getAllBlackList/1',
        }).then((response) => {
            setCustomers(response.data);
            setSearchAPIData(response.data);
            console.log(response.data);
        });
    }, []);

    const onFilterChange = (e) => {
        if (e.target.value == '') {
            setCustomers(searchAPIData);
        } else {
            const filterResult = searchAPIData.filter((item) =>
                item.fullName.toLowerCase().includes(e.target.value.toLowerCase()),
            );
            setCustomers(filterResult);
        }
        setOnFilter(e.target.value);
    };

    function setccnd(e) {
        sessionStorage.setItem("num", e);
    }
    // ==================================
    // |            Phân Trang        |
    // ==================================
    const [currentPage, setCurrentPage] = useState(0);
    const [customersPerPage, setCustomersPerPage] = useState(4);// số lượng cửa hàng hiển thị trên mỗi trang
    const pageCount = Math.ceil(customers.length / customersPerPage);// tính toán số lượng trang
    const startIndex = currentPage * customersPerPage;
    const endIndex = startIndex + customersPerPage;
    const currentCustomers = customers.slice(startIndex, endIndex);

    return (
        <>
            <div className="ListCustomerr">
                {/* ===================================== */}
                {/* |             Add and Search        | */}
                {/* ===================================== */}
                <div className="ListCustomer">
                    {/* Status */}
                    <div className="status">
                        {/* Search */}
                        <div className="searchinput">
                            <input
                                type="text"
                                class="searchTerm"
                                placeholder="Tìm kiếm..."
                                value={onFilter}
                                onChange={(e) => onFilterChange(e)}
                            ></input>
                            {/* <input
                                type="text"
                                placeholder="Tìm kiếm cửa hàng..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            /> */}
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
                            <th>
                                <span>Cửa hàng</span>
                            </th>
                            <th>Họ và tên</th>
                            <th>CMND/CCCD</th>
                            <th>Số điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Lý do</th>
                            <th>Hạng TD</th>
                            <th>Chức năng</th>
                        </tr>
                        {currentCustomers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.numerical}</td>
                                <td>{customer.nameBranch}</td>
                                <td>{customer.fullName}</td>
                                <td>{customer.cccd}</td>
                                <td>{customer.phone}</td>
                                <td>{customer.address}</td>
                                <td>Không trả lãi nhiều lần</td>
                                <td><span className='rank_F'>F</span></td>
                                <td>
                                    <Link to={`/customer-manager/updateinfo/`}>
                                        <img src={edit} alt="Edit" onClick={setccnd(customer.cccd)} />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </table>
                    {/* ================================ */}
                    {/* =            Phân Trang        = */}
                    {/* ================================ */}
                    <ReactPaginate
                        className="paginate-listcustomer"
                        previousLabel={'Trang trước'}
                        nextLabel={'Trang sau'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={pageCount}
                        onPageChange={(data) => {
                            setCurrentPage(data.selected);
                        }}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                </div>
            </div>
        </>
    );
}

export default ListCustomer;
