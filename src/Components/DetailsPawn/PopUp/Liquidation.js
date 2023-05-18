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
import { formatDate, formatMoney } from '../../../helpers/dateTimeUtils';
import CustomizeDiaglog, { DIALOG_SIZE } from '../../../helpers/CustomizeDiaglog';
import ButtonCloseAnimation from '../../ButtonUI/BtnCloseAnimation/ButtonCloseAnimation';
import { Save } from '@mui/icons-material';

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

    const renderContent = () => (
        <>
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
                                            <LocalPhoneIcon fontSize="small" className="detailContract_icon-phone" />
                                        </span>{' '}
                                        {contractDetail.phone}
                                    </span>
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
                                    {contractDetail.interestPaid ? formatMoney(contractDetail.interestPaid) : '0 VNĐ'}
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
                                        <span className="detailContract_status" style={{ color: 'rgb(83, 83, 255)' }}>
                                            Trễ Hẹn
                                        </span>
                                    </th>
                                ) : contractDetail.status === 3 ? (
                                    <th style={{ textAlign: 'right' }}>
                                        <span className="detailContract_status" style={{ color: 'rgb(255, 255, 106)' }}>
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
                            <b>Tên tài sản :</b>
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
        </>
    );

    const handleCloseDialog = () => {
        setShowliquidation(false);
    };
    return (
        <>
            <CustomizeDiaglog
                open={showliquidation}
                onClose={handleCloseDialog}
                title="Thanh lý đồ"
                content={renderContent()}
                action={
                    <div className="btn__group">
                        <ButtonCloseAnimation onConfirm={handleCloseDialog} />
                        <Button
                            // onClick={(e) => saveContract(e)}
                            variant="contained"
                            color="success"
                            sx={{
                                fontSize: '16px',
                                padding: '15px 30px',
                            }}
                            startIcon={<Save />}
                        >
                            Lưu Lại
                        </Button>
                    </div>
                }
                maxWidth={DIALOG_SIZE.xl}
            />
        </>
    );
};

export default Liquidation;
