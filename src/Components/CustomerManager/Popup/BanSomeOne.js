import React, { useState } from 'react';
import API from '../../../API';
import { useNavigate } from 'react-router-dom';

const BanSomeOne = ({ setShowBanReason, cccd }) => {
    const navigate = useNavigate();
    // const handleClose = () => {
    //     setShowBanReason(false);
    // };
    const handleShowBan = () => {
        setShowBanReason(false);
        //   API({
        //     method: 'put',
        //     url: '/customer/updateCustomer',
        //     data: {
        //       customerId: "",
        //         cccd: "cccd",
        //         fullName: "",
        //         phone: "",
        //         address: "",
        //         status: 2,
        //         reason: reason,
        //     },
        // })
        //     .then((res) => {
        //         alert('Blacklist thành công');
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         alert('Blacklist fail');
        //     });
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
                    <button className="banBtn" onClick={() => handleShowBan()}>
                        Cấm
                    </button>
                    <button className="closeBtn" onClick={() => setShowBanReason(false)}>
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BanSomeOne;
