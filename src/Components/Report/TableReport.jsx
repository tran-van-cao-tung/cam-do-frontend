import React, { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import axios from "axios";

// import { Link } from "react-router-dom";

const TableReport = ({ setShowUpdateContract }) => {
  const [list, setList] = useState([]);

  //Axios
  useEffect(() => {
    axios({
      method: "GET",
      url:
        "http://tranvancaotung-001-site1.ftempurl.com/api/v1/report/getAll/transaction/0",
    }).then((response) => {
      setList(response.data);
      console.log(response.data);
    });
  }, []);

  const handleShow = (id) => {
    setShowUpdateContract(true);
    console.log(id);
  };

  const columns = [
    { field: "stt", headerName: "#", minWidth: 10, align: "center" },

    {
      field: "contractCode",
      headerName: "Mã HĐ",
      minWidth: 100,
      align: "center",
    },
    {
      field: "detailContrac",
      headerName: "Xem HĐ",
      type: "actions",
      getActions: (params, index) => [
        <GridActionsCellItem
          icon={<span>chi tiết</span>}
          onClick={(e) => handleShow(params.id)}
        />,
      ],
      minWidth: 170,
      align: "center",
    },
    {
      field: "customerName",
      headerName: "Khách Hàng",
      minWidth: 170,
      align: "center",
    },
    {
      field: "assetCode",
      headerName: "Mã TS",
      align: "center",
      minWidth: 170,
    },
    {
      field: "assetName",
      headerName: "Tài Sản",
      align: "center",
      minWidth: 170,
    },
    {
      field: "loan",
      headerName: "Tiền Cầm",
      minWidth: 210,
      align: "center",
    },
    {
      field: "startDate",
      headerName: "Ngày Cầm",
      minWidth: 210,
      align: "center",
    },
    {
      field: "endDate",
      headerName: "Hạn Cuối HĐ",
      minWidth: 210,
      align: "center",
    },
  ];

  // const rows = [
  //   {
  //     id: 1,
  //     stt: 1,
  //     idContract: "CD-0001",
  //     idProperti: "Nguyen Tran Khanh Hoa",
  //     customer: "XM",
  //     properti: "Xe SH Trắng",
  //     pawnMoney: 9400000,
  //     deadlineContract: "25 / 12 / 2022",
  //     pawnDate: "23 / 12 / 2022",
  //   },
  //   {
  //     id: 2,
  //     stt: 2,
  //     idContract: "CD-0001",
  //     idProperti: "Nguyen Tran Khanh Hoa",
  //     customer: "OT",
  //     properti: "Xe SH Trắng",
  //     pawnMoney: 9400000,
  //     deadlineContract: "25 / 12 / 2022",
  //     pawnDate: "23/12/2022",
  //   },
  //   {
  //     id: 3,
  //     stt: 3,
  //     idContract: "CD-0001",
  //     idProperti: "Nguyen Tran Khanh Hoa",
  //     customer: "OT",
  //     properti: "Xe SH Trắng",
  //     pawnMoney: 9400000,
  //     deadlineContract: "25 / 12 / 2022",
  //     pawnDate: "23 / 12 / 2022",
  //   },
  // ];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={list.map((item, index) => {
          return { id: index, stt: index + 1, ...item };
        })}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        style={{ align: "center" }}
      />
    </div>
  );
};

export default TableReport;
