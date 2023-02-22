import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import deletee from "./../../../asset/img/employees/delete.png";
import edit from "./../../../asset/img/employees/edit.png";
import ext from "./../../../asset/img/employees/ext.png";

import "./liststore.css";

const ListStore = () => {
  
  return (
    <>
      <div className="liststore">
        <h1>Danh sách cửa hàng</h1>
        <div className="liststorebody">
          {/* Button  Add */}
          <a href="/Addliststore/add">
            <button className="addliststore">Thêm mới cửa hàng</button>
          </a>
          {/* Status */}
          <div className="status">
            <span>Tình Trạng</span>
            {/* From status  */}
            <div className="fromstatus">
              <input name="gender" type="radio" value="Tất cả" />
              <p>Tất cả</p>
              <input name="gender" type="radio" value="Đang hoạt động" />
              <p>Đang hoạt động</p>
              <input name="gender" type="radio" value="Đã tạm dừng" />
              <p>Đã tạm dừng</p>
            </div>
            {/* Search */}
            <div className="searchinput">
              <input
                type="text"
                class="searchTerm"
                placeholder="Tìm kiếm..."
              ></input>
            </div>
            {/* Button Search */}
            <span className="buttonsearch">
              <button>Tìm Kiếm</button>
            </span>
          </div>
        </div>
        {/* Table Store */}
        <div className="table">
          <Table className="MuiTable-bordered">
            <TableHead className="MuiTableHead-root">
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Cửa hàng</TableCell>
                <TableCell>Địa Chỉ</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Vốn đầu tư</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Tình trạng</TableCell>
                <TableCell>Chức năng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="MuiTableBody-root">
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>S1</TableCell>
                <TableCell>
                  <span>180/6/8 Gò Dầu, Tân Quý, Tân Phú, TP.Hồ Chí Minh</span>
                </TableCell>
                <TableCell>0958394293</TableCell>
                <TableCell>1,000,000,000</TableCell>
                <TableCell>22/12/2022</TableCell>
                <TableCell>
                  <div className="MuiTableBody_root-status activity">
                    Đang làm việc
                  </div>
                </TableCell>
                <TableCell>
                  <div className="MuiTableBody_root-itemLast">
                    <img src={ext} alt="" />
                    <img src={edit} alt="" />
                    <img src={deletee} alt="" />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>S2</TableCell>
                <TableCell className="MuiTableBody_root-name">
                  <span>
                    100 Trần Bá Giao, Phường 5, Gò Vấp, TP.Hồ Chí Minh
                  </span>
                </TableCell>
                <TableCell>0984736284</TableCell>
                <TableCell>1,000,000,000</TableCell>
                <TableCell>22/12/2022</TableCell>
                <TableCell>
                  <div className="MuiTableBody_root-status">Đã tạm đừng</div>
                </TableCell>
                <TableCell>
                  <div className="MuiTableBody_root-itemLast">
                    <img src={ext} alt="" />
                    <img src={edit} alt="" />
                    <img src={deletee} alt="" />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ListStore;
