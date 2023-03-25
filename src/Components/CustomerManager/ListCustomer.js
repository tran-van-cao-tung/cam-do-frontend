import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import edit from './../../asset/img/edit.png';
import { Link } from 'react-router-dom';


function ListCustomer({ numPage }) {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                `http://tranvancaotung-001-site1.ftempurl.com/api/v1/customer/activelist/${0}`,
            );
            setCustomers(result.data);
        };
        fetchData();
    }, [0]);

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell>Cửa hàng</TableCell>
                    <TableCell>Họ và tên</TableCell>
                    <TableCell>CMND/CCCD</TableCell>
                    <TableCell>Số điện thoại</TableCell>
                    <TableCell>Địa chỉ</TableCell>
                    <TableCell>Ngày tạo</TableCell>
                    <TableCell>Hạng TD</TableCell>
                    <TableCell>Chức năng</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {customers.map((customer) => (
                    <TableRow key={customer.id}>
                        <TableCell>{customer.numerical}</TableCell>
                        <TableCell>{customer.nameBranch}</TableCell>
                        <TableCell>{customer.fullName}</TableCell>
                        <TableCell>{customer.cccd}</TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>{customer.address}</TableCell>
                        <TableCell>{customer.createdDate}</TableCell>
                        <TableCell>{customer.point}</TableCell>
                        <TableCell>
                            <Link to={`/customer-manager/updateinfo/`}>
                                <img src={edit} alt="Edit" />
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default ListCustomer;
