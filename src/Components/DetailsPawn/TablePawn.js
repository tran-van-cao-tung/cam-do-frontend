import React, { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import cash from "../../asset/img/cash.png";
import wallet from "../../asset/img/wallet.png";
import thanhly from "../../asset/img/thanhly.png";
import API from "../../API.js"
import subwallet from "../../asset/img/subwallet.png";
import deletes from "../../asset/img/delete.png";
import axios from "axios";
import moment from "moment";


const TablePawn = ({ setShowUpdateContract, setShowliquidation, setshowdetailContract, setShowContractId }) => {
  const handleShow = (id) => {
    setShowUpdateContract(true);
    localStorage.setItem("PawnDetailID", id)
    console.log("Update",id);
  };
  const handleShowLiquidation = (id) => {
    setShowliquidation(true);
    console.log(id);
  };

  const handleShowDetailContract = (id) => {
    setshowdetailContract(true);
    setShowContractId(id);
  };

  const [rows, setContract] = useState([]);
  useEffect(() => {
    axios.get(`http://tranvancaotung-001-site1.ftempurl.com/api/v1/contract/getAll/0`).then((res) => {
      setContract(res.data.filter((item, index) => {
        return item.status != 4
      }));
    });
  }, [])

  //Ép kiểu dữ liệu date
  const formatDate = (value) => {
    return moment(value).format('MM/DD/YYYY');
  }

  /* const formattedValue = moment(rows.contractEndDate).format('MM/DD/YYYY'); */

  const columns = [
    {
      field: '#', headerName: "#", width: 10, textAlign: "center", valueGetter: (params) => {
        for (let i = 0; i < rows.length; i++) {
          if (params.row.contractCode === rows[i].contractCode) {
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
      width: 160,
    },
    {
      field: "loan",
      headerName: "Tiền Cầm",
      width: 160,
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
      field: "warehouseName",
      headerName: "Kho",
    },
    {
      field: "status",
      headerName: "Tình Trạng",
      valueGetter: (params) =>
        `${params.row.status === 1
          ? "Đang Cầm"
          : params.row.status === 2
            ? "Trễ hẹn"
            : params.row.status === 3
              ? "Thanh lý"
              : params.row.status === 4
                ? "Đóng hợp đồng" : ""
        }`,
      width: 140,
    },
    {
      field: "ChucNang",
      headerName: "Chức năng",
      type: "actions",
      getActions: (params, index) => [
        <GridActionsCellItem icon={<img src={cash} />} onClick={(e) => handleShowDetailContract(params.row.contractId)} />,
        <GridActionsCellItem
          icon={<img src={wallet} />}
          onClick={(e) => handleShow(params.row.contractId)}
        />,
        <GridActionsCellItem icon={<img src={thanhly}  />} onClick={(e) => handleShowLiquidation(params.row.contractId)} />,
      ],

      width: 160,
    },
  ];

  console.log(rows)


  return (
    <div style={{ height: 510, width: "99%" }}>
      <DataGrid
        rows={rows}
        getRowId={(row) => row.contractCode}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[7]}
        style={{ textAlign: "center" }}
      />
    </div>
  );
};

export default TablePawn;