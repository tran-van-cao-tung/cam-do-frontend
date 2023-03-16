import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './details.css';
import axios from 'axios';

function Commodity() {
    // Them dark mod
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: '22px 0 22px 27px',
        borderRadius: '10px',
        color: theme.palette.text.secondary,
    }));

    // Axios
    const [detail, setDetail] = useState([]);
    // Axios
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://tranvancaotung-001-site1.ftempurl.com/api/v1/branch/detail/1',
        }).then((res) => {
            setDetail(res.data);
            console.log('aaaaa', res.data);
        });
    }, []);

    return (
        <div className="conten">
            <h1 className="heading">{detail.branchName}</h1>
            <div>
                <Grid container spacing={8}>
                    <Grid item xs={6}>
                        <Item className="item-detail">
                            <div className="information chill-1">Thông tin vốn</div>
                            <div className="text">
                                <p>Vốn đầu tư</p>
                                <p>Quỹ tiền mặt</p>
                                <p>Tiền đang cho vay</p>
                            </div>
                            <div className="number">
                                <p>0</p>
                                <p>{detail.fund}</p>
                                <p>0</p>
                            </div>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item className="item-detail">
                            <div className="information chill-2">Thông tin lãi</div>
                            <div className="text">
                                {/* <p>Lãi dự kiến</p> */}
                                <p>Lãi đã thu</p>
                            </div>
                            <div className="number">
                                {/* <p>0</p> */}
                                <p>0</p>
                            </div>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item className="item-detail">
                            <div className="information chill-3">Thông tin chi tiết cầm đồ</div>
                            <div className="text">
                                <p>Tiền cho vay</p>
                                {/* <p>Lãi dự kiến</p> */}
                                <p>Lãi đã thu</p>
                                <p>Tiền khách nợ</p>
                            </div>
                            <div className="number">
                                <p>{detail.loanContract}</p>
                                {/* <p>1,700,000</p> */}
                                <p>{detail.recveivedInterest}</p>
                                <p>{detail.debtCustomers}</p>
                            </div>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item className="item-detail">
                            <div className="information chill-4">Thông tin hợp đồng cầm đồ</div>
                            <div className="text">
                                <p>Số hợp đồng</p>
                                <p>Hợp đồng mở</p>
                                <p>Hợp đồng đóng</p>
                            </div>
                            <div className="number">
                                <p>{detail.contractCode}</p>
                                <p>0</p>
                                <p>0</p>
                            </div>
                        </Item>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Commodity;
