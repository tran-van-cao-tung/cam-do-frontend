import React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

// import { Link } from "react-router-dom";

const TableReport = ({ setShowUpdateContract }) => {
  const handleShow = (id) => {
    setShowUpdateContract(true);
    console.log(id);
  };

  const columns = [
    { field: "stt", headerName: "#", minWidth: 10, align: "center" },
    {
      field: "idContract",
      headerName: "Mã HĐ",
      type: "actions",
      getActions: (params, index) => [
        <GridActionsCellItem
          icon={<span>CD-001</span>}
          onClick={(e) => handleShow(params.id)}
        />,
      ],
      minWidth: 170,
      align: "center",
    },
    {
      field: "customer",
      headerName: "Khách Hàng",
      minWidth: 170,
      align: "center",
    },
    {
      field: "idProperti",
      headerName: "Mã TS",
      align: "center",
      minWidth: 170,
    },
    {
      field: "properti",
      headerName: "Tài Sản",
      align: "center",
      minWidth: 170,
    },
    {
      field: "pawnMoney",
      headerName: "Tiền Cầm",
      minWidth: 210,
      align: "center",
    },
    {
      field: "pawnDate",
      headerName: "Ngày Cầm",
      minWidth: 210,
      align: "center",
    },
    {
      field: "deadlineContract",
      headerName: "Hạn Cuối HĐ",
      minWidth: 210,
      align: "center",
    },
  ];

  const rows = [
    {
      id: 1,
      stt: 1,
      idContract: "CD-0001",
      idProperti: "Nguyen Tran Khanh Hoa",
      customer: "XM",
      properti: "Xe SH Trắng",
      pawnMoney: 9400000,
      deadlineContract: "25 / 12 / 2022",
      pawnDate: "23 / 12 / 2022",
    },
    {
      id: 2,
      stt: 2,
      idContract: "CD-0001",
      idProperti: "Nguyen Tran Khanh Hoa",
      customer: "OT",
      properti: "Xe SH Trắng",
      pawnMoney: 9400000,
      deadlineContract: "25 / 12 / 2022",
      pawnDate: "23/12/2022",
    },
    {
      id: 3,
      stt: 3,
      idContract: "CD-0001",
      idProperti: "Nguyen Tran Khanh Hoa",
      customer: "OT",
      properti: "Xe SH Trắng",
      pawnMoney: 9400000,
      deadlineContract: "25 / 12 / 2022",
      pawnDate: "23 / 12 / 2022",
    },
  ];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        style={{ align: "center" }}
      />
    </div>
  );
};

export default TableReport;
