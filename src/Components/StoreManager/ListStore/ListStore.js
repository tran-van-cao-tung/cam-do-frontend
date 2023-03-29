import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import edit from './../../../asset/img/edit.png';
import ext from './../../../asset/img/ext.png';
import './liststore.css';


const ListStore = () => {
    //
    const [list, setList] = useState([]);
    // Search 
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
                                placeholder="Tìm kiếm cửa hàng..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        
                    </div>
                </div>
                {/* ================================ */}
                {/* =            Table Show        = */}
                {/* ================================ */}
                <div className="table">
                    <table className="responstable">
                        <tr>
                            <th>STT</th>
                            <th data-th="Driver details"><span>Cửa hàng</span></th>
                            <th>Địa chỉ</th>
                            <th>Số điện thoại</th>
                            <th>Vốn đầu tư</th>
                            <th>Ngày tạo</th>
                            <th>Tình trạng</th>
                            <th>Chức năng</th>
                        </tr>
                        {
                            searchedProduct.map((i) => (
                                <tr key={i.branchId}>
                                    <td>{i.branchId}</td>
                                    <td>{i.branchName}</td>
                                    <td>{i.address}</td>
                                    <td>{i.phoneNumber}</td>
                                    <td>{i.fund}</td>
                                    <td>{moment(i.createDate).format('DD/MM/YYYY')}</td>
                                    <td>
                                        {i.status === 1 ? (
                                            <div className="MuiTableBody_root-status">Đã tạm đừng</div>
                                        ) : (
                                            <div className="MuiTableBody_root-status activity">Đang hoạt động</div>
                                        )}
                                    </td>
                                    <td>
                                        <div className="MuiTableBody_root-itemLast">
                                            <Link to={`/detailsStore/${i.branchId}`}>
                                                <img src={ext} alt="..." />
                                            </Link>
                                            <Link to={`/editliststore/edit/${i.branchId}`}>
                                                <img src={edit} alt="Edit" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </table>
                </div>
            </div>
        </>
    );
};

export default ListStore;