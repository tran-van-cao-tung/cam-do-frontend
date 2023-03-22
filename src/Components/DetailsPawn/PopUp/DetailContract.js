import React, { useEffect, useState } from "react";
import "./popup.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import axios from "axios";

const DetailContract = ({ setshowdetailContract }) => {
  // Function active button (Button Deatail Contract)

  const [detailPawn, setDetailPawn] = useState([]);
  // Axios
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://tranvancaotung-001-site1.ftempurl.com/api/v1/contract/detail' + localStorage.getItem("PawnDetailID"),
    }).then((res) => {
      setDetailPawn(res.data);
      // console.log('aaaaa', res.data);
    });
  }, []);

  return (
    <div className="add-contract" onClick={() => setshowdetailContract(false)}>
      <div className="content-contract" onClick={(e) => e.stopPropagation()}>
        {/* Tiêu đề */}
        <div className="heading-contract">
          <h1>Bảng chi tiết hợp đồng cầm đồ</h1>
        </div>
        <div className="contents">
          <div className="box__liquidation">
            <Box sx={{ flexGrow: 1 }}>
            {detailPawn.map((i) => (
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <table className="table__liquidation">
                    <tr>
                      <th>Khách hàng</th>
                      <th colSpan="2">
                        <span className="start-red">{i.customerName}</span>
                        - {i.phone}
                      </th>
                    </tr>
                    <tr>
                      <th>Tiền cầm</th>
                      <th colSpan="2">10,000,000 VNĐ</th>
                    </tr>
                    <tr>
                      <th>Vay từ ngày</th>
                      <th>23/12/2022</th>
                      <th>01/01/2022</th>
                    </tr>
                    <tr>
                      <th>Ngày trả lãi gần nhất</th>
                      <th colSpan="2"></th>
                    </tr>
                  </table>
                </Grid>
                <Grid item xs={12} md={6}>
                  <table className="table__liquidation">
                    <tr>
                      <th>Lãi xuất</th>
                      <th colSpan="2">
                        <span className="start-red">5k/ngày</span>
                      </th>
                    </tr>
                    <tr>
                      <th>Tiền lãi đã đóng</th>
                      <th className="start-red">0 VNĐ</th>
                    </tr>
                    <tr>
                      <th>Gốc còn nợ: <span className="start-red">8,000,000 VNĐ</span></th>
                      <th>Nợ lãi cũ: <span className="start-red">0 VNĐ</span></th>

                    </tr>
                    <tr>
                      <th>Trạng thái</th>
                      <th>Đang cầm</th>
                    </tr>
                  </table>
                </Grid>
                </Grid>
                ))}
            </Box>
            {/* Button Deatail Contract */}
            <div className="btn-detailContract" >
              <button>Đóng tiền lãi</button>
              <button>Chứng từ</button>
              <button>Chuộc đồ</button>
              <button>Lịch sử</button>
            </div>
          </div>
        </div>
        {/* Lịch sử đóng tiền lãi */}
        <div className="contents">
          <h2> Lịch sử đóng tiền lãi</h2>
          <Table className="table-detailContract">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Ngày</TableCell>
                <TableCell>Tiền lãi</TableCell>
                <TableCell>Tiền khác</TableCell>
                <TableCell>Tổng tiền</TableCell>
                <TableCell>Tiền khách trả</TableCell>
                <TableCell>...</TableCell>
                <TableCell>Ghi Chú</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell>1</TableCell>
              <TableCell>1/12/2022 - 7/12/2022</TableCell>
              <TableCell>1.000.000</TableCell>
              <TableCell>0</TableCell>
              <TableCell>1.000.000</TableCell>
              <TableCell>1.000.000</TableCell>
              <TableCell>...</TableCell>
              <TableCell>Ghi Chú</TableCell>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DetailContract;