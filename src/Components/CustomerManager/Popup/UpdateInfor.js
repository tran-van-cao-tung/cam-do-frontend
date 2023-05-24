import React, { useEffect, useState } from 'react';
import './UpdateInfor.css';

import { Link, useParams } from 'react-router-dom';
import API from '../../../API';
import BanSomeOne from './BanSomeOne';
import { Button } from '@mui/material';
import BtnSave from '../../ButtonUI/BtnSave/BtnSave';
import BtnCloseAnimation from '../../ButtonUI/BtnCloseAnimation/BtnCloseAnimation';

import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import PageHeader from '../../../helpers/PageHeader';

const UpdateInfor = () => {
    const { id } = useParams();
    const [showBanReason, setShowBanReason] = useState(false);
    const handleShow = () => {
        setShowBanReason(!showBanReason);
    };
    const onHandleNewFile = () => {
        return <input type="file" />;
    };
    const [frontImg, setFrontImg] = useState('');
    const [backImg, setBackImg] = useState('');
    const [customerInfo, setCustomerInfo] = useState([]);
    useEffect(() => {
        API({
            method: 'GET',
            url: '/customer/getById/' + id,
        }).then((response) => {
            setCustomerInfo(response.data);
            setFrontImg(response.data.kyc.identityCardFronting);
            setBackImg(response.data.kyc.identityCardBacking);
        });
    }, [id]);

    const handleInput = (e) => {
        setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const data = {
            fullName: customerInfo.fullName,
            cccd: customerInfo.cccd,
            address: customerInfo.address,
            phone: customerInfo.phone,
        };
        API({
            method: 'put',
            url: `package/updatePackage`,
            data: data,
        }).then((res) => {
            toast.success('Chỉnh sửa thành công!');
        });
    };
    return (
        <div className="headerCustomer">
            <PageHeader title="Cập Nhật Khách Hàng" />

            <div>
                <div className="parperCustomer">
                    <div className="infoCustomer">
                        <div className="userInfo">
                            <div className="userInfoLabel">
                                <p>
                                    Tên khách hàng <span style={{ color: 'red' }}>*</span>:
                                </p>
                                <input
                                    type="text"
                                    placeholder="Nhập tên khách hàng..."
                                    name="fullName"
                                    value={customerInfo.fullName}
                                    onChange={(e) => handleInput(e)}
                                />
                                <p>
                                    Số CCCD / Hộ chiếu:<span style={{ color: 'red' }}>*</span>:
                                </p>
                                <input
                                    type="text"
                                    placeholder="Nhập CMND/Hộ chiếu..."
                                    name="cccd"
                                    value={customerInfo.cccd}
                                    onChange={(e) => handleInput(e)}
                                />
                                <p>
                                    Số điện thoại <span style={{ color: 'red' }}>*</span>:
                                </p>
                                <input
                                    type="text"
                                    placeholder="Nhập số điện thoại..."
                                    name="phone"
                                    value={customerInfo.phone}
                                    onChange={(e) => handleInput(e)}
                                />
                                <p>
                                    Địa chỉ <span style={{ color: 'red' }}>*</span>:
                                </p>
                                <input
                                    type="text"
                                    placeholder="Nhập địa chỉ..."
                                    name="address"
                                    value={customerInfo.address}
                                    onChange={(e) => handleInput(e)}
                                />
                            </div>
                            <div className="userInfoInput">
                                <div className="chungtuContainer">
                                    <p className="chungtuTitle">
                                        Hình ảnh CCCD <span style={{ color: 'red' }}>*</span>:
                                    </p>
                                    <div className="chungtu"></div>
                                </div>
                                <div className="imgCCCD">
                                    <img src={frontImg} alt="" />
                                    <img src={backImg} alt="" />
                                </div>
                                <div className="creditContainer">
                                    <p>Điểm tín dụng:</p>
                                    <div className="creditPointUser">
                                        <input
                                            type="text"
                                            placeholder=""
                                            name="point"
                                            value={customerInfo.point}
                                            onChange={(e) => handleInput(e)}
                                        />
                                        <Link to="/customer-manager/updateinfo/detail-credit">
                                            <button>Chi tiết</button>
                                        </Link>
                                        <button>A</button>
                                    </div>
                                </div>
                                <div className="statusContainer">
                                    <p>
                                        Tình trạng <span style={{ color: 'red' }}>*</span>:
                                    </p>
                                    <div className="radioStatus">
                                        <div className="radioContent ">
                                            <input checked type="radio" name="status" value="Hoạt động" id="active" />
                                            <label for="active" style={{ color: 'green' }}>
                                                Hoạt động
                                            </label>
                                        </div>

                                        {/* <Link to="/report-customer/update-report/ban-customer"> */}
                                        <div className="radioContent" onClick={handleShow}>
                                            <input type="radio" name="status" value="Cấm" id="ban" />
                                            <label for="ban" style={{ color: 'red' }}>
                                                Cấm
                                            </label>
                                        </div>
                                        {/* </Link> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="comfirmBtn">
                        <Button type="submit">
                            <BtnSave />
                        </Button>
                        <Button>
                            <Link to="/customer-manager">
                                <BtnCloseAnimation />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
            {showBanReason && (
                <BanSomeOne
                    showBanReason={showBanReason}
                    setShowBanReason={setShowBanReason}
                    cccd={customerInfo.cccd}
                />
            )}
        </div>
    );
};

export default UpdateInfor;
