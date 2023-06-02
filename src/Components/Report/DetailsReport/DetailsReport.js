import React, { useState, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './details.css';
import API from '../../../API';

import { AuthContext } from '../../../helpers/AuthContext';
import { formatMoney } from '../../../helpers/dateTimeUtils';

function DetailsReport({ value, setYear }) {
    const currentYear = new Date().getFullYear();
    const { currentBranchId } = useContext(AuthContext);
    const [detail, setDetail] = useState([]);
    const [yearDetail, setYearDetail] = useState([]);
    // setValue(currentYear);

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

    useEffect(() => {
        if (currentBranchId) {
            API({
                method: 'get',
                url: `/branch/getDetailYearById/${currentBranchId}/${value == undefined ? currentYear : value}`,
            }).then((res) => {
                setYearDetail(res.data);
            });
        }
    }, [currentBranchId, value]);

    useEffect(() => {
        if (currentBranchId) {
            API({
                method: 'get',
                url: `/branch/getDetailById/${currentBranchId}`,
            }).then((res) => {
                setDetail(res.data);
            });
        }
    }, [currentBranchId]);

    return (
        <div className="conten">
            <div>
                <Grid container spacing={8}>
                    {/* Thông tin chi tiết cầm đồ */}
                    <Grid item xs={6}>
                        <Item className="item-detail">
                            <div className="information chill-1">
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
                                <p>{yearDetail.profit ? formatMoney(yearDetail.profit) : '0 VNĐ'}</p>
                                <p>{yearDetail.loan ? formatMoney(yearDetail.loan) : '0 VNĐ'}</p>
                                <p>{yearDetail.currentFund ? formatMoney(detail.currentFund) : '0 VNĐ'}</p>
                                <p>{yearDetail ? yearDetail.totalContracts : '0'}</p>
                                <p>{yearDetail ? yearDetail.openContract : '0'}</p>
                                <p>{yearDetail ? yearDetail.closeContract : '0'}</p>
                            </div>
                        </Item>
                    </Grid>
                    {/* Thông tin hợp đồng cầm đồ */}
                    <Grid item xs={6}>
                        <Item className="item-detail">
                            <div className="information chill-2">Tổng hợp thông tin cầm đồ</div>
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
