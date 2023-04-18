import React from 'react';
import './DetaisPawn.css';
const HeaderPawn = ({ setShowAddContract }) => {
    return (
        <div className="header">
            <h1>Hợp đồng cầm đồ</h1>
            <div className="btnPawn">
                <button onClick={() => setShowAddContract(true)} className="btn-click addnew">
                    Thêm mới
                </button>
                <button className="btn-click export">Xuất file.xlsx</button>
            </div>
        </div>
    );
};

export default HeaderPawn;
