import React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

import funcEdit from "../../asset/img/function.png";

const ListCustomer = () => {
  const handleShowUpdateInformation = (id) => {
    // setShowUpdateContract(true);
    console.log(id);
  };

  const columns = [
    { field: "stt", headerName: "STT", minWidth: 20, align: "center" },
    { field: "store", headerName: "Cửa Hàng", minWidth: 100, align: "center" },
    {
      field: "fullName",
      headerName: "Họ và Tên",
      minWidth: 170,
      align: "center",
    },
    {
      field: "cmnd",
      headerName: "CMND/CCCD",
      align: "center",
      minWidth: 170,
    },
    {
      field: "phone",
      headerName: "Số Điện Thoại",
      align: "center",
      minWidth: 170,
    },
    {
      field: "address",
      headerName: "Địa Chỉ",
      minWidth: 210,
      align: "center",
    },
    {
      field: "dateCreate",
      headerName: "Ngày Tạo",
      minWidth: 150,
      align: "center",
    },

    {
      field: "hangId",
      headerName: "Hạng ID",
      valueGetter: (params) =>
        `${
          params.row.hangId === 0
            ? "A"
            : params.row.hangId === 1
            ? "B"
            : params.row.hangId === 2
            ? "C"
            : params.row.hangId === 3
            ? "F"
            : ""
        }`,
      minWidth: 150,
      align: "center",
    },

    {
      field: "ChucNang",
      headerName: "Chức năng",
      type: "actions",
      getActions: (params, index) => [
        <Link to="/customer-manager/updateinfo">
          <GridActionsCellItem
            icon={<img src={funcEdit} alt="" />}
            onClick={(e) => handleShowUpdateInformation(params.id)}
          />
          ,
        </Link>,
      ],

      minWidth: 160,
      align: "center",
    },
  ];

  const rows = [
    {
      id: 1,
      stt: 1,
      store: "S1",
      fullName: "Nguyen Tran Khanh Hoa",
      cmnd: "123456789101",
      phone: "0909100443",
      address: "Số 10 nguyên du,BTT quận 2, TP Thủ Đưc",
      dateCreate: "23/12/2022",
      hangId: 0,
    },
    {
      id: 2,
      stt: 2,
      store: "S1",
      fullName: "Nguyen Tran Khanh Hoa",
      cmnd: "123456789101",
      phone: "0909100443",
      address: "Số 10 nguyên du,BTT quận 2, TP Thủ Đưc",
      dateCreate: "23/12/2022",
      hangId: 1,
    },
    {
      id: 3,
      stt: 3,
      store: "S1",
      fullName: "Nguyen Tran Khanh Hoa",
      cmnd: "123456789101",
      phone: "0909100443",
      address: "Số 10 nguyên du,BTT quận 2, TP Thủ Đưc",
      dateCreate: "23/12/2022",
      hangId: 2,
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

export default ListCustomer;
