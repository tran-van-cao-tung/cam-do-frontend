import React from "react";

import { styled } from "@mui/material/styles";
import "./UpdateInfor.css";
import Paper from "@mui/material/Paper";

import saveBtn from "../../../asset/img/save1.png";
import returnBtn from "../../../asset/img/returnBTN.png";
import { Link } from "react-router-dom";

const UpdateInfor = (setShowBanReason) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: "22px 0 22px 27px",
    borderRadius: "10px",
    color: theme.palette.text.secondary,
    height: 700,
  }));

  const handleShow = () => {
    setShowBanReason(true);
  };
  const onHandleNewFile = () => {
    return <input type="file" />;
  };

  return (
    <div className="headerCustomer">
      <h1 className="headerCustomerName">Cập Nhật Khách Hàng</h1>
      <div>
        <Item className="parperCustomer">
          <div className="infoCustomer">
            <div className="userInfo">
              <div className="userInfoLabel">
                <p>
                  Tên khách hàng <span class="starRed">*</span>:
                </p>
                <p>
                  Số CMND/Hộ chiếu:<span class="starRed">*</span>:
                </p>
                <p>
                  Số điện thoại <span class="starRed">*</span>:
                </p>
                <p>
                  Địa chỉ <span class="starRed">*</span>:
                </p>
                <p>
                  Chứng từ <span class="starRed">*</span>:
                </p>
                <p>Điểm tín dụng:</p>
                <p>
                  Tình trạng <span class="starRed">*</span>:
                </p>
              </div>
              <div className="userInfoInput">
                <input type="text" placeholder="Nhập tên khách hàng..." />
                <input type="text" placeholder="Nhập CMND/Hộ chiếu..." />
                <input type="text" placeholder="Nhập số điện thoại..." />
                <input type="text" placeholder="Nhập địa chỉ..." />
                <div className="chungtu">
                  <button onClick={onHandleNewFile}>Thêm mới</button>
                </div>
                <div className="creditPointUser">
                  <span>300</span>
                  <Link to="/customer-manager/updateinfo/detail-credit">
                    <button>Chi tiết</button>
                  </Link>
                </div>
                <div className="radioStatus">
                  <div className="radioContent ">
                    <input
                      checked
                      type="radio"
                      name="status"
                      value="Hoạt động"
                      id="active"
                    />
                    <label for="active" style={{ color: "green" }}>
                      Hoạt động
                    </label>
                  </div>

                  <Link to="/report-customer/update-report/ban-customer">
                    <div
                      className="radioContent"
                      onClick={(e) => handleShow(e)}
                    >
                      <input type="radio" name="status" value="Cấm" id="ban" />
                      <label for="ban" style={{ color: "red" }}>
                        Cấm
                      </label>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="comfirmBtn">
              <button className="saveBtn">
                <img src={saveBtn} alt="" />
                Lưu lại
              </button>
              <Link to="/customer-manager">
                <button className="returnBtn">
                  <img src={returnBtn} alt="" />
                  Quay lại
                </button>
              </Link>
            </div>
          </div>
        </Item>
      </div>
    </div>
  );
};

export default UpdateInfor;
