import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import edit from './../../../asset/img/edit.png';
import ext from './../../../asset/img/ext.png';
import axios from 'axios';
import moment from 'moment';
import './liststore.css';

const ListStore = () => {
    //
    const [list, setList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const searchedProduct = list.filter((item) => {
        if (searchTerm.value === "") return item;
        if (
            item.branchName
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        )
            return item;
    })
    // Axios
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://tranvancaotung-001-site1.ftempurl.com/api/v1/branch/getChain',
        }).then((res) => {
            setList(res.data);
            // console.log('aaaaa', res.data);
        });
    }, []);

    return (
        <>
            <h1 className="liststorebody-h1">Danh sách cửa hàng</h1>
            <div className="liststore">
                <div className="liststorebody">
                    {/* Button  Add */}
                    <a href="/Addliststore/add">
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
                            {/* <input type="text" class="searchTerm" placeholder="Tìm kiếm..."></input> */}
                            <input
                                type="text"
                                placeholder="I'm looking for...."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
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
                                <TableCell>Cửa hàng</TableCell>
                                <TableCell>Địa Chỉ</TableCell>
                                <TableCell>Số điện thoại</TableCell>
                                <TableCell>Vốn đầu tư</TableCell>
                                <TableCell>Ngày tạo</TableCell>
                                <TableCell>Tình trạng</TableCell>
                                <TableCell>Chức năng</TableCell>
                            </TableRow>
                        </TableHead>
                        {/* =================================== */}
                        <TableBody className="MuiTableBody-root">
                            {searchedProduct.map((i) => (
                                <TableRow key={i.branchId}>
                                    <TableCell>{i.branchId}</TableCell>
                                    <TableCell>{i.branchName}</TableCell>
                                    <TableCell>{i.address}</TableCell>
                                    <TableCell>{i.phoneNumber}</TableCell>
                                    <TableCell>{i.fund}</TableCell>
                                    <TableCell>{moment(i.createDatex).format('MM/DD/YYYY')}</TableCell>
                                    <TableCell>
                                        {i.status === 1 ? (
                                            <div className="MuiTableBody_root-status">Đã tạm đừng</div>
                                        ) : (
                                            <div className="MuiTableBody_root-status activity">Đang hoạt động</div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="MuiTableBody_root-itemLast">
                                            <Link to="#">
                                                <img src={ext} alt="..." />
                                            </Link>
                                            <Link to={`/editliststore/edit/${i.branchId}`}>
                                                <img src={edit} alt="Edit" />
                                            </Link>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
};

export default ListStore;