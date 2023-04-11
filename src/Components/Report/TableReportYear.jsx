import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API from '../../API';

const TableReportYear = () => {
    const [list, setList] = useState([]);
    const formatMoney = (value) => {
        return (value).toLocaleString('vi-VN') + ' VNĐ';
    }
    //Axios
    useEffect(() => {
        API({
            method: 'get',
            url: '/report/month/1',
        }).then((response) => {
            setList(response.data);
        });
    }, []);

    return (
        <div className="tableYearReport">
            {/* ================================ */}
            {/* =            Table Show        = */}
            {/* ================================ */}
            <div className="table">
                <table className="responstable">
                    <tr>
                        <th>Tháng</th>
                        <th>Tiền Vốn</th>
                        <th>Tiền Cho Vay</th>
                        <th>Tiền Lãi Đã Nhận</th>
                        <th>TIền Thanh Lý</th>
                        <th>Số Dư Cuối Tháng</th>
                        <th>Tiền Gốc Đã Nhận</th>
                        <th>Tổng Quan</th>
                    </tr>
                    {list.map((i) => {
                        return (
                            <tr key={i}>
                                <td>{i.month}</td>
                                <td>{formatMoney(i.fund)}</td>
                                <td>{formatMoney(i.loan)}</td>
                                <td>{formatMoney(i.receiveInterest)}</td>
                                <td>{formatMoney(i.receivedPrincipal)}</td>
                                <td>{formatMoney(i.balance)}</td>
                                <td>{formatMoney(i.liquidationMoney)}</td>
                                <td>
                                    {i.receiveInterest + i.receivedPrincipal + i.liquidationMoney > i.loan ? (
                                        <div className="tableStatus tableLosses">Lỗ</div>
                                    ) : (
                                        <div className="tableStatus tableProfit">Lời</div>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        </div>
    );
};

export default TableReportYear;
