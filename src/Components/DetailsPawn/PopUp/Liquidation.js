import React from "react";
import "./popup.css";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const Liquidation = ({ setShowliquidation }) => {
  return (
    <div className="add-contract" onClick={() => setShowliquidation(false)}>
      <div className="content-contract" onClick={(e) => e.stopPropagation()}>
        {/* Tiêu đề */}
        <div className="heading-contract">
          <h1>Thanh lý đồ</h1>
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
                        <span className="start-red">Nguyễn Trần Khánh Hoa</span>{" "}
                        - 098989898
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
                      <th>
                        Gốc còn nợ:{" "}
                        <span className="start-red">8,000,000 VNĐ</span>
                      </th>
                      <th>
                        Nợ lãi cũ: <span className="start-red">0 VNĐ</span>
                      </th>
                    </tr>
                    <tr>
                      <th>Trạng thái</th>
                      <th>Đang cầm</th>
                    </tr>
                  </table>
                </Grid>
              </Grid>
            </Box>
          </div>
        </div>
        <div className="info__asset">
          <div className="asset">
            <div className="w30 text__right">
              <p>
                <b>Loại tài sản:</b>
              </p>
              <p>
                <b>
                  Tên tài sản <span className="start-red">*</span>:
                </b>
              </p>

              <p>
                <b>
                  Số tiền thanh lý<span className="start-red">*</span>:
                </b>
              </p>

              <b>Ngày thanh lý:</b>
            </div>
            <div className="w30">
              <p>Xe máy</p>
              <p>Xe AB</p>
              <div className="box__input">
                <input type="number" placeholder="0" />
                <span>VNĐ</span>
              </div>

              <p className="line__height">01/01/2022</p>
            </div>
          </div>
        </div>
        <div className="btn__group btn__group-liquidation">
          <button className="btn btn__save">Thanh lý</button>
          <button className="btn btn__close">Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default Liquidation;
