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

const AddNewCustomer = () => {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: '22px 0 22px 27px',
        borderRadius: '10px',
        color: theme.palette.text.secondary,
        height: 700,
    }));

    // const handleShow = () => {
    //     setShowBanReason(true);
    // };
    const onHandleNewFile = () => {
        return <input type="file" />;
    };

    // upload img

    const uploader = Uploader({ apiKey: 'public_W142hmnA4cUzeNeYbEgGT17DUUbE' }); // Your real API key.
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

    const [img, setImg] = useState([]);
    const [fullname, setFullName] = useState('');
    const [cccd, setCccd] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [faceImg, setFaceImg] = useState('');

    // API upload img
    function uploadCusImg(customerImg) {
        setFaceImg(customerImg);
    }
    const onAddNewCustomer = () => {
        console.log('fullname', fullname);
        // alert(faceImg);
        // API({
        //     method: 'post',
        //     url: '/customer/createCustomer',
        //     data: {
        //         // "branchId": id,
        //         fullName: fullname,
        //         cccd: cccd,
        //         phone: phone,
        //         address: address,
        //         faceImg: faceImg,
        //         status: 1,
        //         point: 100,
        //     },
        // })
        //     .then((res) => {
        //         alert('Tạo KH thành công');
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         alert('Tạo KH fail');
        //     });
    };
    const handleName = (event) => {
        setFullName(event.target.value);

        console.log('value is:', event.target.value);
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
            <h1 className="headerCustomerName">Thêm Mới Khách Hàng</h1>
            <div>
                <Item className="parperCustomer">
                    <div className="infoCustomer">
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
                                    Chứng từ <span class="starRed">*</span>:
                                </p>
                            </div>
                            <div className="userInfoInput">
                                <input
                                    type="text"
                                    placeholder="Nhập tên khách hàng..."
                                    name="fullname"
                                    value={fullname}
                                    onchange={handleName}
                                />
                                <input
                                    type="text"
                                    placeholder="Nhập CMND/Hộ chiếu..."
                                    onchange={(e) => setCccd(e.target.value)}
                                    value={cccd}
                                />
                                <input
                                    type="text"
                                    placeholder="Nhập số điện thoại..."
                                    onchange={handlePhone}
                                    // value={phone}
                                />
                                <input
                                    type="text"
                                    placeholder="Nhập địa chỉ..."
                                    onchange={handleAddress}
                                    // value={address}
                                />
                                <div className="chungtu">
                                    <UploadButton
                                        uploader={uploader}
                                        options={{ multi: true }}
                                        onComplete={(files) => uploadCusImg(files.map((x) => x.fileUrl).join('\n'))}
                                    >
                                        {({ onClick }) => <button onClick={onClick}>Upload a file...</button>}
                                    </UploadButton>
                                </div>
                            </div>
                        </div>
                        <div className="comfirmBtn">
                            <button className="saveBtn" onClick={onAddNewCustomer}>
                                <img src={saveBtn} alt="" />
                                Lưu lại
                            </button>
                            <Link to="/customer-manager">
                                <button className="returnBtn">
                                    <img src={returnBtn} alt="" />
                                    Quay lại
                                </button>
                            </Link>
                        </div>
                    </div>
                </Item>
            </div>
        </div>
    );
};

export default AddNewCustomer;
