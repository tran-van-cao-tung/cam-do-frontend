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
import { Link } from "react-router-dom";
import axios from "axios";

const WareHouse = () => {
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
                <h4 className="wareh-title">Danh sách kho</h4>

                <div className="wareh-content">
                    <div className="actions-section">
                        <Button
                            href="/warehouse/add"
                            variant="contained"
                            className="add-btn"
                        >
                            Thêm mới
                        </Button>
                    </div>

                    <div className="search-section">
                        <FormControl className="status-group">
                            <FormLabel className="label">Tình trạng</FormLabel>
                            <RadioGroup
                                row
                                defaultValue={statusFilter}
                                name="status"
                                value={statusFilter}
                                onChange={handleStatusFilter}
                            >
                                <FormControlLabel
                                    value="available"
                                    control={<Radio />}
                                    label="Còn chỗ"
                                    className="radio-available"
                                />
                                <FormControlLabel
                                    value="full"
                                    control={<Radio />}
                                    label="Hết chỗ"
                                    className="radio-full"
                                />
                                <FormControlLabel
                                    value="closed"
                                    control={<Radio />}
                                    label="Tạm đóng"
                                    className="radio-closed"
                                />
                            </RadioGroup>
                        </FormControl>

                        <FormControl className="city-group" sx={{ minWidth: 100 }}>
                            <Select
                                value={cityFilter}
                                onChange={handleCityFilter}
                                displayEmpty
                                inputProps={{ "aria-label": "Without label" }}
                                className="select-box"
                            >
                                <MenuItem value="HoChiMinh">TP.Hồ Chí Minh</MenuItem>
                                <MenuItem value={"CanTho"}>Cần Thơ</MenuItem>
                                <MenuItem value={"CaMau"}>Cà Mau</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl className="search-box">
                            <InputBase
                                placeholder="Tìm kiếm …"
                                inputProps={{ "aria-label": "search" }}
                                className="search-input"
                            />
                            <SearchIcon className="search-icon" />
                        </FormControl>

                        <Button
                            className="search-btn"
                            variant="contained"
                            endIcon={<SearchIcon />}
                        >
                            Tìm kiếm
                        </Button>
                    </div>

                    <div className="table">
                        <Table className="MuiTable-bordered">
                            <TableHead className="MuiTableHead-root-wrap">
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Cửa hàng</TableCell>
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
                                        <TableCell>{i.warehouseName}</TableCell>
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
                                                <Link to={`/editliststore/edit/${i.branchId}`}>
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
