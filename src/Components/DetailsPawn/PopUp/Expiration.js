import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Uploader } from 'uploader';
import { UploadDropzone } from 'react-uploader';
import API from '../../../API';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CustomizeDiaglog, { DIALOG_SIZE } from '../../../helpers/CustomizeDiaglog';
import ButtonCloseAnimation from '../../ButtonUI/BtnCloseAnimation/ButtonCloseAnimation';
import { formatMoney } from '../../../helpers/dateTimeUtils';
import { Save } from '@mui/icons-material';
import { AuthContext } from '../../../helpers/AuthContext';
import { toast } from 'react-toastify';

function Expiration({ setShowExpiration, showContractId, showExpiration }) {
    const history = useNavigate();
    const { userInfo } = useContext(AuthContext);
    const uploader = Uploader({ apiKey: 'public_W142hsRDrKu5afNchEBx4f7nFNZx' }); // Your real API key.
    const uploaderOptions = {
        multi: true,

        showFinishButton: true,

        styles: {
            colors: {
                primary: '#377dff',
            },
        },
    };

    const [ransomDetail, setRansom] = useState([]);

    const [linkImg, setLinkImg] = useState();
    const handleImg = (img) => {
        setLinkImg(img);
    };

    const handleSubmit = () => {
        API({
            method: 'post',
            url: `/contract/createContractExpiration/${localStorage.getItem('PawnDetailID')}/${userInfo.userId}/?proofImg=${linkImg}`,
        }).then((res) => {
            toast.success('Đáo hạn thành công!');
            console.log(res.data);
            window.location.reload(false);
        }).catch((err) => toast.error("Đáo hạn không thành công"));;
    };
    const [contractDetail, setContractDetail] = useState([]);
    useEffect(() => {
        API({
            method: 'get',
            url: `/contract/getContractDetail/` + localStorage.getItem('PawnDetailID'),
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
                                <th colSpan="2">Vay từ ngày</th>
                                <th colSpan="1" style={{ textAlign: 'right' }}>
                                    {moment(contractDetail.contractStartDate).format('DD/MM/YYYY')}
                                </th>
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
                                        {contractDetail.interestDebt ? formatMoney(contractDetail.interestDebt) : ''}
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
                    <p>Bạn có chắc chắn muốn đáo hạn hợp đồng cầm đồ này?</p>
                </div>
                <div className="asset">
                    <p>
                        Hình ảnh <span style={{ color: 'red' }}>*</span>:
                    </p>
                    <UploadDropzone
                        uploader={uploader}
                        options={uploaderOptions}
                        onUpdate={(files) => console.log(files.map((x) => x.fileUrl).join('\n'))}
                        onComplete={(files) => {
                            handleImg(files.map((x) => x.fileUrl).join('\n'));
                        }}
                        width="600px"
                        height="375px"
                    />
                    <img src={linkImg} width="600px" height="375px" alt=''/>
                </div>
            </div>
        </>
    );

    const handleCloseDialog = () => {
        setShowExpiration(false);
    };

    return (
        <>
            <CustomizeDiaglog
                open={showExpiration}
                onClose={handleCloseDialog}
                title="Đáo hạn hợp đồng"
                content={renderContent()}
                action={
                    <div className="btn__group">
                        <ButtonCloseAnimation onConfirm={handleCloseDialog} />
                        <Button
                            onClick={(e) => handleSubmit(e)}
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
}

export default Expiration;
