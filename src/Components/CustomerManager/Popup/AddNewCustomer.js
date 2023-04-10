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

    const handleChange = event => {
        setFullName(event.target.value);

        console.log('value is:', event.target.value);
    };

    return (
        <div>
            <h1>Thêm mới khách hàng</h1>
            <div className="headerCustomer">
                <div>
                        <div className="infoCustomer">
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
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    placeholder="Nhập CMND/Hộ chiếu..."
                                    value={cccd}
                                />
                                <input
                                    type="text"
                                    placeholder="Nhập số điện thoại..."
                                    // value={phone}
                                />
                                <input
                                    type="text"
                                    placeholder="Nhập địa chỉ..."
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
            </div>
        </div>

    );
};

export default AddNewCustomer;
