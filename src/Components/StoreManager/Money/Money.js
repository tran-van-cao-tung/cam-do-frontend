import React from 'react';
import day from './../../../asset/img/day.png';
import moneyy from './../../../asset/img/money.png';
import save from './../../../asset/img/save.png';
import './Money.css';

const Money = () => {
    return (
        <>
            <h1 className="money-h1">S1</h1>
            <div className="liststore">
                <div className="bodyText">
                    <div className="bodyheader">
                        <div className="texth">
                            <p>QUỸ TIỀN MẶT</p>
                            <p>10,000,000</p>
                        </div>
                    </div>
                    <div className="bodyTT">
                        <div>
                            <div className="imgbody">
                                <img src={moneyy} alt="" /> <span>Nhập quỹ tiền mặt</span>
                            </div>
                            <div className="bodyTT-2">
                                <span>Số tiền</span>
                                <div className="input-total">
                                    <input type="text" placeholder="Gõ vào đây số tiền VNĐ"></input>
                                    <p>VNĐ</p>
                                </div>

                                <button>
                                    <img src={save} alt="" /> <span>Lưu lại</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bodyfoter">
                        <div className="imgbody">
                            <img src={day} alt="" /> <span>Lịch sử nhập quỹ tiền mặt</span>
                        </div>
                        {/* ================================ */}
                        {/* =            Table Show        = */}
                        {/* ================================ */}
                        <table className="responstable">
                            <tr>
                                <th>STT</th>
                                <th data-th="Driver details">
                                    <span>Ngày</span>
                                </th>
                                <th>Người tạo</th>
                                <th>Số tiền</th>
                                <th>Hoạt động</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>3/1/2023</td>
                                <td className="MuiTableBody_root-name">
                                    <span>Admin1</span>
                                </td>
                                <td className="MuiTableBody_root-name">
                                    <span>+10,000,000</span>
                                </td>
                                <td>Nhập lại quỹ tiền mặt</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>3/1/2023</td>
                                <td className="MuiTableBody_root-name">
                                    <span>Admin1</span>
                                </td>
                                <td className="MuiTableBody_root-name">
                                    <span>+10,000,000</span>
                                </td>
                                <td>Nhập lại quỹ tiền mặt</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Money;
