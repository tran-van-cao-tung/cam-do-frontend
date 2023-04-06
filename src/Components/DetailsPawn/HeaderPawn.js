import React from "react";
import './DetaisPawn.css'
const HeaderPawn = ({setShowAddContract}) => {
  return (
    <div className="header">
      <h1>Hợp đồng cầm đồ</h1>
      <div className="btn">
        <button onClick={()=>setShowAddContract(true)} className="btn-click addnew">Thêm mới</button>
        <button className="btn-click export">Xuất file excel</button>
        <button className="btn-click contract">Mẫu hợp đồng</button>
      </div>
    </div>
  );
};

export default HeaderPawn;
