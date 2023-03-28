import React from "react";
import "./EditCommondity.css";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputBase from "@mui/material/InputBase";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import { Divider } from "@mui/material";

const EditCommondity = () => {
  return (
    <>
      <div className="Addcommondity">
        <h1>Cập nhật cấu hình hàng hóa</h1>
        <div className="wareh-content">
          <div className="add-content">
            {/* Left */}
            <div className="add-commodity-left">
              <h3>Nhập thông tin hàng hoá</h3>
              <Divider />
              <FormControl className="add-input-group">
                <FormLabel className="label">
                  Mã hàng&nbsp;<label style={{ color: "red" }}>*</label>:
                </FormLabel>
                <InputBase
                  placeholder="XM"
                  inputProps={{ "aria-label": "search" }}
                  className="add-input"
                />
              </FormControl>

              <FormControl className="add-input-group">
                <FormLabel className="label">
                  Tên hàng hoá&nbsp;<label style={{ color: "red" }}>*</label>:
                </FormLabel>
                <InputBase
                  placeholder="Xe máy SH"
                  inputProps={{ "aria-label": "search" }}
                  className="add-input"
                />
              </FormControl>
              <FormControl className="add-status-group">
                <FormLabel className="label">
                  Tình trạng&nbsp;<label style={{ color: "red" }}>*</label>:
                </FormLabel>
                <RadioGroup row name="status">
                  <FormControlLabel
                    value="available"
                    control={<Radio />}
                    label="Đang hoạt động"
                    className="radio-available"
                  />

                  <FormControlLabel
                    value="closed"
                    control={<Radio />}
                    label="Khoá"
                    className="radio-closed"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>

          <Divider />

          <div className="add-actions">
            <Button className="save-btn" variant="contained">
              Lưu lại
            </Button>

            <Button className="back-btn" variant="contained" href="/commodity">
              Quay lại
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCommondity;

//Cập nhật API cấu hình hàng hoá
// API cấu hình hàng hoá : http://tranvancaotung-001-site1.ftempurl.com/api/v1/pawnableProduct/getAll/1