import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import "./chainstores.css";

function createData(name, money, capital, pawnloan, collected) {
  return { name, money, capital, pawnloan, collected };
}

const rows = [
  createData("S1", 890000000, 1000000000, 110000000, 0),
  createData("S2", 1000000000, 1000000000, 0, 0),
];

export default function ChainStores() {
  return (
      <div className="tableChainStores">
      <TableContainer component={Paper}>
        <h1 className="heading">Tổng quát các cửa hàng</h1>
        <div className="transaction"></div>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
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
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.money}</TableCell>
                <TableCell align="center">{row.capital}</TableCell>
                <TableCell align="center">{row.pawnloan}</TableCell>
                <TableCell align="center">{row.collected}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
  );
}
