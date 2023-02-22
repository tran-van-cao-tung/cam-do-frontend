import React from "react";
import './AddList.css';

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputBase from "@mui/material/InputBase";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import { Divider } from "@mui/material";


const AddList = () => {
    return (<>
        <div className="Addliststore">
            <h1>Thêm mới cửa hàng</h1>
            <div className="wareh-content">
                <div className="add-section">
                    <FormControl className="add-input-group">
                        <FormLabel className="label">
                            Tên cửa hàng&nbsp;<label style={{ color: "red" }}>*</label>:
                        </FormLabel>
                        <InputBase
                            placeholder="Nhập tên cửa hàng"
                            inputProps={{ "aria-label": "search" }}
                            className="add-input"
                        />

                    </FormControl>

                    <FormControl className="add-input-group">
                        <FormLabel className="label">
                            Số điện thoại&nbsp;<label style={{ color: "red" }}>*</label>:
                        </FormLabel>
                        <InputBase
                            placeholder="Nhập số điện thoại …"
                            inputProps={{ "aria-label": "search" }}
                            className="add-input"
                        />
                    </FormControl>

                    <FormControl className="add-input-group">
                        <FormLabel className="label">
                            Địa chỉ&nbsp;<label style={{ color: "red" }}>*</label>:
                        </FormLabel>
                        <InputBase
                            placeholder="Nhập địa chỉ"
                            inputProps={{ "aria-label": "search" }}
                            className="add-input"
                        />

                    </FormControl>

                    <FormControl className="add-input-group">
                        <FormLabel className="label">
                            Số vốn đầu tư&nbsp;<label style={{ color: "red" }}>*</label>:
                        </FormLabel>
                        <InputBase
                            placeholder="Nhập số vốn đầu tư"
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
                            name="status"
                        >
                            <FormControlLabel
                                value="available"
                                control={<Radio />}
                                label="Đang hoạt động"
                                className="radio-available"
                            />

                            <FormControlLabel
                                value="closed"
                                control={<Radio />}
                                label="Đã tạm dừng"
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

                    >
                        Lưu lại
                    </Button>

                    <Button
                        className="back-btn"
                        variant="contained"

                        href="/warehouse"
                    >
                        Quay lại
                    </Button>
                </div>
            </div>

        </div>
    </>)
}

export default AddList