import React from 'react';
import './DetaisPawn.css';
import PageHeader from '../../helpers/PageHeader';
const HeaderPawn = ({ setShowAddContract }) => {
    return (
        <div className="header">
            <PageHeader title="Hợp đồng cầm đồ" />
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
