import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { json, Link } from 'react-router-dom';
import edit from './../../asset/img/edit.png';
import API from '../../../src/API.js';

function ListCustomer({ numPage }) {
    const [customers, setCustomers] = useState([]);
    const [searchAPIData, setSearchAPIData] = useState([]);
    const [onFilter, setOnFilter] = useState();

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await axios.get(`http://tranvancaotung-001-site1.ftempurl.com/api/v1/customer/getAll/0`);
    //         setCustomers(result.data);
    //         setSearchAPIData(result.data);
    //     };
    //     fetchData();
    // }, []);

    useEffect(() => {
        API({
            method: 'GET',
            url: '/customer/getAll/0',
        }).then((response) => {
            setCustomers(response.data);
            setSearchAPIData(response.data);
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
    return (
        <>
            <div className="ListCustomerr">
                {/* ===================================== */}
                {/* |             Add and Search        | */}
                {/* ===================================== */}
                <div className="ListCustomer">
                    {/* Button  Add */}
                    <a href="#">
                        <button className="addliststore">Thêm mới khách hàng</button>
                    </a>
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
                            <th>Ngày tạo</th>
                            <th>Hạng TD</th>
                            <th>Chức năng</th>
                        </tr>
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.numerical}</td>
                                <td>{customer.nameBranch}</td>
                                <td>{customer.fullName}</td>
                                <td>{customer.cccd}</td>
                                <td>{customer.phone}</td>
                                <td>{customer.address}</td>
                                <td>{moment(customer.createdDate).format('DD/MM/YYYY')}</td>
                                <td>{customer.point}</td>
                                <td>
                                    <Link to={`/customer-manager/updateinfo/`}>
                                        <img src={edit} alt="Edit" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </>
    );
}

export default ListCustomer;
