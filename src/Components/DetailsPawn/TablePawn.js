import React, { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import cash from "../../asset/img/cash.png";
import wallet from "../../asset/img/wallet.png";
import thanhly from "../../asset/img/thanhly.png";
import axios from "axios";

var count = 0;
const TablePawn = ({ setShowUpdateContract, setShowliquidation, setshowdetailContract}) => {
  const handleShow = (id) => {
    setShowUpdateContract(true);
    console.log(id);
  };
  const handleShowLiquidation = (id) => {
    setShowliquidation(true);
    console.log(id);
  };
  const handleShowDetailContract = (id) => {
    setshowdetailContract(true);
    console.log(id);
    localStorage.setItem("PawnDetailID", id)
  };
  const columns = [
    { field: "id", headerName: "#", width: 10, textAlign: "center"},
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
    },
    {
      field: "contractEndDate",
      headerName: "Ngày Đến Hạn",
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
              : ""
        }`,
      width: 140,
    },
    {
      field: "ChucNang",
      headerName: "Chức năng",
      type: "actions",
      getActions: (params, index) => [
        <GridActionsCellItem icon={<img src={cash} />} onClick={(e) => handleShowDetailContract(params.id)} />,
        <GridActionsCellItem
          icon={<img src={wallet} />}
          onClick={(e) => handleShow(params.id)}
        />,
        <GridActionsCellItem icon={<img style={{width: '30px'}} src={thanhly} />} onClick={(e) => handleShowLiquidation(params.id)} />,
      ],

      width: 160,
    },
  ];

  const [contractList, setContractList] = useState([]);
  useEffect(() => {
    axios({
        method: 'get',
        url: 'http://tranvancaotung-001-site1.ftempurl.com/api/v1/contracts/0',
    }).then((res) => {
      setContractList(res.data);
        // console.log('aaaaa', res.data);
    });
}, []);
  return (
    <div style={{ height: 400, width: "99%" }}>
      <DataGrid
        // rows={rows}
        rows={contractList.map((item,index)=>{return {id:index+1,...item}})}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        style={{ textAlign: "center" }}
      />
    </div>
  );
};

export default TablePawn;