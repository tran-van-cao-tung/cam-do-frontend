import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { MenuItem, Select, StyledEngineProvider } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import "./WareHouse.css";
import editIcon from "./../../../asset/img/edit.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const WareHouse = () => {
    const history = useNavigate();
    const [cityFilter, setCityFilter] = useState("HoChiMinh");
    const [statusFilter, setStatusFilter] = useState("available");

    const handleCityFilter = (e) => {
        setCityFilter(e.target.value);
    };

    const handleStatusFilter = (e) => {
        setStatusFilter(e.target.value);
    };

    // Axios
    const [listWarehouse, setListWarehouse] = useState([]);
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://tranvancaotung-001-site1.ftempurl.com/api/v1/warehouse/GetAll/1',
        }).then((res) => {
            setListWarehouse(res.data);
            // console.log('aaaaa', res.data);
        });
    }, []);
    return (
        <StyledEngineProvider injectFirst>
            <div className="wareh-wrapper">
                <h1 className="employee_heading">Danh sách kho</h1>

                <div className="wareh-content">
                    <button
                        className="employee_button"
                        onClick={() => {
                            history('/warehouse/add');
                        }}
                    >
                        Thêm mới
                    </button>
                    <div className="table">
                        <Table className="MuiTable-bordered">
                            <TableHead className="MuiTableHead-root-wrap">
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Tên kho</TableCell>
                                    <TableCell>Địa Chỉ</TableCell>
                                    <TableCell>Tình trạng</TableCell>
                                    <TableCell>Chức năng</TableCell>
                                </TableRow>
                            </TableHead>
                            {/* =================================== */}
                            <TableBody className="MuiTableBody-root">
                                {listWarehouse.map((i) => (
                                    <TableRow key={i.warehouseId}>
                                        <TableCell>{i.warehouseId}</TableCell>
                                        <TableCell>
                                        <Link to={`/viewproduct/`}>
                                        {i.warehouseName}
                                        </Link>
                                            </TableCell>
                                        <TableCell>{i.warehouseAddress}</TableCell>
                                        <TableCell>
                                            {i.status === 1 ? (
                                                <div className="MuiTableBody_root-status">Đã tạm đừng</div>
                                            ) : (
                                                <div className="MuiTableBody_root-status activity">Đang hoạt động</div>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="MuiTableBody_root-itemLast">
                                                <Link to={`/editwarehouse/edit/${i.warehouseId}`}>
                                                    <img src={editIcon} alt="Edit" />
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </StyledEngineProvider>
    );
};

export default WareHouse;
