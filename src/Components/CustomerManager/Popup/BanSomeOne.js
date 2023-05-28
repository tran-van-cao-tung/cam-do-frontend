import React, { useState, useEffect } from 'react';
import API from '../../../API';
import { useNavigate } from 'react-router-dom';
import BtnCloseAnimation from '../../ButtonUI/BtnCloseAnimation/BtnCloseAnimation';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
const BanSomeOne = ({ showBanReason, setShowBanReason, cccd }) => {
    const history = useNavigate();
    const [customerInfo, setCustomerInfo] = useState([]);

    useEffect(() => {
        API({
            method: 'GET',
            url: '/customer/getByCCCD/' + cccd,
        }).then((response) => {
            setCustomerInfo(response.data);
        });
    }, []);

    const handleShowBan = () => {
        console.log(cccd);
        console.log(reason);
        API({
            method: 'put',
            url: '/customer/updateCustomer',
            data: {
                customerId: customerInfo.customerId,
                cccd: cccd,
                fullName: customerInfo.fullName,
                phone: customerInfo.phone,
                address: customerInfo.address,
                status: 2,
                reason: reason,
            },
        })
            .then((res) => {
                toast.success('Blacklist thành công');
                history('/customer-manager');
            })
            .catch((err) => {
                console.log(err);
                toast.error('Blacklist fail');
            });
    };
    const [reason, setReason] = useState();
    const handleReason = (e) => {
        setReason(e.target.value);
    };
    return (
        <div className="reasonContainer" onClick={() => setShowBanReason(false)}>
            <div className="reasonContent" onClick={(e) => e.stopPropagation()}>
                <h1>
                    Chuyển Khách Hàng Vào Danh Sách <span className="starRed">CẤM</span>
                </h1>
                <div className="reasonChange">
                    <label>
                        Lý do<span className="starRed">*</span>:
                    </label>
                    <input className="inputReason" value={reason} onChange={handleReason} />
                </div>
                <div className="btnReason">
                    <Button onClick={() => handleShowBan()}>Cấm</Button>

                    <BtnCloseAnimation showBanReason={showBanReason} setShowBanReason={setShowBanReason} />
                </div>
            </div>
        </div>
    );
};

export default BanSomeOne;
