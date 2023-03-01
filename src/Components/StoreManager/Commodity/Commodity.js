import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import "./Commodity.css";

function Commodity() {
    return (
        <>
            <h1 className="liststore-h1">Danh sách cửa hàng</h1>
            <div className="liststore">
                <div className="liststorebody">
                    {/* Button  Add */}
                    <a href="/commodity/add">
                        <button className="addliststore">Thêm mới cửa hàng</button>
                    </a>
                    {/* Status */}
                    <div className="status">
                        <span>Tình Trạng</span>
                        {/* From status  */}
                        <span className="fromstatus">
                            <FormControl className="form-iteam">
                                <RadioGroup className="radio-item">
                                    <FormControlLabel
                                        value="all"
                                        control={<Radio />}
                                        label="Tất cả"
                                        className="radio-all"
                                    />
                                    <FormControlLabel
                                        value="active"
                                        control={<Radio />}
                                        label="Đang hoạt động"
                                        className="radio-active"
                                    />
                                    <FormControlLabel
                                        value="stop"
                                        control={<Radio />}
                                        label="Đã tạm dừng"
                                        className="radio-stop"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </span>
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
                                {/* <TableCell>Tiền cầm</TableCell>
                                <TableCell>Lãi xuất</TableCell>
                                <TableCell>Kỳ lãi</TableCell>
                                <TableCell>Thanh lý sau</TableCell> */}
                                <TableCell>Tình trạng</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="MuiTableBody-root">
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>Cầm đồ</TableCell>
                                <TableCell className="MuiTableBody_root-name">
                                    <Link to="/commodity/edit">
                                        <span>Xe máy</span>
                                    </Link>
                                </TableCell>
                                <TableCell className="MuiTableBody_root-name">
                                    <Link to="/commodity/edit">
                                        <span>XM</span>
                                    </Link>
                                </TableCell>
                                {/* <TableCell>0</TableCell>
                                <TableCell>3%/1 tuần</TableCell>
                                <TableCell>7 ngày</TableCell>
                                <TableCell>2 tuàn quá hạng</TableCell> */}
                                <TableCell className="MuiTableBody_root-iteam">
                                    <span className="MuiTableBody_root-status activity">
                                        Đang làm việc
                                    </span>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>Cầm đồ</TableCell>
                                <TableCell className="MuiTableBody_root-name">
                                    <Link to="/commodity/edit">
                                        <span>Xe máy</span>
                                    </Link>
                                </TableCell>
                                <TableCell className="MuiTableBody_root-name">
                                    <Link to="/commodity/edit">
                                        <span>XM</span>
                                    </Link>
                                </TableCell>
                                {/* <TableCell>0</TableCell>
                                <TableCell>3%/1 tuần</TableCell>
                                <TableCell>7 ngày</TableCell>
                                <TableCell>2 tuàn quá hạng</TableCell> */}
                                <TableCell className="MuiTableBody_root-iteam">
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
