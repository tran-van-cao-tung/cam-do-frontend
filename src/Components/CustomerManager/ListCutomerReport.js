import React, { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

import funcEdit from "../../asset/img/function.png";
import axios from "axios";

const ListCustomerReport = () => {
  const handleUpdateInformation = (id) => {
    // setShowUpdateContract(true);
    console.log(id);
  };
  const [list, setList] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url:
        "http://tranvancaotung-001-site1.ftempurl.com/api/v1/customer/activelist/0",
    }).then((response) => {
      setList(response.data);
    });
  }, []);

  const columns = [
    { field: "numerical", headerName: "STT", minWidth: 20, align: "center" },
    {
      field: "nameBranch",
      headerName: "Cửa Hàng",
      minWidth: 100,
      align: "center",
    },
    {
      field: "fullName",
      headerName: "Họ và Tên",
      minWidth: 170,
      align: "center",
    },
    {
      field: "cccd",
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
      field: "point",
      headerName: "Hạng ID",
      valueGetter: (params) =>
        `${
          params.row.point === 0
            ? "A"
            : params.row.point === 1
            ? "B"
            : params.row.point === 2
            ? "C"
            : params.row.point === 3
            ? "F"
            : ""
        }`,
      minWidth: 150,
      align: "center",
    },
    {
      field: "reason",
      headerName: "Lý do",
      minWidth: 200,
      align: "center",
    },
    {
      field: "status",
      headerName: "Chức năng",
      type: "actions",
      getActions: (params, index) => [
        <Link to="/report-customer/update-report">
          <GridActionsCellItem
            icon={<img src={funcEdit} alt="" />}
            onClick={(e) => handleUpdateInformation(params.id)}
          />
          ,
        </Link>,
      ],

      minWidth: 160,
      align: "center",
    },
  ];

  // const rows = [
  //   {
  //     id: 1,
  //     stt: 1,
  //     store: "S1",
  //     fullName: "Nguyen Tran Khanh Hoa",
  //     cmnd: "123456789101",
  //     phone: "0909100443",
  //     address: "Số 10 nguyên du,BTT quận 2, TP Thủ Đưc",
  //     dateCreate: "23/12/2022",
  //     hangId: 3,
  //   },
  //   {
  //     id: 2,
  //     stt: 2,
  //     store: "S1",
  //     fullName: "Nguyen Tran Khanh Hoa",
  //     cmnd: "123456789101",
  //     phone: "0909100443",
  //     address: "Số 10 nguyên du,BTT quận 2, TP Thủ Đưc",
  //     dateCreate: "23/12/2022",
  //     hangId: 3,
  //   },
  //   {
  //     id: 3,
  //     stt: 3,
  //     store: "S1",
  //     fullName: "Nguyen Tran Khanh Hoa",
  //     cmnd: "123456789101",
  //     phone: "0909100443",
  //     address: "Số 10 nguyên du,BTT quận 2, TP Thủ Đưc",
  //     dateCreate: "23/12/2022",
  //     hangId: 3,
  //   },
  // ];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={list.map((item) => {
          return { id: item.customerId, ...item };
        })}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        style={{ align: "center" }}
      />
    </div>
  );
};

export default ListCustomerReport;
