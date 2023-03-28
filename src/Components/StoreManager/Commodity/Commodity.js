import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import "./Commodity.css";
import axios from "axios";


function Commodity() {
    const [commodity, setCommodity] = useState([]);
    useEffect(() => {
        axios.get("http://tranvancaotung-001-site1.ftempurl.com/api/v1/pawnableProduct/getAll/1").then((response) => {
            console.log(response.data);
            setCommodity(response.data);
        });
    }, []);

    const renderCommodityData = () => {
        return commodity?.map((val) => (
            <TableBody className="MuiTableBody-root" >
                <TableRow>
                    <TableCell>{val.pawnableProductId}</TableCell>
                    <TableCell>Cầm đồ</TableCell>
                    <TableCell>
                        <Link to="/commodity/edit">
                            {val.typeOfProduct}
                        </Link>
                    </TableCell>
                    <TableCell>
                        <Link to="/commodity/edit">
                            {val.commodityCode}
                        </Link>
                    </TableCell>
                    <TableCell>
                        {val.status === 1 ? (
                            <div className="MuiTableBody_working-status">
                                <p>Đang hoạt động</p>
                            </div>
                        ) : (
                            <div className="MuiTableBody_stop-status">
                                <p>Đã tạm dừng</p>
                            </div>
                        )}
                    </TableCell>
                </TableRow>
            </TableBody>
        ));
    };
    return (
        <>
            <h1 className="liststore-h1">Danh sách hàng hóa</h1>
            <div className="liststore">
                <div className="liststorebody">
                    {/* Button  Add */}
                    <a href="/commodity/add">
                        <button className="addliststore">Thêm mới hàng hóa</button>
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
                        {renderCommodityData()}
                    </Table>
                </div>
            </div>
        </>
    );
}

export default Commodity;


