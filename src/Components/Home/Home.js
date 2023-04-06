import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./home.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import moment from "moment";
import callAPI from "../../API";
const Home = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: "22px 0 22px 27px",
    borderRadius: "10px",
    color: theme.palette.text.secondary,
  }));


  const [logContract, setLogContract] = useState([])
  useEffect(() => {
    callAPI({
      method: 'get',
      url: `logContract/all/0`,
    }).then((res) => {
      setLogContract(res.data);
    });
  }, [])

  console.log(logContract)

  //Lấy username của loginUser dựa vào localStorage
  const [userName, setUserName] = useState('')
  useEffect(() => {
    callAPI({
      method: 'get',
      url: `user/getAll/0`,
    }).then((res) => {
      if (localStorage.getItem('userName') != "Admin") {
        setUserName(res.data.filter(log => {
          return log.userName === localStorage.getItem('userName');
        })[0].userName)
      }
    });
  }, [])

  //Ép kiểu dữ liệu date
  const formatDate = (value) => {
    return moment(value).format('DD/MM/YYYY');
  }

  const formatTime = (value) => {
    return moment(value).format('HH:mm');
  }

  return (
    <div className="conten">
      <h1 className="heading">Trang chủ</h1>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Item>
              <p className="title">Tổng số vốn</p>
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
                {
                  localStorage.getItem('userName') === "Admin" ?
                    logContract.map((item, index) => {
                      return (<div key={index} className="detai-content">
                        <div className="timme">
                          <p>{formatDate(item.logTime)}</p>
                          <span>{formatTime(item.logTime)}</span>
                        </div>
                        <div>
                          <span className="colum-blue"></span>
                        </div>
                        <div className="create-new">
                          <p>
                            <b>{item.eventType === 1
                              ? "Tạo hợp đồng"
                              : item.eventType === 2
                                ? "Chưa đóng lãi"
                                : item.eventType === 3
                                  ? "Đã đóng lãi"
                                  : item.eventType === 4
                                    ? "Đóng hợp đồng" : ""
                            }: </b>{item.customerName}{" "}
                            <span>{(item.debt).toLocaleString('vi-VN') + ' VNĐ'}
                            </span>
                          </p>
                          <span>Tạo bởi: {item.userName}</span>
                        </div>
                      </div>)
                    })
                    :
                    logContract.map((item, index) => {
                      return localStorage.getItem('userName') === item.userName ? (<div key={index} className="detai-content">
                        <div className="timme">
                          <p>{formatDate(item.logTime)}</p>
                          <span>{formatTime(item.logTime)}</span>
                        </div>
                        <div>
                          <span className="colum-blue"></span>
                        </div>
                        <div className="create-new">
                          <p>
                            <b>{item.eventType === 1
                              ? "Tạo hợp đồng"
                              : item.eventType === 2
                                ? "Chưa đóng lãi"
                                : item.eventType === 3
                                  ? "Đã đóng lãi"
                                  : item.eventType === 4
                                    ? "Đóng hợp đồng" : ""
                            }: </b>{item.customerName}{" "}
                            <span>{(item.debt).toLocaleString('vi-VN') + ' VNĐ'}
                            </span>
                          </p>
                          <span>Tạo bởi: {item.userName}</span>
                        </div>
                      </div>) : ""
                    })
                }
              </div>
            </Item>
          </Grid>

        </Grid>
      </div>
    </div>
  );
};

export default Home;
