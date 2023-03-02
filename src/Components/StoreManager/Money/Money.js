import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";
import moneyy from "./../../../asset/img/employees/money.png";
import day from "./../../../asset/img/employees/day.png";
import save from "./../../../asset/img/employees/save.png";
import "./Money.css";

const Money = () => {
  return (
    <>
      <h1 className="money-h1">S1</h1>
      <div className="liststore">
        <div className="bodyText">
          <div className="bodyheader">
            <div className="texth">
              <p>QUỸ TIỀN MẶT</p>
              <p>10,000,000</p>
            </div>
            {/* <div className="texth">
              <p>TIỀN ĐẦU NGÀY</p>
              <p>10,000,000</p>
            </div> */}
            <div className="texth">
              <p>VỐN ĐẦU TƯ</p>
              <p>10,000,000</p>
            </div>
          </div>
          <div className="bodyTT">
            <div>
              <div className="imgbody">
                <img src={moneyy} alt="" /> <span>Nhập quỹ tiền mặt</span>
              </div>
              <div className="bodyTT-2">
                <span>Số tiền</span>
                <div className="input-total">
                <input type="text" placeholder="Gõ vào đây số tiền VNĐ"></input>
                <p>VNĐ</p>
                </div>

                <button>
                  <img src={save} alt="" /> <span>Lưu lại</span>
                </button>
              </div>
            </div>
            {/* <div>
              <div className="imgbody">
                <img src={moneyy} alt="" /> <span>Nhập tiền đầu ngày</span>
              </div>
              <div className="bodyTT-2">
                <span>Số tiền</span>

                <input type="text" placeholder="Gõ vào đây số tiền VNĐ"></input>
                <button>
                  <img src={save} alt="" /> <span>Lưu lại</span>
                </button>
              </div>
            </div> */}
          </div>
          <div className="bodyfoter">
            <div className="imgbody">
              <img src={day} alt="" /> <span>Lịch sử nhập quỹ đầu ngày</span>
            </div>
            <Table className="MuiTable-bordered">
              <TableHead className="MuiTableHead-root">
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Ngày</TableCell>
                  <TableCell>Người tạo</TableCell>
                  <TableCell>Số tiền</TableCell>
                  <TableCell>hoạt động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="MuiTableBody-root">
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>3/1/2023</TableCell>
                  <TableCell className='MuiTableBody_root-name'>
                    <span>Admin1</span>
                  </TableCell>
                  <TableCell className='MuiTableBody_root-name'>
                    <span>+10,000,000</span>
                  </TableCell>
                  <TableCell>Cập nhật tiền đầu ngày</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>3/1/2023</TableCell>
                  <TableCell className='MuiTableBody_root-name'>
                    <span>Admin1</span>
                  </TableCell>
                  <TableCell className='MuiTableBody_root-name'>
                    <span>+10,000,000</span>
                  </TableCell>
                  <TableCell>Nhập lại quỹ tiền mặt</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Money;
