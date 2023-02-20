import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Chip, IconButton, MenuItem, Select, StyledEngineProvider } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "./WareHouse.css";
import editIcon from "../../asset/img/edit.png";
import { useState } from "react";

const WareHouse = () => {
    const [cityFilter, setCityFilter] = useState("HoChiMinh");
    const [statusFilter, setStatusFilter] = useState("available");

    const handleCityFilter = (e) => {
        setCityFilter(e.target.value);
    };

    const handleStatusFilter = (e) => {
        setStatusFilter(e.target.value);
    };

    function createData(name, address, status, actions) {
        return { name, address, status, actions };
    }

    const rows = [
        createData(
            "Kho 1",
            "120 Gò Dầu, Tân Quý, Tân Phú, TP.Hồ Chí Minh",
            "Còn chỗ",
            "Chức năng"
        ),
        createData(
            "Kho 2",
            "500 Tân Kỳ Tân Quý, Bình Hưng Hòa, Bình Tân, TP.Hồ Chí Minh",
            "Hết chỗ",
            "Chức năng"
        ),
        createData(
            "Kho 3",
            "185 Tân Kỳ Tân Quý, Bình Hưng Hòa, Bình Tân, TP.Hồ Chí Minh",
            "Tạm đóng",
            "Chức năng"
        ),
    ];

    return (
        <StyledEngineProvider injectFirst>
            <div className="wareh-wrapper">
                <h4 className="wareh-title">Danh sách kho</h4>

                <div className="wareh-content">
                    <div className="actions-section">
                        <Button variant="contained" className="add-btn">
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

                    <div className="table-section">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            align="center"
                                            className="table-header-cell"
                                        >
                                            STT
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            className="table-header-cell"
                                        >
                                            Tên kho
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            className="table-header-cell"
                                        >
                                            Địa chỉ
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            className="table-header-cell"
                                        >
                                            Tình trạng
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            className="table-header-cell"
                                        >
                                            Chức năng
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, index) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{
                                                "&:last-child td, &:last-child th": {
                                                    border: 0,
                                                },
                                            }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.address}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.status === "Còn chỗ" ? (
                                                    <Chip
                                                        label="Còn chỗ"
                                                        sx={{
                                                            background:
                                                                "var(--color-success)",
                                                            color: "white",
                                                            minWidth: "100px",
                                                        }}
                                                    />
                                                ) : row.status === "Hết chỗ" ? (
                                                    <Chip
                                                        label="Hết chỗ"
                                                        sx={{
                                                            background:
                                                                "var(--color-warning)",
                                                            color: "white",
                                                            minWidth: "100px",
                                                        }}
                                                    />
                                                ) : (
                                                    <Chip
                                                        label="Tạm đóng"
                                                        sx={{
                                                            background:
                                                                "var(--color-error)",
                                                            color: "white",
                                                            minWidth: "100px",
                                                        }}
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    aria-label="edit"
                                                    color="primary"
                                                    className="edit-action-btn"
                                                >
                                                    <img
                                                        alt="edit-action"
                                                        src={editIcon}
                                                    />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </StyledEngineProvider>
    );
};

export default WareHouse;
