import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './chainstores.css';

const ChainStores = () => {
    // Axios
    const [chainstores, setchainstores] = useState([]);
    // Axios
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://tranvancaotung-001-site1.ftempurl.com/api/v1/branch/getDetailById/1',
        }).then((res) => {
            setchainstores(res.data);
        });
    }, []);
    return (
        <div className="tableChainStores">
            <TableContainer component={Paper}>
                <h1 className="heading">Tổng quát các cửa hàng</h1>
                <div className="transaction"></div>
                <Table className="table-name">
                    <TableHead>
                        <TableRow>
                            <TableCell>Tên cửa hàng</TableCell>
                            <TableCell align="center">Quỹ tiền mặt</TableCell>
                            <TableCell align="center">Vốn đầu tư</TableCell>
                            <TableCell align="center">Cho vay cầm đồ</TableCell>
                            <TableCell align="center">Lãi đã thu</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{chainstores.branchName}</TableCell>
                            <TableCell align="center">{chainstores.fund}</TableCell>
                            <TableCell align="center">{chainstores.loanContract}</TableCell>
                            <TableCell align="center">100000000</TableCell>
                            <TableCell align="center">{chainstores.recveivedInterest}</TableCell>
                        </TableRow>
                    </TableBody>

                    <TableBody>
                        <TableRow>
                            <TableCell>S2</TableCell>
                            <TableCell align="center">100000000</TableCell>
                            <TableCell align="center">1000000</TableCell>
                            <TableCell align="center">100000000</TableCell>
                            <TableCell align="center">102000000</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ChainStores