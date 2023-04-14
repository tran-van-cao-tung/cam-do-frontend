import React, { useState } from "react";
import API from '../../../API';
import { useNavigate } from "react-router-dom";

const BanSomeOne = () => {
  const navigate = useNavigate();
  const [showBan, setShowBan] = useState(false);
  const handleShowBan = () => {
    API({
      method: 'put',
      url: '/customer/updateCustomer',
      data: {
        customerId: "",
          cccd: "cccd",
          fullName: "",
          phone: "",
          address: "",
          status: 2,
          reason: reason,
      },
  })
      .then((res) => {
          alert('Blacklist thành công');
      })
      .catch((err) => {
          console.log(err);
          alert('Blacklist fail');
      });
  };
  const [reason, setReason] = useState();
  const handleReason = (e) => {
    setReason(e.target.value);
};
  return (
    <div className="reasonContainer">
      <div className="reasonContent">
        <h1>
          Chuyển Khách Hàng Vào Danh Sách <span className="starRed">CẤM</span>
        </h1>
        <div className="reasonChange">
          <label>
            Lý do<span className="starRed">*</span>:
          </label>
          <input className="inputReason" value={reason} onChange={handleReason}/>
        </div>
        <div className="btnReason">
          <button className="banBtn" onClick={() => handleShowBan()}>
            Cấm
          </button>
          <button className="closeBtn" onClick={() => navigate(-1)}>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default BanSomeOne;
