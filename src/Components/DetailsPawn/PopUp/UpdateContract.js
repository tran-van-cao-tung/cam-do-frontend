import React, { useEffect, useRef, useState } from "react";
import "./popup.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import user from "../../../asset/img/userpagedetai.png";
import bike from "../../../asset/img/bike.png";
import save from "../../../asset/img/save1.png";
import close from "../../../asset/img/close1.png";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const UpdateContract = ({setShowUpdateContract}) => {
  const [nameImg, setNameImg] = useState("");
  const [img, setImg] = useState("");
  const imginput = useRef();
  useEffect(() => {
    return () => {
      img && URL.revokeObjectURL(img.preview);
    };
  }, [img]);
  const handleClickImg = () => {
    imginput.current.click();
  };
  const handleImg = (e) => {
    const file = e.target.files[0];
    setNameImg(file.name);
    file.preview = URL.createObjectURL(file);
    setImg(file.preview);
  };
  return (
   <div>
     <div className="add-contract" onClick={() => setShowUpdateContract(false)}>
    
    <div className="content-contract" onClick={(e) => e.stopPropagation()}>
      {/* Tiêu đề */}
      <div className="heading-contract">
        <h1>Cập nhật hợp đồng</h1>
        <div className="sub-heading">
          <p>
            Mã hợp đồng <span className="start-red">*</span>: CĐ-0007
          </p>
          <p>Điểm tín dụng: 0</p>
        </div>
      </div>
      <div className="contents">
        {/* Thông tin khách hàng */}
        <div className="mgb21">
          <div className="heading-info-user heading-user">
            <div className="heading-info-user">
              <img src={user} alt="hk" />
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
          <div className="box__user">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <div className="user__info">
                    <div className="user__info-label">
                      <p>
                        Tên khách hàng <span class="start-red">*</span>:
                      </p>
                      <p>Số CMND/Hộ chiếu:</p>
                    </div>
                    <div className="user__info-input">
                      <input type="text"  placeholder="Nhập tên khách hàng" />
                      <input type="text" placeholder="Nhập CMND/Hộ chiếu" />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className="user__info">
                    <div className="user__info-label">
                      <p>
                        Số điện thoại <span class="start-red">*</span>:
                      </p>
                      <p>
                        Địa chỉ <span class="start-red">*</span>:
                      </p>
                    </div>
                    <div className="user__info-input">
                      <input type="text" placeholder="Nhập số điện thoại" />
                      <input
                        type="text"
                        placeholder="Nhập địa chỉ khách hàng"
                      />
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </div>
        </div>
        {/* thông tin cầm đồ */}
        <div className="mgb21">
          <div className="heading-info-user heading-user">
            <div className="heading-info-user">
              <img src={user} alt="hk" />
              <h1 className="titile-user">Thông tin cầm đồ</h1>
            </div>
          </div>
          <div className="box__user">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <div className="user__info">
                    <div className="user__info-label">
                      <p>
                        Loại tài sản<span class="start-red">*</span>:
                      </p>
                      <p>
                        Tên tài sản <span class="start-red">*</span>:
                      </p>
                      <p>
                        Phí bảo hiểm<span class="start-red">*</span>:
                      </p>
                      <p>
                        Phí lưu kho<span class="start-red">*</span>:
                      </p>
                      <p>
                        Tổng số tiền vay<span class="start-red">*</span>:
                      </p>
                      <p>
                        NV thu tiền<span class="start-red">*</span>:
                      </p>
                    </div>
                    <div className="user__info-input">
                      <select>
                        <option>--Loại TS--</option>
                        <option>loại 1</option>
                        <option>loại 2</option>
                      </select>
                      <input type="text" placeholder="Nhập tên tài sản" />
                      <div className="box__input">
                        <input type="number" placeholder="0" />
                        <span>VNĐ</span>
                      </div>
                      <div className="box__input">
                        <input type="number" placeholder="0" />
                        <span>VNĐ</span>
                      </div>
                      <div className="box__input">
                        <input type="number" placeholder="0" />
                        <span>VNĐ</span>
                      </div>
                      <input type="text" placeholder="NV thu tiền" />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className="user__info">
                    <div className="user__info-label">
                      <p>
                      Hình thức lãi: 
                      </p>
                      <p>Kỳ lãi:</p>
                      <p>Ngày vay:</p>
                      <p>Số tháng vay:</p>
                      <p>Lãi : </p>
                      <p>Số tiền lãi dự kiến :</p>
                    </div>
                    <div className="user__info-input">
                     <p>Lãi tháng  (6/9/12 tháng)</p>

                      <p className="flcenter">1 tuần</p>
                      <input type="date" />
                      <p className="flcenter">3</p>
                      <input type="number" />
                      <p className="flend">1.000.000 VNĐ</p>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </div>
        </div>
        {/* Thông tin tài sản */}

        <div className="mgb21">
          <div className="heading-info-user heading-user">
            <div className="heading-info-user">
              <img src={bike} alt="hk" />
              <h1 className="titile-user">Thông tin tài sản</h1>
            </div>
          </div>
          <div className="box__user">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <div className="user__info">
                    <div className="user__info-label">
                      <p>
                        Số seri <span class="start-red">*</span>:
                      </p>
                      <p>
                        Hình hảnh <span class="start-red">*</span>:
                      </p>
                    </div>
                    <div className="user__info-input">
                      <input type="text" placeholder="Nhập tên khách hàng" />
                      <div className="input__img" onClick={handleClickImg}>
                        {nameImg === "" ? <p>Thả tệp</p> : <p>{nameImg}</p>}
                        <input
                          ref={imginput}
                          onChange={handleImg}
                          type="file"
                        />
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className="btn__group">
                    <button className="btn btn__save">
                      <img src={save} alt="" />
                      Lưu lại
                    </button>
                    <button className="btn btn__close">
                      <img src={close} alt="" />
                      Đóng
                    </button>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </div>
        </div>
        <div>
          <img src={img} alt="" style={{ width: "100%" }} />
        </div>
      </div>
    </div>
  </div>
   </div>
  );
};

export default UpdateContract;
