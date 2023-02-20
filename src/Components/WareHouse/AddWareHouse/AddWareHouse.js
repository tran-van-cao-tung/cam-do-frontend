import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Divider, FormHelperText, StyledEngineProvider } from "@mui/material";

import "./AddWareHouse.css";
import { useState } from "react";

const WareHouse = () => {
    const [statusFilter, setStatusFilter] = useState("available");

    const handleStatusFilter = (e) => {
        setStatusFilter(e.target.value);
    };

    return (
        <StyledEngineProvider injectFirst>
            <div className="wareh-wrapper">
                <h4 className="wareh-title">Thêm mới kho</h4>

                <div className="wareh-content">
                    <div className="add-section">
                        <FormControl className="add-input-group">
                            <FormLabel className="label">
                                Tên kho&nbsp;<label style={{ color: "red" }}>*</label>:
                            </FormLabel>
                            <InputBase
                                placeholder="Nhập tên kho …"
                                inputProps={{ "aria-label": "search" }}
                                className="add-input"
                            />
                            {/* <FormHelperText id="component-error-text">
                                Error
                            </FormHelperText> */}
                        </FormControl>

                        <FormControl className="add-input-group">
                            <FormLabel className="label">
                                Địa chỉ&nbsp;<label style={{ color: "red" }}>*</label>:
                            </FormLabel>
                            <InputBase
                                placeholder="Nhập địa chỉ …"
                                inputProps={{ "aria-label": "search" }}
                                className="add-input"
                            />
                        </FormControl>

                        <FormControl className="add-status-group">
                            <FormLabel className="label">
                                Tình trạng&nbsp;<label style={{ color: "red" }}>*</label>:
                            </FormLabel>
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
                    </div>

                    <Divider />

                    <div className="add-actions">
                        <Button
                            className="save-btn"
                            variant="contained"
                            startIcon={<SearchIcon />}
                        >
                            Lưu lại
                        </Button>

                        <Button
                            className="back-btn"
                            variant="contained"
                            startIcon={<ArrowBackIcon />}
                            href="/warehouse"
                        >
                            Quay lại
                        </Button>
                    </div>
                </div>
            </div>
        </StyledEngineProvider>
    );
};

export default WareHouse;
