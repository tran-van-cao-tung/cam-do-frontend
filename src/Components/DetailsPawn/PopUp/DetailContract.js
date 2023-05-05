import React, { useEffect, useState } from 'react';
import './popup.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import moment from 'moment';
import BasicTabs from './Tab';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import HomeIcon from '@mui/icons-material/Home';
import callAPI from '../../../API';

const DetailContract = ({ setshowdetailContract, showContractId, showdetailContract }) => {

    const [contractDetail, setContractDetail] = useState([]);

    useEffect(() => {
        if (showContractId) {
            callAPI({
                method: 'get',
                url: `contract/getAll/0/${showContractId}`,
            }).then((res) => {
                console.log("-------------------------------------------");
                console.log(res);
                console.log("-------------------------------------------");
                setContractDetail(
                    res.data.filter((item, index) => {
                        return item.contractId === showContractId;
                    })[0],
                );
            });
        }
    }, [showContractId]);

    const [detailPawn, setDetailPawn] = useState([]);

    useEffect(() => {
        const id = contractDetail.contractId;
        if (id) {
            callAPI({
                method: 'get',
                url: `contract/getContractDetail/${id}`,
            }).then((res) => {
                setDetailPawn(res.data);
            });
        }
    }, [contractDetail?.contractId]);

    const formatMoney = (value) => {
        return value.toLocaleString('vi-VN') + ' VNĐ';
    };

    return (
        <div className="add-contract" onClick={() => setshowdetailContract(false)}>
            <div className="content-contract" onClick={(e) => e.stopPropagation()}>
                {/* Tiêu đề */}
                <div className="heading-contract">
                    <h1>Bảng chi tiết hợp đồng cầm đồ</h1>
                </div>
                <div className="contents">
                    <div className="box__liquidation">
                        <div className="full_detailContract">
                            <table className="table__detailContract">
                                <tr>
                                    <th colSpan="2">Khách hàng</th>
                                    <th colSpan="2" style={{ textAlign: 'right' }}>
                                        <span className="start-red">{detailPawn.customerName} </span>
                                        <span> - </span>
                                        <span>
                                            <span>
                                                <LocalPhoneIcon
                                                    fontSize="small"
                                                    className="detailContract_icon-phone"
                                                />
                                            </span>{' '}
                                            {detailPawn.phone}
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
                                        {detailPawn.loan ? formatMoney(detailPawn.loan) : '0 VNĐ'}
                                    </th>
                                </tr>
                                <tr>
                                    <th colSpan="2">Vay từ ngày</th>
                                    <th colSpan="1" style={{ textAlign: 'right' }}>
                                        {moment(detailPawn.contractStartDate).format('DD/MM/YYYY')}
                                    </th>
                                    <th colSpan="1" style={{ textAlign: 'right' }}>
                                        {moment(detailPawn.contractEndDate).format('DD/MM/YYYY')}
                                    </th>
                                </tr>
                            </table>
                            <table className="table__detailContract">
                                <tr>
                                    <th>Lãi suất</th>
                                    <th style={{ textAlign: 'right' }}>
                                        <span>{detailPawn.packageInterest}%</span>
                                    </th>
                                </tr>
                                <tr>
                                    <th>Tiền lãi đã đóng</th>
                                    <th className="start-red" style={{ textAlign: 'right' }}>
                                        {detailPawn.interestPaid ? formatMoney(detailPawn.interestPaid) : '0 VNĐ'}
                                    </th>
                                </tr>
                                <tr>
                                    <th>Nợ lãi cũ:</th>
                                    <th style={{ textAlign: 'right' }}>
                                        <span className="start-red">
                                            {detailPawn.interestDebt ? formatMoney(detailPawn.interestDebt) : ''}
                                        </span>
                                    </th>
                                </tr>
                                <tr>
                                    <th>Trạng thái:</th>
                                    {detailPawn.status === 1 ? (
                                        <th style={{ textAlign: 'right' }}>
                                            <span className="detailContract_status" style={{ color: 'rgb(0, 166, 0)' }}>
                                                Đang Cầm
                                            </span>
                                        </th>
                                    ) : detailPawn.status === 2 ? (
                                        <th style={{ textAlign: 'right' }}>
                                            <span
                                                className="detailContract_status"
                                                style={{ color: 'rgb(83, 83, 255)' }}
                                            >
                                                Trễ Hẹn
                                            </span>
                                        </th>
                                    ) : detailPawn.status === 3 ? (
                                        <th style={{ textAlign: 'right' }}>
                                            <span
                                                className="detailContract_status"
                                                style={{ color: 'rgb(255, 255, 106)' }}
                                            >
                                                Thanh Lý
                                            </span>
                                        </th>
                                    ) : detailPawn.status === 4 ? (
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
                        {/* Button Deatail Contract */}
                        <div sx={{ alignItems: 'center', alignContent: 'center' }}>
                            <BasicTabs
                                showdetailContract={showdetailContract}
                                setshowdetailContract={setshowdetailContract}
                                contract={detailPawn}
                                showContractId={showContractId}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailContract;
