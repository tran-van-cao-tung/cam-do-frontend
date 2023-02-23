import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import "./Commodity.css";

function Commodity() {
    return (
        <>
            <div className="liststore">
                <h1>Danh sách cửa hàng</h1>
                <div className="liststorebody">
                    {/* Button  Add */}
                    <a href="/commodity/add">
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
                            <input name="gender" type="radio" value="Khoá" />
                            <p>Khoá</p>
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
                        <TableHead className="MuiTableHead-root-wrap">
                            <TableRow>
                                <TableCell>STT</TableCell>
                                <TableCell>Lĩnh vực</TableCell>
                                <TableCell>Tên hàng hoá</TableCell>
                                <TableCell>Mã</TableCell>
                                <TableCell>Tiền cầm</TableCell>
                                <TableCell>Lãi xuất</TableCell>
                                <TableCell>Kỳ lãi</TableCell>
                                <TableCell>Thanh lý sau</TableCell>
                                <TableCell>Tình trạng</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="MuiTableBody-root">
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>Cầm đò</TableCell>
                                <TableCell className="MuiTableBody_root-name">
                                    <span>Xe máy</span>
                                </TableCell>
                                <TableCell className="MuiTableBody_root-name">
                                    <span>XM</span>
                                </TableCell>
                                <TableCell>0</TableCell>
                                <TableCell>3%/1 tuần</TableCell>
                                <TableCell>7 ngày</TableCell>
                                <TableCell>2 tuàn quá hạng</TableCell>
                                <TableCell>
                                    <div className="MuiTableBody_root-status activity">
                                        Đang làm việc
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>Cầm đò</TableCell>
                                <TableCell className="MuiTableBody_root-name">
                                    <span>Ô tô</span>
                                </TableCell>
                                <TableCell className="MuiTableBody_root-name">
                                    <span>OTO</span>
                                </TableCell>
                                <TableCell>0</TableCell>
                                <TableCell>3%/1 tuần</TableCell>
                                <TableCell>7 ngày</TableCell>
                                <TableCell>2 tuàn quá hạng</TableCell>
                                <TableCell>
                                    <div className="MuiTableBody_root-status">Khoá</div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default Commodity;
