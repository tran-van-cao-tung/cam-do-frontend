import React, { useEffect, useState } from 'react';
import './UpdateInfor.css';
import saveBtn from '../../../asset/img/save1.png';
import returnBtn from '../../../asset/img/returnBTN.png';
import { Link } from 'react-router-dom';
import API from '../../../API';
import BanSomeOne from './BanSomeOne';
import { Button } from '@mui/material';
import BtnSave from '../../ButtonUI/BtnSave/BtnSave';
import BtnCloseAnimation from '../../ButtonUI/BtnCloseAnimation/BtnCloseAnimation';
const UpdateInfor = () => {
    const [showBanReason, setShowBanReason] = useState(false);
    const handleShow = () => {
        setShowBanReason(!showBanReason);
    };
    const onHandleNewFile = () => {
        return <input type="file" />;
    };
    const [cusID, setCusID] = useState('');
    const [faceImg, setFaceImg] = useState('');
    const [frontImg, setFrontImg] = useState('');
    const [backImg, setBackImg] = useState('');
    const [customerInfo, setCustomerInfo] = useState([]);
    useEffect(() => {
        API({
            method: 'GET',
            url: '/customer/getByCCCD/' + sessionStorage.getItem('num'),
        }).then((response) => {
            sessionStorage.clear();
            setCustomerInfo(response.data);
        });
    }, []);

    useEffect(() => {
        API({
            method: 'GET',
            url: '/customer/getByCCCD/' + sessionStorage.getItem('num'),
        }).then((response) => {
            // setKyc(response.data.kycId);
            setCustomerInfo(response.data);
            console.log('this is kyc' + response.data.kycId);
        });
    }, []);
    // useEffect(() => {
    //     API({
    //         method: 'GET',
    //         url: '/kyc/getAll',
    //     }).then((res) => {
    //         console.log(res.data);
    //         console.log(kyc);
    //         for (let i = 0; i < res.data.length; i++) {
    //             if (res.data[i].kycId === kyc) {
    //                 setFaceImg(res.data[i].faceImg);
    //                 setFrontImg(res.data[i].identityCardFronting);
    //                 setFaceImg(res.data[i].identityCardBacking);
    
    //             }
    //         }
    //     });
    // }, []);
    
    return (
        <div className="headerCustomer">
            <h1 className="headerCustomerName">Cập Nhật Khách Hàng</h1>
            <div>
                <div className="parperCustomer">
                    <div className="infoCustomer">
                        <div className="userInfo">
                            <div className="userInfoLabel">
                                <p>
                                    Tên khách hàng <span class="starRed">*</span>:
                                </p>
                                <input type="text" placeholder="Nhập tên khách hàng..." value={customerInfo.fullName} />
                                <p>
                                    Số CCCD / Hộ chiếu:<span class="starRed">*</span>:
                                </p>
                                <input type="text" placeholder="Nhập CMND/Hộ chiếu..." value={customerInfo.cccd} />
                                <p>
                                    Số điện thoại <span class="starRed">*</span>:
                                </p>
                                <input type="text" placeholder="Nhập số điện thoại..." value={customerInfo.phone} />
                                <p>
                                    Địa chỉ <span class="starRed">*</span>:
                                </p>
                                <input type="text" placeholder="Nhập địa chỉ..." value={customerInfo.address} />
                            </div>
                            <div className="userInfoInput">
                                <div className="chungtuContainer">
                                    <p className="chungtuTitle">
                                        Hình ảnh CCCD <span class="starRed">*</span>:
                                    </p>
                                    <div className="chungtu">
                                        {/* <button onClick={onHandleNewFile}>Thêm mới</button> */}
                                        {/* <a href={faceImg} target="_blank" rel="noopener noreferrer">
                                            <img src={faceImg} width={100} height={65} />
                                        </a> */}
                                    </div>
                                </div>
                                <div className="imgCCCD">
                                    <img
                                        src={frontImg}
                                        alt=""
                                    />
                                    <img
                                        src={backImg}
                                        alt=""
                                    />
                                </div>
                                <div className="creditContainer">
                                    <p>Điểm tín dụng:</p>
                                    <div className="creditPointUser">
                                        <span>300</span>
                                        {/* <Link to="/customer-manager/updateinfo/detail-credit">
                                            <button>Chi tiết</button>
                                        </Link> */}
                                    </div>
                                </div>
                                <div className="statusContainer">
                                    <p>
                                        Tình trạng <span class="starRed">*</span>:
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
