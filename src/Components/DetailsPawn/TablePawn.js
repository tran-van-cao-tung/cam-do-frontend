import React, { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import cash from "../../asset/img/cash.png";
import wallet from "../../asset/img/wallet.png";
import subwallet from "../../asset/img/subwallet.png";
import deletes from "../../asset/img/delete.png";
import axios from "axios";
import moment from "moment";

/* function BirthdayColumn({ field, value }) {
  const formattedValue =moment(value).format('MM/DD/YYYY');;

  return <div>{formattedValue}</div>;
} */

const TablePawn = ({ setShowUpdateContract, setShowliquidation, setshowdetailContract, setShowContractId }) => {
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
    setShowContractId(id);
  };

  const [rows, setContract] = useState([]);
  useEffect(() => {
    axios.get(`http://tranvancaotung-001-site1.ftempurl.com/api/v1/contract/getAll/0`).then((res) => {
      setContract(res.data);
      console.log(res.data)
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
      field: "contractEndDate",
      headerName: "Ngày Cầm",
      width: 150,
      valueFormatter: (params) => formatDate(params.value)
    },
    {
      field: "contractStartDate",
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
        `${params.row.status === 0
          ? "Đang Cầm"
          : params.row.status === 1
            ? "Trễ hẹn"
            : params.row.status === 2
              ? "Thanh lý"
              : ""
        }`,
      width: 140,
    },
    {
      field: "ChucNangw",
      headerName: "Chức năng",
      type: "actions",
      getActions: (params, index) => [
        <GridActionsCellItem icon={<img src={cash} />} onClick={(e) => handleShowDetailContract(params.id)} />,
        // <Link to={`/updateContract/${params.id}`} ><GridActionsCellItem icon={<img src={wallet} />} onClick={(params)=>handleShow(params)} /></Link>,
        <GridActionsCellItem
          icon={<img src={wallet} />}
          onClick={(e) => handleShow(params.id)}
        />,
        <GridActionsCellItem icon={<img src={subwallet} />} onClick={(e) => handleShowLiquidation(params.id)} />,
        // <GridActionsCellItem icon={<img src={deletes} />} />,
      ],

      width: 160,
    },
  ];


  /* const rows = [
    {
      id: 1,
      maHD: "CĐ-0001",
      khachHang: "Nguyen Tran Khanh Hoa",
      maTS: "XM",
      taiSan: "Xe SH Trắng",
      tienCam: "10000000",
      ngayCam: "23/12/2022",
      lai: "35000",
      tienNo: "0",
      laiDenNay: "23/12/2022",
      ngayDongLai: "29/12/2022",
      tinhTrang: 0,
      firstName: "Jon",
      age: 35,
    },
    {
      id: 2,
      maHD: "CĐ-0002",
      khachHang: "Nguyen Tran Khanh Hoa",
      maTS: "XM",
      taiSan: "Xe SH Trắng",
      tienCam: "10000000",
      ngayCam: "23/12/2022",
      lai: "35000",
      tienNo: "0",
      laiDenNay: "23/12/2022",
      ngayDongLai: "29/12/2022",
      tinhTrang: 1,
      firstName: "Jon",
      age: 35,
    },
    {
      id: 3,
      maHD: "CĐ-0003",
      khachHang: "Nguyen Tran Khanh Hoa",
      maTS: "XM",
      taiSan: "Xe SH Trắng",
      tienCam: "10000000",
      ngayCam: "23/12/2022",
      lai: "35000",
      tienNo: "0",
      laiDenNay: "23/12/2022",
      ngayDongLai: "29/12/2022",
      tinhTrang: 2,
      firstName: "Jon",
      age: 35,
    },
  ]; */


  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        getRowId={(row) => row.contractCode}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        style={{ textAlign: "center" }}
      />
    </div>
  );
};

export default TablePawn;
