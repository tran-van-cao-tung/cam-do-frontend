import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import "./DetaisPawn.css";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Link } from 'react-router-dom';
import subwallet from "../../asset/img/subwallet.png";
import note from "../../asset/img/note.png";
import moment from "moment";
import cash from "../../asset/img/cash.png";
import wallet from "../../asset/img/wallet.png";
const ContractNoti = () => {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: "22px 0 22px 27px",
        borderRadius: "10px",
        color: theme.palette.text.secondary,
        height: 700,
      }));

      const formatDate = (value) => {
        return moment(value).format('MM/DD/YYYY');
      }
    
      const formatMoney = (value) => {
        return (value).toLocaleString('vi-VN') + ' VNĐ';
      }
      const columns = [
        {
          field: '#', headerName: "#", width: 10, textAlign: "center", valueGetter: (params) => {
            for (let i = 0; i < rows.length; i++) {
              if (params.row.contractId === rows[i].contractId) {
                return (i + 1)
              }
            }
          },
          sortable: false
        },
        { field: "contractCode", headerName: "Mã HĐ", with: 20 },
        { field: "customerName", headerName: "Khách Hàng", width: 200 },
        {
          field: "commodityCode",
          headerName: " Mã TS",
        },
        {
          field: "contractAssetName",
          headerName: "Tài Sản",
          width: 80,
        },
        {
          field: "loan",
          headerName: "Tổng tiền",
          width: 160,
          valueFormatter: (params) => formatMoney(params.value)
    
        },
        {
          field: "contractStartDate",
          headerName: "Ngày Cầm",
          width: 150,
          valueFormatter: (params) => formatDate(params.value)
        },
        {
          field: "contractEndDate",
          headerName: "Ngày đến hạn",
          width: 150,
          valueFormatter: (params) => formatDate(params.value)
        },
        {
            field: "reason",
            headerName: "Lý do",
            width: 300,
          },
        {
          field: "ChucNang",
          headerName: "Chức năng",
          type: "actions",
          getActions: (params, index) => [
            <GridActionsCellItem icon={<img src={cash} />} />,
          ],
    
          width: 160,
        },
      ];
    
      const rows = [
        {
          id: 1,
          contractCode: 1,
          customerName: "Nguyen Tran Khanh Hoa",
          commodityCode: "ĐT",
          contractAssetName: "string",
          loan: "1000000",
          contractStartDate: "23/12/2022",
          contractEndDate: "23/12/2022",
          reason: "Hôm nay đóng 40,000 tiền lãi"
        },
      ];
    return (
        <div className="details-pawn">
      <h1 className="header">Thông báo thu nợ hôm nay</h1>
      <div>
      <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        style={{ align: "center" }}
      />
    </div>
      </div>
    </div>
    );
};

export default ContractNoti;
