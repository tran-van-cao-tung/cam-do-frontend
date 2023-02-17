import React from "react";
import "./popup.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import user from "../../../asset/img/userpagedetai.png";

const AddContract = ({ setShowAddContract }) => {
  return (
    <div className="add-contract" onClick={() => setShowAddContract(false)}>
      <div className="content-contract" onClick={(e) => e.stopPropagation()}>
        {/* Tiêu đề */}
        <div className="heading-contract">
          <h1>Thêm mới hợp đồng</h1>
          <div className="sub-heading">
            <p>
              Mã hợp đồng <span className="start-red">*</span>: CĐ-0007
            </p>
            <p>Điểm tín dụng: 0</p>
          </div>
        </div>
        <div className="contents">
          {/* Thông tin khách hàng */}
          <div>
            <div className="heading-info-user heading-user">
              <div className="heading-info-user">
                <img src={user} alt='hk' />
                <h1 className="titile-user">Thông tin khách hàng</h1>
              </div>
              <div className="heading-info-user btn-radio-user">
                <p>
                  Khách hàng <span className="start-red">*</span>:{" "}
                </p>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Khách hàng mới"
                      control={<Radio />}
                      label="Khách hàng mới"
                    />
                    <FormControlLabel
                      value="Khách hàng cũ"
                      control={<Radio />}
                      label="Khách hàng cũ"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>
          {/* thông tin cầm đồ */}
          <div></div>
          {/* Thông tin tài sản */}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default AddContract;
