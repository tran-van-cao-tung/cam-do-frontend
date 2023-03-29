import React, { useEffect, useState } from 'react'
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import axios from 'axios';
import moment from 'moment';

function History() {
  //Ép kiểu dữ liệu date
  const formatDate = (value) => {
    return moment(value).format('MM/DD/YYYY');
  }
  const columns = [
    {
      field: 'STT', headerName: "STT", width: 10, textAlign: "center", valueGetter: (params) => {
        for (let i = 0; i < rows.length; i++) {
          if (params.row.logContractId === rows[i].logContractId) {
            return (i + 1)
          }
        }
      },
      sortable: false
    },
    {
      field: "logTime", headerName: "Ngày trả lãi", with: 120,
      valueFormatter: (params) => formatDate(params.value)
    },

    { field: "customerName", headerName: "Giao dịch viên", width: 200 },
    {
      field: "debt",
      headerName: " Số tiền ghi nợ",
      with: 180,
    },
    {
      field: "paid",
      headerName: "Số tiền ghi có",
      width: 180,
    },
    {
      field: "eventType",
      headerName: "Nội dung",
      width: 150,
      valueGetter: (params) =>
        `${params.row.eventType === 1
          ? "Tạo hợp đồng"
          : params.row.eventType === 2
            ? "Chưa đóng lãi"
            : params.row.eventType === 3
              ? "Đã đóng lãi"
              : params.row.eventType === 4
                ? "Đóng hợp đồng" : ""
        }`,
    },
    {
      field: "description",
      headerName: "Ghi chú",
      width: 150,
      style: {color:"red"}
    }
  ];

  const [rows, setRowws] = useState([]);

  useEffect(() => {
    axios.get(`http://tranvancaotung-001-site1.ftempurl.com/api/v1/logContract/all/0`).then((res) => {
      setRowws(res.data)
    })
  }, [])

  console.log(rows);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        getRowId={(row) => row.logContractId}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        style={{ textAlign: "center" }}
      />
    </div>
  )
}

export default History