import React from "react";

const data = [
  {
    id: 1,
    month: "T1",
    funds: 170000000,
    loan: 170000000,
    profitReceived: 170000000,
    liquidation: 170000000,
    balance: 170000000,
    principalReceived: 150000000,
    overView: "Lời",
  },
  {
    id: 2,
    month: "T2",
    funds: 170000000,
    loan: 170000000,
    profitReceived: 170000000,
    liquidation: 170000000,
    balance: 170000000,
    principalReceived: 150000000,
    overView: "Lời",
  },
  {
    id: 3,
    month: "T3",
    funds: 170000000,
    loan: 170000000,
    profitReceived: 170000000,
    liquidation: 170000000,
    balance: 170000000,
    principalReceived: 150000000,
    overView: "Lỗ",
  },
  {
    id: 4,
    month: "T4",
    funds: 170000000,
    loan: 170000000,
    profitReceived: 170000000,
    liquidation: 170000000,
    balance: 170000000,
    principalReceived: 150000000,
    overView: "Lỗ",
  },
  {
    id: 5,
    month: "T5",
    funds: 170000000,
    loan: 170000000,
    profitReceived: 170000000,
    liquidation: 170000000,
    balance: 170000000,
    principalReceived: 150000000,
    overView: "Lỗ",
  },
  {
    id: 6,
    month: "T6",
    funds: 170000000,
    loan: 170000000,
    profitReceived: 170000000,
    liquidation: 170000000,
    balance: 170000000,
    principalReceived: 150000000,
    overView: "Lỗ",
  },
  {
    id: 7,
    month: "T7",
    funds: 170000000,
    loan: 170000000,
    profitReceived: 170000000,
    liquidation: 170000000,
    balance: 170000000,
    principalReceived: 150000000,
    overView: "Lời",
  },
  {
    id: 8,
    month: "T8",
    funds: 170000000,
    loan: 170000000,
    profitReceived: 170000000,
    liquidation: 170000000,
    balance: 170000000,
    principalReceived: 150000000,
    overView: "Lỗ",
  },
  {
    id: 9,
    month: "T9",
    funds: 170000000,
    loan: 170000000,
    profitReceived: 170000000,
    liquidation: 170000000,
    balance: 170000000,
    principalReceived: 150000000,
    overView: "Lỗ",
  },
  {
    id: 10,
    month: "T10",
    funds: 170000000,
    loan: 170000000,
    profitReceived: 170000000,
    liquidation: 170000000,
    balance: 170000000,
    principalReceived: 150000000,
    overView: "Lời",
  },
  {
    id: 11,
    month: "T11",
    funds: 170000000,
    loan: 170000000,
    profitReceived: 170000000,
    liquidation: 170000000,
    balance: 170000000,
    principalReceived: 150000000,
    overView: "Lỗ",
  },
  {
    id: 12,
    month: "T12",
    funds: 170000000,
    loan: 170000000,
    profitReceived: 170000000,
    liquidation: 170000000,
    balance: 170000000,
    principalReceived: 150000000,
    overView: "Lỗ",
  },
];
const TableReportYear = () => {
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

        {data.map((val, id) => {
          //   if (val.overView === "Lỗ") {
          //     return <td className="tableLosses">{val.overView}</td>;
          //   } else if (val.overView === "Lời") {
          //     return <td className="tableProfit">{val.overView}</td>;
          //   }
          return (
            <tr key={id}>
              <td>{val.month}</td>
              <td>{val.funds}</td>
              <td>{val.loan}</td>
              <td>{val.profitReceived}</td>
              <td>{val.liquidation}</td>
              <td>{val.balance}</td>
              <td>{val.principalReceived}</td>
              {val.overView === "Lỗ" ? (
                <td className="tableStatus tableLosses">{val.overView}</td>
              ) : (
                <td className="tableStatus tableProfit">{val.overView}</td>
              )}
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default TableReportYear;
