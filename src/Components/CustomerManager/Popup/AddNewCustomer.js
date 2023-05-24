import React, { useState } from 'react';

import './UpdateInfor.css';

import { Uploader } from 'uploader';
import { UploadDropzone } from 'react-uploader';
import API from '../../../API';

import { Button, Grid, TextField } from '@mui/material';

import { Save } from '@mui/icons-material';
import CustomizeDiaglog, { DIALOG_SIZE } from '../../../helpers/CustomizeDiaglog';

const AddNewCustomer = ({ setShowAddCustomer, showAddCustomer }) => {
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

    const renderContent = () => (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Grid item xs={12}>
                    <TextField
                        value={name}
                        onChange={(e) => handleName(e)}
                        id="standard-basic"
                        label={
                            <p>
                                Tên khách hàng <span style={{ color: 'red' }}>*</span>:
                            </p>
                        }
                        fullWidth
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12} marginTop="5px">
                    <TextField
                        value={cccd}
                        onChange={(e) => setCccd(e.target.value)}
                        id="standard-basic"
                        label={
                            <p>
                                Số CMND/Hộ chiếu:<span style={{ color: 'red' }}>*</span>:
                            </p>
                        }
                        fullWidth
                        variant="standard"
                    />
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <Grid item xs={12}>
                    <TextField
                        onChange={handlePhone}
                        value={phone}
                        id="standard-basic"
                        label={
                            <p>
                                Số điện thoại <span style={{ color: 'red' }}>*</span>:
                            </p>
                        }
                        fullWidth
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12} marginTop="5px">
                    <TextField
                        onChange={handleAddress}
                        value={address}
                        id="standard-basic"
                        label={
                            <p>
                                Địa chỉ <span style={{ color: 'red' }}>*</span>:
                            </p>
                        }
                        fullWidth
                        variant="standard"
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} marginTop="5px">
                CMND/CCCD <span style={{ color: 'red' }}>*</span>:
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="space-between">
                <Grid item>
                    <p style={{ textAlign: 'center', fontWeight: 700 }}>Mặt Trước</p>

                    <UploadDropzone
                        uploader={uploader}
                        options={uploaderOptions}
                        onUpdate={(files) => console.log(files.map((x) => x.fileUrl).join('\n'))}
                        onComplete={(files) => uploadFrontImg(files.map((x) => x.fileUrl).join('\n'))}
                        width="600px"
                        height="300px"
                    />
                </Grid>
                <Grid item>
                    <p style={{ textAlign: 'center', fontWeight: 700 }}>Mặt Sau</p>

                    <UploadDropzone
                        uploader={uploader}
                        options={uploaderOptions}
                        onUpdate={(files) => console.log(files.map((x) => x.fileUrl).join('\n'))}
                        onComplete={(files) => uploadBackImg(files.map((x) => x.fileUrl).join('\n'))}
                        width="600px"
                        height="300px"
                    />
                </Grid>
            </Grid>
        </Grid>
    );
    const handleCloseDialog = () => {
        setShowAddCustomer(false);
    };

    return (
        <CustomizeDiaglog
            open={showAddCustomer}
            onClose={handleCloseDialog}
            title="Thêm Mới Khách Hàng"
            content={renderContent()}
            action={
                <Button
                    onClick={(e) => onAddNewCustomer(e)}
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
            }
            maxWidth={DIALOG_SIZE.sm}
        />
    );
};

export default AddNewCustomer;
