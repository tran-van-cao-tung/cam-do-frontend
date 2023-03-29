import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import edit from './../../asset/img/edit.png';
import { Link } from 'react-router-dom';
import moment from 'moment';


function ListCustomer({ numPage }) {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                `http://tranvancaotung-001-site1.ftempurl.com/api/v1/customer/getAll/0`,
            );
            setCustomers(result.data);
        };
        fetchData();
    }, [0]);

    return (
        <>
            {/* ================================ */}
            {/* =            Table Show        = */}
            {/* ================================ */}
            <div className="table">
                <table className="responstable">
                    <tr>
                        <th>STT</th>
                        <th><span>Cửa hàng</span></th>
                        <th>Họ và tên</th>
                        <th>CMND/CCCD</th>
                        <th>Số điện thoại</th>
                        <th>Địa chỉ</th>
                        <th>Ngày tạo</th>
                        <th>Hạng TD</th>
                        <th>Chức năng</th>
                    </tr>
                    {
                        customers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.numerical}</td>
                                <td>{customer.nameBranch}</td>
                                <td>{customer.fullName}</td>
                                <td>{customer.cccd}</td>
                                <td>{customer.phone}</td>
                                <td>{customer.address}</td>
                                <td>{moment(customer.createTime).format('MM/DD/YYYY')}</td>
                                <td>{customer.point}</td>
                                <td>
                                    <Link to={`/customer-manager/updateinfo/`}>
                                        <img src={edit} alt="Edit" />
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </table>
            </div>
        </>
    );
}

export default ListCustomer;
