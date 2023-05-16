import React, { useEffect, useState } from 'react';
import './popup.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import moment from 'moment';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import callAPI from '../../../API';
import BtnSave from '../../ButtonUI/BtnSave/BtnSave';
import BtnCloseAnimation from '../../ButtonUI/BtnCloseAnimation/BtnCloseAnimation';
import { Button } from '@mui/material';
import { formatDate } from '../../../helpers/dateTimeUtils';

const Liquidation = ({ showliquidation, setShowliquidation }) => {
    var now = new Date().getTime();
    const [contractDetail, setContractDetail] = useState([]);
    useEffect(() => {
        callAPI({
            method: 'get',
            url: `/contract/getContractInfoByContractId/` + localStorage.getItem('PawnDetailID'),
        }).then((res) => {
            setContractDetail(res.data);
            console.log(res.data);
        });
    }, []);

    const formatMoney = (value) => {
        return value.toLocaleString('vi-VN') + ' VNĐ';
    };

    return (
        <div className="add-contract" onClick={() => setShowliquidation(false)}>
            <div className="content-contract" onClick={(e) => e.stopPropagation()}>
                {/* Tiêu đề */}
                <div className="heading-contract">
                    <h1>Thanh lý đồ</h1>
                </div>
                <div className="contents">
                    <div className="box__liquidation">
                        <div className="full_detailContract">
                            <table className="table__detailContract">
                                <tr>
                                    <th colSpan="2">Khách hàng</th>
                                    <th colSpan="2" style={{ textAlign: 'right' }}>
                                        <span className="start-red">{contractDetail.customerName} </span>
                                        <span> - </span>
                                        <span>
                                            <span>
                                                <LocalPhoneIcon
                                                    fontSize="small"
                                                    className="detailContract_icon-phone"
                                                />
                                            </span>{' '}
                                            {contractDetail.phone}
                                        </span>
                                        {/* <span> - </span>
                    <span style={{ fontSize: "14px" }}>
                      <span ><HomeIcon fontSize="small" className="detailContract_icon-phone" />
                      </span> {detailPawn.branchId}</span> */}
                                    </th>
                                </tr>
                                <tr>
                                    <th colSpan="2">Tiền cầm</th>
                                    <th colSpan="2" className="start-red" style={{ textAlign: 'right' }}>
                                        {contractDetail.loan ? formatMoney(contractDetail.loan) : '0 VNĐ'}
                                    </th>
                                </tr>
                                <tr>
                                    <th colSpan="2">Ngày bắt đầu</th>
                                    <th colSpan="1" style={{ textAlign: 'right' }}>
                                        {moment(contractDetail.contractStartDate).format('DD/MM/YYYY')}
                                    </th>
                                </tr>
                                <tr>
                                <th colSpan="2">Ngày kết thúc</th>
                                    <th colSpan="1" style={{ textAlign: 'right' }}>
                                        {moment(contractDetail.contractEndDate).format('DD/MM/YYYY')}
                                    </th>
                                </tr>
                            </table>
                            <table className="table__detailContract">
                                <tr>
                                    <th>Lãi suất</th>
                                    <th style={{ textAlign: 'right' }}>
                                        <span>{contractDetail.packageInterest}%</span>
                                    </th>
                                </tr>
                                <tr>
                                    <th>Tiền lãi đã đóng</th>
                                    <th className="start-red" style={{ textAlign: 'right' }}>
                                        {contractDetail.interestPaid
                                            ? formatMoney(contractDetail.interestPaid)
                                            : '0 VNĐ'}
                                    </th>
                                </tr>
                                <tr>
                                    <th>Nợ lãi cũ:</th>
                                    <th style={{ textAlign: 'right' }}>
                                        <span className="start-red">
                                            {contractDetail.interestDebt
                                                ? formatMoney(contractDetail.interestDebt)
                                                : '0 VNĐ'}
                                        </span>
                                    </th>
                                </tr>
                                <tr>
                                    <th>Trạng thái:</th>
                                    {contractDetail.status === 1 ? (
                                        <th style={{ textAlign: 'right' }}>
                                            <span className="detailContract_status" style={{ color: 'rgb(0, 166, 0)' }}>
                                                Đang Cầm
                                            </span>
                                        </th>
                                    ) : contractDetail.status === 2 ? (
                                        <th style={{ textAlign: 'right' }}>
                                            <span
                                                className="detailContract_status"
                                                style={{ color: 'rgb(83, 83, 255)' }}
                                            >
                                                Trễ Hẹn
                                            </span>
                                        </th>
                                    ) : contractDetail.status === 3 ? (
                                        <th style={{ textAlign: 'right' }}>
                                            <span
                                                className="detailContract_status"
                                                style={{ color: 'rgb(255, 255, 106)' }}
                                            >
                                                Thanh Lý
                                            </span>
                                        </th>
                                    ) : contractDetail.status === 4 ? (
                                        <th style={{ textAlign: 'right' }}>
                                            <span className="detailContract_status" style={{ color: 'red' }}>
                                                Đã Đóng
                                            </span>
                                        </th>
                                    ) : (
                                        ''
                                    )}
                                </tr>
                            </table>
                        </div>
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
                                    Tên tài sản :
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
                            <p>{contractDetail.typeOfProduct}</p>
                            <p>{contractDetail.assetName}</p>
                            <div className="box__input">
                                <input type="number" placeholder="0" />
                                <span>VNĐ</span>
                            </div>

                            <p className="line__height">{formatDate(now)}</p>
                        </div>
                    </div>
                </div>
                <div className="btn__group btn__group-liquidation">
                    <Button>
                        <BtnSave />
                    </Button>
                    <BtnCloseAnimation showliquidation={showliquidation} setShowliquidation={setShowliquidation} />
                </div>
            </div>
        </div>
    );
};

export default Liquidation;
