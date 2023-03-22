import React, { useEffect, useState } from "react";
import axios from "axios";

// const data = [
//   {
//     id: 1,
//     month: "T1",
//     funds: 170000000,
//     loan: 170000000,
//     profitReceived: 170000000,
//     liquidation: 170000000,
//     balance: 170000000,
//     principalReceived: 150000000,
//     overView: "Lời",
//   },
//   {
//     id: 2,
//     month: "T2",
//     funds: 170000000,
//     loan: 170000000,
//     profitReceived: 170000000,
//     liquidation: 170000000,
//     balance: 170000000,
//     principalReceived: 150000000,
//     overView: "Lời",
//   },
//   {
//     id: 3,
//     month: "T3",
//     funds: 170000000,
//     loan: 170000000,
//     profitReceived: 170000000,
//     liquidation: 170000000,
//     balance: 170000000,
//     principalReceived: 150000000,
//     overView: "Lỗ",
//   },
//   {
//     id: 4,
//     month: "T4",
//     funds: 170000000,
//     loan: 170000000,
//     profitReceived: 170000000,
//     liquidation: 170000000,
//     balance: 170000000,
//     principalReceived: 150000000,
//     overView: "Lỗ",
//   },
//   {
//     id: 5,
//     month: "T5",
//     funds: 170000000,
//     loan: 170000000,
//     profitReceived: 170000000,
//     liquidation: 170000000,
//     balance: 170000000,
//     principalReceived: 150000000,
//     overView: "Lỗ",
//   },
//   {
//     id: 6,
//     month: "T6",
//     funds: 170000000,
//     loan: 170000000,
//     profitReceived: 170000000,
//     liquidation: 170000000,
//     balance: 170000000,
//     principalReceived: 150000000,
//     overView: "Lỗ",
//   },
//   {
//     id: 7,
//     month: "T7",
//     funds: 170000000,
//     loan: 170000000,
//     profitReceived: 170000000,
//     liquidation: 170000000,
//     balance: 170000000,
//     principalReceived: 150000000,
//     overView: "Lời",
//   },
//   {
//     id: 8,
//     month: "T8",
//     funds: 170000000,
//     loan: 170000000,
//     profitReceived: 170000000,
//     liquidation: 170000000,
//     balance: 170000000,
//     principalReceived: 150000000,
//     overView: "Lỗ",
//   },
//   {
//     id: 9,
//     month: "T9",
//     funds: 170000000,
//     loan: 170000000,
//     profitReceived: 170000000,
//     liquidation: 170000000,
//     balance: 170000000,
//     principalReceived: 150000000,
//     overView: "Lỗ",
//   },
//   {
//     id: 10,
//     month: "T10",
//     funds: 170000000,
//     loan: 170000000,
//     profitReceived: 170000000,
//     liquidation: 170000000,
//     balance: 170000000,
//     principalReceived: 150000000,
//     overView: "Lời",
//   },
//   {
//     id: 11,
//     month: "T11",
//     funds: 170000000,
//     loan: 170000000,
//     profitReceived: 170000000,
//     liquidation: 170000000,
//     balance: 170000000,
//     principalReceived: 150000000,
//     overView: "Lỗ",
//   },
//   {
//     id: 12,
//     month: "T12",
//     funds: 170000000,
//     loan: 170000000,
//     profitReceived: 170000000,
//     liquidation: 170000000,
//     balance: 170000000,
//     principalReceived: 150000000,
//     overView: "Lỗ",
//   },
// ];
const TableReportYear = () => {
  const [list, setList] = useState([]);

  //Axios
  useEffect(() => {
    axios({
      method: "get",
      url:
        "http://tranvancaotung-001-site1.ftempurl.com/api/v1/report/report/month",
    }).then((response) => {
      setList(response.data);
    });
  }, []);

  return (
    <div className="tableYearReport">
      <table>
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
              {i.receiveInterest + i.receivedPrincipal + i.liquidationMoney >
              i.loan ? (
                <td className="tableStatus tableLosses">Lỗ</td>
              ) : (
                <td className="tableStatus tableProfit">Lời</td>
              )}
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default TableReportYear;
