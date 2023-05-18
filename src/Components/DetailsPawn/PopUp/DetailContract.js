import React, { useEffect, useState } from 'react';

import { formatMoney } from '../../../helpers/dateTimeUtils';
import moment from 'moment';
import BasicTabs from './Tab';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

import callAPI from '../../../API';
import { useCallback } from 'react';
import CustomizeDiaglog, { DIALOG_SIZE } from '../../../helpers/CustomizeDiaglog';

const DetailContract = ({ setshowdetailContract, showContractId, showdetailContract }) => {
    const [detailPawn, setDetailPawn] = useState([]);

    useEffect(() => {
        const id = localStorage.getItem('PawnDetailID');
        if (id) {
            callAPI({
                method: 'get',
                url: `contract/getContractDetail/${id}`,
            }).then((res) => {
                setDetailPawn(res.data);
            });
        }
    }, []);

    const refreshDetail = useCallback(() => {
        const id = localStorage.getItem('PawnDetailID');
        if (id) {
            callAPI({
                method: 'get',
                url: `contract/getContractDetail/${id}`,
            }).then((res) => {
                setDetailPawn(res.data);
            });
        }
    }, []);

    useEffect(() => {
        console.log('call back detail');
        refreshDetail();
    }, [refreshDetail, showContractId]);

    const renderContent = () => (
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
                                        <LocalPhoneIcon fontSize="small" className="detailContract_icon-phone" />
                                    </span>{' '}
                                    {detailPawn.phone}
                                </span>
                            </th>
                        </tr>
                        <tr>
                            <th colSpan="2">Tiền cầm</th>
                            <th colSpan="2" className="start-red" style={{ textAlign: 'right' }}>
                                {detailPawn.loan ? formatMoney(detailPawn.loan) : '0 VNĐ'}
                            </th>
                        </tr>
                        <tr>
                            <th colSpan="2">Ngày bắt đầu</th>
                            <th colSpan="1" style={{ textAlign: 'right' }}>
                                {moment(detailPawn.contractStartDate).format('DD/MM/YYYY')}
                            </th>
                        </tr>
                        <tr>
                            <th colSpan="2">Ngày kết thúc</th>
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
                                    {detailPawn.interestDebt ? formatMoney(detailPawn.interestDebt) : '0 VNĐ'}
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
                                    <span className="detailContract_status" style={{ color: 'rgb(83, 83, 255)' }}>
                                        Trễ Hẹn
                                    </span>
                                </th>
                            ) : detailPawn.status === 3 ? (
                                <th style={{ textAlign: 'right' }}>
                                    <span className="detailContract_status" style={{ color: 'rgb(255, 255, 106)' }}>
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
                        refreshDetail={refreshDetail}
                    />
                </div>
            </div>
        </div>
    );
    const handleCloseDialog = () => {
        setshowdetailContract(false);
    };

    return (
        <>
            <CustomizeDiaglog
                open={showdetailContract}
                onClose={handleCloseDialog}
                title="Bảng chi tiết hợp đồng cầm đồ"
                content={renderContent()}
                maxWidth={DIALOG_SIZE.xl}
            />
        </>
    );
};

export default DetailContract;
