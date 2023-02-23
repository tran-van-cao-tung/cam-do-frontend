import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./home.css";
import TablePawn from './../DetailsPawn/TablePawn';
const Home = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: "22px 0 22px 27px",
    borderRadius: "10px",
    color: theme.palette.text.secondary,
  }));
  return (
    <div className="conten">
      <h1 className="heading">Trang chủ</h1>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Item>
              <p className="title">Tổng quỹ tiền mặt</p>
              <span className="title">1.000.000.000</span>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <p className="title">Số hợp đồng đang vay</p>
              <span className="title">2</span>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <p className="title">Tiền đang cho vay</p>
              <span className="title">110.000.000</span>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <p className="title">Lãi đã thu trong tháng</p>
              <span className="title">385.000</span>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <div className="transaction">
                <h1>Giao dịch trong tháng</h1>
              </div>
              <div className="content">
                <div className="detai-content">
                  <div className="timme">
                    <p>24/12/2022</p>
                    <span>12:10</span>
                  </div>
                  <div>
                    <span className="colum-blue"></span>
                  </div>
                  <div className="create-new">
                    <p>
                      <b>Tạo mới hợp đồng: </b>Nguyen Van A{" "}
                      <span>100.000.000 VNĐ</span>
                    </p>
                    <span>Tạo bởi: User1</span>
                  </div>
                </div>
                <div className="detai-content">
                  <div className="timme">
                    <p>24/12/2022</p>
                    <span>12:10</span>
                  </div>
                  <div>
                    <span className="colum-yellow"></span>
                  </div>
                  <div className="create-new">
                    <p>
                      <b>Tạo mới hợp đồng: </b>Nguyen Van A{" "}
                      <span>100.000.000 VNĐ</span>
                    </p>
                    <span>Tạo bởi: User1</span>
                  </div>
                </div>
                <div className="detai-content">
                  <div className="timme">
                    <p>24/12/2022</p>
                    <span>12:10</span>
                  </div>
                  <div>
                    <span className="colum-red"></span>
                  </div>
                  <div className="create-new">
                    <p>
                      <b>Tạo mới hợp đồng: </b>Nguyen Van A{" "}
                      <span>100.000.000 VNĐ</span>
                    </p>
                    <span>Tạo bởi: User1</span>
                  </div>
                </div>
              </div>
            </Item>
          </Grid>
          
        </Grid>
      </div>
    </div>
  );
};

export default Home;
