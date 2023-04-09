import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TableReportYear = () => {
    const [list, setList] = useState([]);

    //Axios
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://tranvancaotung-001-site1.atempurl.com/api/v1/report/report/month/1',
            headers: {
                Authorization: `Bearer 3fa85f64-5717-4562-b3fc-2c963f66afa6`,
            },
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
                                <td>{i.fund}</td>
                                <td>{i.loan}</td>
                                <td>{i.receiveInterest}</td>
                                <td>{i.receivedPrincipal}</td>
                                <td>{i.balance}</td>
                                <td>{i.liquidationMoney}</td>
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
