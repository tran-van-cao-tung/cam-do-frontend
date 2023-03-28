import React from "react";
import "./ReportComponent.css";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import BtnForReportYear from "./BtnForReportYear";
import TableReportYear from "./TableReportYear";

const ReportYear = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: "22px 0 22px 27px",
    borderRadius: "10px",
    color: theme.palette.text.secondary,
    height: 700,
  }));
  return (
    <div className="report">
      <h1 className="reportTitle">Báo Cáo</h1>
      <div>
        <Item className="parperCustomer">
          <BtnForReportYear />
          <TableReportYear />
        </Item>
      </div>
    </div>
  );
};

export default ReportYear;
