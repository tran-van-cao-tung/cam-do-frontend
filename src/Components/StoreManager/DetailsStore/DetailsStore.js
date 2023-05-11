import React, { useState, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './details.css';
import API from '../../../API';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../helpers/AuthContext';
import { formatMoney } from '../../../helpers/dateTimeUtils';
function Commodity() {
    const param = useParams();
    const {authState, currentBranchId} = useContext(AuthContext);

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
        if(currentBranchId){
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
            <h1 className="heading">{detail.branchName}</h1>
            <div>
                <Grid container spacing={8}>
                    {/* Thông tin chi tiết cầm đồ */}
                    <Grid item xs={6}>
                        <Item className="item-detail">
                            <div className="information chill-3">Thông tin chi tiết cầm đồ</div>
                            <div className="text">
                                <p>Tiền cho vay</p>
                                <p>Số tiền hiện có</p>
                                <p>Tiền khách nợ</p>
                            </div>
                            <div className="number">
                                <p>
                                    {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                        detail.loan,
                                    )}
                                </p>
                                <p>
                                    {' '}
                                    {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                        detail.totalContracts,
                                    )}
                                </p>
                                <p>
                                    {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                        detail.recveivedInterest,
                                    )}
                                </p>
                                <p>
                                    {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                        detail.debtCustomers,
                                    )}
                                </p>
                            </div>
                        </Item>
                    </Grid>
                    {/* Thông tin hợp đồng cầm đồ */}
                    <Grid item xs={6}>
                        <Item className="item-detail">
                            <div className="information chill-4">Thông tin hợp đồng cầm đồ</div>
                            <div className="text">
                                <p>Lợi nhuận</p>
                                <p>Tiền cho vay</p>
                                <p>Số tiền hiện có</p>
                                <p>Tổng số hợp đồng</p>
                                <p>Hợp đồng mở</p>
                                <p>Hợp đồng đóng</p>
                            </div>
                            <div className="number">
                                <p>
                                    {
                                        detail.profit ?
                                            formatMoney(
                                                detail.profit
                                            ) : "0 VNĐ"}
                                </p>
                                <p>
                                    {
                                        detail.loan ?
                                            formatMoney(
                                                detail.loan
                                            ) : "0 VNĐ"}
                                </p>
                                <p>
                                    {
                                        detail.currentFund ?
                                            formatMoney(
                                                detail.currentFund
                                            ) : "0 VNĐ"}
                                </p>
                                <p>
                                    {
                                        detail ? detail.totalContracts : "0"
                                    }
                                </p>
                                <p>
                                    {
                                        detail ? detail.openContract : "0"
                                    }
                                </p>
                                <p>
                                    {
                                        detail ? detail.closeContract : "0"
                                    }
                                </p>
                            </div>
                        </Item>
                    </Grid>
                    {/* Thông tin vốn */}
                    <Grid item xs={6} className="TTV">
                        <Item className="item-detail item-detail__chill1">
                            <div className="information chill-1">Thông tin vốn</div>
                            <div className="text">
                                <p>Vốn đầu tư</p>
                                <p>Quỹ tiền mặt</p>
                                <p>Tiền đang cho vay</p>
                            </div>
                            <div className="number">
                                <p>
                                    {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                        detail.fund,
                                    )}
                                </p>
                                <p>
                                    {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                        detail.balance,
                                    )}
                                </p>
                                <p>
                                    {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                        detail.loanContract,
                                    )}
                                </p>
                            </div>
                        </Item>
                    </Grid>
                    {/* <Grid item xs={6}>
                        <Item className="item-detail">
                            <div className="information chill-2">Thông tin lãi</div>
                            <div className="text">
                                <p>Lãi dự kiến</p>
                                <p>Lãi đã thu</p>
                            </div>
                            <div className="number">
                                <p>0</p>
                                <p>0</p>
                            </div>
                        </Item>
                    </Grid> */}
                </Grid>
            </div>
        </div>
    );
}

export default Commodity;
