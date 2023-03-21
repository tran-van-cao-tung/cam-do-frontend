import React, { useState } from "react";

const BanSomeOne = () => {
  const [showBan, setShowBan] = useState(false);
  const handleShowBan = (id) => {};
  return (
    <div className="reasonContainer">
      <div className="reasonContent">
        <h1>
          Chuyển Khách Hàng Vào Danh Sách <span className="starRed">CẤM</span>
          ???
        </h1>
        <div className="reasonChange">
          <label>
            Lý do<span className="starRed">*</span>:
          </label>
          <input className="inputReason" />
        </div>
        <div className="btnReason">
          <button className="banBtn" onClick={(e) => handleShowBan()}>
            Cấm
          </button>
          <button className="closeBtn">Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default BanSomeOne;
