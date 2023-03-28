import React from "react";
import "./ReportComponent.css";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import BtnDetails from "./BtnDetails";
import DetailContract from "./PopUp/DetailContract";
import TableReport from "./TableReport";

import { useState } from "react";

const ReportTotal = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: "22px 0 22px 27px",
    borderRadius: "10px",
    color: theme.palette.text.secondary,
    height: 700,
  }));
  const [showUpdateContract, setShowUpdateContract] = useState(false);

  return (
    <div className="report">
      <h1 className="reportTitle">Tổng Giao Dịch Đã Đóng</h1>
      <div>
        <Item className="parperCustomer">
          <BtnDetails />
          <TableReport setShowUpdateContract={setShowUpdateContract} />

          {showUpdateContract && (
            <DetailContract setShowUpdateContract={setShowUpdateContract} />
          )}
        </Item>
      </div>
    </div>
  );
};

export default ReportTotal;
