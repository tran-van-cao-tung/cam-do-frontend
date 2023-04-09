
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import './chainstores.css';

const ChainStores = () => {
    // Axios
    const [chainstores, setchainstores] = useState([]);
    // Axios
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://tranvancaotung-001-site1.atempurl.com/api/v1/branch/getChain',
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('accessToken')}`
            },
        }).then((res) => {
            setchainstores(res.data);
        });
    }, []);
    return (
        <div className="tableChainStores">
            <TableContainer component={Paper}>
                <h1 className="heading">Tổng quát các cửa hàng</h1>
                <div className="transaction"></div>
                {/* ================================ */}
                {/* =            Table Show        = */}
                {/* ================================ */}
                <table className="responstable">
                    <tr>
                        <th>Tên cửa hàng</th>
                        <th data-th="Driver details"><span>Quỹ tiền mặt</span></th>
                        <th>Vốn đầu tư</th>
                        <th>Cho vay cầm đồ</th>
                        <th>Lãi đã thu</th>
                    </tr>
                    {
                        chainstores.map((chainstore) => (
                            <tr key={chainstore.branchName} >
                                <td>{chainstore.branchName}</td>
                                <td align="center">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(chainstore.balance)}</td>
                                <td align="center">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(chainstore.fund)}</td>
                                <td align="center">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(chainstore.loan)}</td>
                                <td align="center">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(chainstore.recveivedInterest)}</td>
                            </tr>
                        ))
                    }
                </table>
            </TableContainer>
        </div>
    );
};

export default ChainStores;
