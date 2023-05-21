import React, { useState } from 'react';

import { styled } from '@mui/material/styles';
import './UpdateInfor.css';
import Paper from '@mui/material/Paper';

import saveBtn from '../../../asset/img/save1.png';
import returnBtn from '../../../asset/img/returnBTN.png';
import { Link } from 'react-router-dom';
import { Uploader } from 'uploader';
import { UploadButton, UploadDropzone } from 'react-uploader';
import API from '../../../API';
import BtnCloseAnimation from '../../ButtonUI/BtnCloseAnimation/BtnCloseAnimation';
import { Button } from '@mui/material';
import BtnSave from '../../ButtonUI/BtnSave/BtnSave';
import PageHeader from '../../../helpers/PageHeader';

const AddNewCustomer = () => {
    const uploader = Uploader({ apiKey: 'public_W142hsRDrKu5afNchEBx4f7nFNZx' }); // Your real API key.
    const uploaderOptions = {
        multi: true,

        // Comment out this line & use 'onUpdate' instead of
        // 'onComplete' to have the dropzone close after upload.
        showFinishButton: true,

        styles: {
            colors: {
                primary: '#377dff',
            },
        },
    };

    // API upload img
    function uploadFrontImg(frontImg) {
        setFrontImg(frontImg);
    }
    function uploadBackImg(backImg) {
        setBackImg(backImg);
    }

    const onAddNewCustomer = () => {
        API({
            method: 'post',
            url: '/customer/createCustomer',
            data: {
                // "branchId": id,
                fullName: name,
                cccd: cccd,
                phone: phone,
                address: address,
                identityCardFronting: frontImg,
                identityCardBacking: backImg,
                faceImg: faceImg,
                status: 1,
                point: 50,
            },
        })
            .then((res) => {
                alert('Tạo KH thành công');
            })
            .catch((err) => {
                console.log(err);
                alert('Tạo KH fail');
            });
    };
    const [name, setName] = useState('');
    const [cccd, setCccd] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [faceImg, setFaceImg] = useState('');
    const [frontImg, setFrontImg] = useState('');
    const [backImg, setBackImg] = useState('');

    const handleName = (e) => {
        setName(e.target.value);
    };
    const handleCccd = (e) => {
        setCccd(e.target.value);
    };
    const handlePhone = (e) => {
        setPhone(e.target.value);
    };
    const handleAddress = (e) => {
        setAddress(e.target.value);
    };

    return (
        <div className="headerCustomer">
            <PageHeader title="Thêm Mới Khách Hàng" />

            <div>
                <div className="parperCustomer">
                    <div className="infoCustomer">
                        <form>
                            <div className="userInfo">
                                <div className="userInfoLabel">
                                    <p>
                                        Tên khách hàng <span class="starRed">*</span>:
                                    </p>
                                    <p>
                                        Số CMND/Hộ chiếu:<span class="starRed">*</span>:
                                    </p>
                                    <p>
                                        Số điện thoại <span class="starRed">*</span>:
                                    </p>
                                    <p>
                                        Địa chỉ <span class="starRed">*</span>:
                                    </p>
                                    <p>
                                        CMND/CCCD <span class="starRed">*</span>:
                                    </p>
                                </div>
                                <div className="userInfoInput">
                                    <input
                                        type="text"
                                        placeholder="Nhập tên khách hàng..."
                                        value={name}
                                        onChange={(e) => handleName(e)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Nhập CMND/Hộ chiếu..."
                                        value={cccd}
                                        onChange={(e) => setCccd(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Nhập số điện thoại..."
                                        onChange={handlePhone}
                                        value={phone}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Nhập địa chỉ..."
                                        onChange={handleAddress}
                                        value={address}
                                    />
                                    <div className="chungtu">
                                        <UploadButton
                                            uploader={uploader}
                                            options={{ multi: true }}
                                            onComplete={(files) =>
                                                uploadFrontImg(files.map((x) => x.fileUrl).join('\n'))
                                            }
                                        >
                                            {({ onClick }) => <button onClick={onClick}>Upload Mặt Trước...</button>}
                                        </UploadButton>
                                        <UploadButton
                                            uploader={uploader}
                                            options={{ multi: true }}
                                            onComplete={(files) =>
                                                uploadBackImg(files.map((x) => x.fileUrl).join('\n'))
                                            }
                                        >
                                            {({ onClick }) => <button onClick={onClick}>Upload Mặt Sau...</button>}
                                        </UploadButton>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="comfirmBtn">
                            <Button onClick={onAddNewCustomer}>
                                <BtnSave />
                            </Button>
                            <Link to="/customer-manager">
                                <Button>
                                    <BtnCloseAnimation />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNewCustomer;
