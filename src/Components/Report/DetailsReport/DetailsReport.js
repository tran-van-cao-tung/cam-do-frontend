import React, { useState, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './details.css';
import API from '../../../API';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../helpers/AuthContext';

function DetailsReport({ value }) {
    const { authState } = useContext(AuthContext);
    const currentYear = new Date().getFullYear();
    // setValue(currentYear);
    const param = useParams();
    // Them dark mod
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: '22px 0 22px 27px',
        borderRadius: '10px',
        color: theme.palette.text.secondary,
    }));
    console.log('value in report', value);
    // Axios
    const [detail, setDetail] = useState([]);
    // Axios
    useEffect(() => {
        const branchId = authState.branchId;
        API({
            method: 'get',
            url: `/branch/getDetailById/${branchId}`,
        }).then((res) => {
            setDetail(res.data);
        });
    }, [authState.branchId]);

    const formatMoney = (value) => {
        return value.toLocaleString('vi-VN') + ' VNĐ';
    };

    return (
        <div className="conten">
            <div>
                <Grid container spacing={8}>
                    {/* Thông tin chi tiết cầm đồ */}
                    <Grid item xs={6}>
                        <Item className="item-detail">
                            <div className="information chill-4">
                                Thông tin hợp đồng cầm đồ năm {value == null ? currentYear : value}
                            </div>
                            <div className="text">
                                <p>Lợi nhuận</p>
                                <p>Tiền cho vay</p>
                                <p>Số tiền hiện có</p>
                                <p>Tổng số hợp đồng</p>
                                <p>Hợp đồng mở</p>
                                <p>Hợp đồng đóng</p>
                            </div>
                            <div className="number">
                                <p>{detail.profit ? formatMoney(detail.profit) : '0 VNĐ'}</p>
                                <p>{detail.loan ? formatMoney(detail.loan) : '0 VNĐ'}</p>
                                <p>{detail.currentFund ? formatMoney(detail.currentFund) : '0 VNĐ'}</p>
                                <p>{detail ? detail.totalContracts : '0'}</p>
                                <p>{detail ? detail.openContract : '0'}</p>
                                <p>{detail ? detail.closeContract : '0'}</p>
                            </div>
                        </Item>
                    </Grid>
                    {/* Thông tin hợp đồng cầm đồ */}
                    <Grid item xs={6}>
                        <Item className="item-detail">
                            <div className="information chill-4">Tổng hợp thông tin cầm đồ</div>
                            <div className="text">
                                <p>Lợi nhuận</p>
                                <p>Tiền cho vay</p>
                                <p>Số tiền hiện có</p>
                                <p>Tổng số hợp đồng</p>
                                <p>Hợp đồng mở</p>
                                <p>Hợp đồng đóng</p>
                            </div>
                            <div className="number">
                                <p>{detail.profit ? formatMoney(detail.profit) : '0 VNĐ'}</p>
                                <p>{detail.loan ? formatMoney(detail.loan) : '0 VNĐ'}</p>
                                <p>{detail.currentFund ? formatMoney(detail.currentFund) : '0 VNĐ'}</p>
                                <p>{detail ? detail.totalContracts : '0'}</p>
                                <p>{detail ? detail.openContract : '0'}</p>
                                <p>{detail ? detail.closeContract : '0'}</p>
                            </div>
                        </Item>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default DetailsReport;
