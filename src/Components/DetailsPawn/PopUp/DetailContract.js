
import React, { useEffect, useState } from "react";
import "./popup.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import moment from "moment";
import BasicTabs from "./Tab";

const DetailContract = ({ setshowdetailContract, showContractId }) => {
  // Function active button (Button Deatail Contract)

  console.log(showContractId)
  const [contractDetail, setContractDetail] = useState([]);
  useEffect(() => {
    axios.get(`http://tranvancaotung-001-site1.ftempurl.com/api/v1/contract/getAll/0`, { headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} }).then(res => {

      setContractDetail(res.data.filter((item, index) => {
        return item.contractId == showContractId;
      })[0])
    })
  }, [showContractId])

  console.log(contractDetail)
  const [detailPawn, setDetailPawn] = useState([]);
  useEffect(() => {
    const id = contractDetail.contractId;
    axios.get(`http://tranvancaotung-001-site1.ftempurl.com/api/v1/contract/getContractDetail/${id}`, { headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} }).then(res => {
      setDetailPawn(res.data)
    })
  }, [contractDetail.contractId])


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
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <table className="table__liquidation">
                    <tr>
                      <th>Khách hàng</th>
                      <th colSpan="2">
                        <span className="start-red">{detailPawn.customerName}</span>
                        - {detailPawn.phone}
                      </th>
                    </tr>
                    <tr>
                      <th>Tiền cầm</th>
                      <th colSpan="2">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(detailPawn.loan)}</th>
                    </tr>
                    <tr>
                      <th>Vay từ ngày</th>
                      <th>{moment(detailPawn.contractStartDate).format('MM/DD/YYYY')}</th>
                      <th>{moment(detailPawn.contractEndDate).format('MM/DD/YYYY')}</th>
                    </tr>

                  </table>
                </Grid>
                <Grid item xs={12} md={6}>
                  <table className="table__liquidation">
                    <tr>
                      <th>Lãi suất</th>
                      <th colSpan="2">
                        <span className="start-red">{detailPawn.packageInterest}%</span>
                      </th>
                    </tr>
                    <tr>
                      <th>Tiền lãi đã đóng</th>
                      <th className="start-red">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(detailPawn.interestPaid)}</th>
                    </tr>
                    <tr>
                      <th>Nợ lãi cũ: <span className="start-red">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(detailPawn.interestDebt)}</span></th>
                      <th>Trạng thái: <span className="start-red">{detailPawn.status === 1
                        ? "Đang Cầm"
                        : detailPawn.status === 2
                          ? "Trễ hẹn"
                          : detailPawn.status === 3
                            ? "Thanh lý"
                            : ""}</span></th>
                    </tr>
                  </table>
                </Grid>
              </Grid>
            </Box>
            {/* Button Deatail Contract */}
            <div sx={{ alignItems: 'center', alignContent: 'center' }}>
              <BasicTabs showContractId={showContractId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailContract;