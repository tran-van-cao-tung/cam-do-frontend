import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import './chainstores.css';

export default function ChainStores() {
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
                        <TableCell>S1</TableCell>
                        <TableCell align="center">100000000</TableCell>
                        <TableCell align="center">1000000</TableCell>
                        <TableCell align="center">100000000</TableCell>
                        <TableCell align="center">102000000</TableCell>
                    </TableBody>
                    <TableBody>
                        <TableCell>S2</TableCell>
                        <TableCell align="center">100000000</TableCell>
                        <TableCell align="center">1000000</TableCell>
                        <TableCell align="center">100000000</TableCell>
                        <TableCell align="center">102000000</TableCell>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
