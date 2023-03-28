import React, { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import cash from "../../asset/img/cash.png";
import wallet from "../../asset/img/wallet.png";
import thanhly from "../../asset/img/thanhly.png";
import API from "../../API.js"
const TablePawn = ({ setShowUpdateContract, setShowliquidation, setshowdetailContract}) => {
  const [contractList, setContractList] = useState([]);
  useEffect(() => {
    API({
        method: 'get',
        url: 'contract/getAll/0',
    }).then((res) => {
      setContractList(res.data);
        console.log('aaaaa', res.data);
    });
}, []);

  const handleShow = (id) => {
    setShowUpdateContract(true);
    localStorage.setItem("PawnDetailID", id)
    console.log(id);
  };
  const handleShowLiquidation = (id) => {
    setShowliquidation(true);
    console.log(id);
  };
  
  const handleShowDetailContract = (contractId) => {
    setshowdetailContract(true);
    console.log(contractId);
    localStorage.setItem("PawnDetailID", contractId);
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
              : params.row.status === 4
              ? "Đóng hợp đồng":""
        }`,
      width: 140,
    },
    {
      field: "ChucNang",
      headerName: "Chức năng",
      type: "actions",
      getActions: (params, index) => [
        <GridActionsCellItem icon={<img src={cash} alt="CA"/>} onClick={(e) => handleShowDetailContract(params.row.contractId)} />,
        <GridActionsCellItem
          icon={<img src={wallet} alt="VI" />}
          onClick={(e) => handleShow(params.row.contractId)}
        />,
        <GridActionsCellItem icon={<img style={{width: '30px'}} src={thanhly} alt="TL"/>} onClick={(e) => handleShowLiquidation(params.row.contractId)} />,
      ],

      width: 160,
    },
  ];


  return (
    <div style={{ height: 510, width: "99%" }}>
      <DataGrid
        // rows={contractList.map((item,index)=>{return {id:index+1,...item}})}
        rows={contractList
          .filter((item) => item.status !== 4)
          .map((item, index) => {
            return { id: index + 1, ...item };
          })}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[7]}
        style={{ textAlign: "center" }}
      />
    </div>
  );
};

export default TablePawn;