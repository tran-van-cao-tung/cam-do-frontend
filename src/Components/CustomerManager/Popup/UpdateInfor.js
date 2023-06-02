import React, { useEffect, useState } from 'react';
import './UpdateInfor.css';

import API from '../../../API';

import { Button, Grid, TextField } from '@mui/material';

import { toast } from 'react-toastify';

import CustomizeDiaglog, { DIALOG_SIZE } from '../../../helpers/CustomizeDiaglog';
import { Save } from '@mui/icons-material';

const CUSTOMER_STATUS = {
    Active: 1,
    BlackList: 2,
};

const UpdateInfor = ({ showEditCustomer, setShowEditCustomer, refresh }) => {
    const id = localStorage.getItem('CustomerId');
    const [showBanReason, setShowBanReason] = useState(false);
    const handleShow = () => {
        setShowBanReason(!showBanReason);
    };
    const onHandleNewFile = () => {
        return <input type="file" />;
    };
    const [frontImg, setFrontImg] = useState('');
    const [backImg, setBackImg] = useState('');
    const [customerInfo, setCustomerInfo] = useState({});
    useEffect(() => {
        API({
            method: 'GET',
            url: '/customer/getById/' + id,
        }).then((response) => {
            setCustomerInfo(response.data);
            setFrontImg(response.data.kyc.identityCardFronting);
            setBackImg(response.data.kyc.identityCardBacking);
            console.log('customerInfo', response.data);
        });
    }, [id]);

    const handleInput = (e) => {
        setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
    };

    const handleChangeStatus = (value) => {
        if(value === 2){
            handleShow();
        }
        const newCustomerInfo = {};
        for (let key in customerInfo) {
            newCustomerInfo[key] = customerInfo[key];
        }
        newCustomerInfo.status = value;
        setCustomerInfo({ ...customerInfo, status: value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const data = {
            customerId: customerInfo.customerId,
            fullName: customerInfo.fullName,
            cccd: customerInfo.cccd,
            address: customerInfo.address,
            phone: customerInfo.phone,
            status: customerInfo.status,
        };
        API({
            method: 'put',
            url: '/customer/updateCustomer',
            data: data,
        }).then((res) => {
            refresh();
            toast.success('Chỉnh sửa thành công!');
            setShowEditCustomer(false);
        });
    };
    const renderContent = () => (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Grid item marginBottom="5px">
                    <TextField
                        value={customerInfo.fullName ?? ''}
                        onChange={(e) => handleInput(e)}
                        name="fullName"
                        label={
                            <p>
                                Tên khách hàng <span style={{ color: 'red' }}>*</span>:
                            </p>
                        }
                        fullWidth
                        variant="standard"
                    />
                </Grid>

                <Grid item marginBottom="5px">
                    <TextField
                        value={customerInfo.cccd ?? ''}
                        onChange={(e) => handleInput(e)}
                        name="cccd"
                        label={
                            <p>
                                Số CCCD / Hộ chiếu:<span style={{ color: 'red' }}>*</span>:
                            </p>
                        }
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item marginBottom="5px">
                    <TextField
                        disabled
                        value={customerInfo.point ?? ''}
                        name="point"
                        label={
                            <p>
                                Điểm tín dụng:<span style={{ color: 'red' }}>*</span>:
                            </p>
                        }
                        fullWidth
                        variant="standard"
                    />
                </Grid>
            </Grid>
            <Grid item xs={6} display="flex" flexDirection="column" justifyContent="space-between">
                <Grid item marginBottom="5px">
                    <TextField
                        value={customerInfo.phone ?? ''}
                        onChange={(e) => handleInput(e)}
                        name="phone"
                        label={
                            <p>
                                Số điện thoại <span style={{ color: 'red' }}>*</span>:
                            </p>
                        }
                        fullWidth
                        variant="standard"
                    />
                </Grid>

                <Grid item marginBottom="5px">
                    <TextField
                        value={customerInfo.address ?? ''}
                        onChange={(e) => handleInput(e)}
                        name="address"
                        label={
                            <p>
                                Địa chỉ <span style={{ color: 'red' }}>*</span>:
                            </p>
                        }
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} display="flex" alignItems="flex-end">
                    <Grid item xs={4}>
                        <p>
                            Tình trạng <span style={{ color: 'red' }}>*</span>:
                        </p>
                    </Grid>
                    <Grid item xs={3} display="flex" justifyContent="space-between">
                        <Grid item>
                            <input
                                onClick={(e) => handleChangeStatus(CUSTOMER_STATUS.Active)}
                                checked={customerInfo.status === CUSTOMER_STATUS.Active}
                                type="radio"
                                name="status"
                            />
                            <label for="active" style={{ color: 'green', marginLeft: '5px' }}>
                                Hoạt động
                            </label>
                        </Grid>

                        <Grid item>
                            <input
                                onClick={(e) => handleChangeStatus(CUSTOMER_STATUS.BlackList)}
                                checked={customerInfo.status === CUSTOMER_STATUS.BlackList}
                                type="radio"
                                name="status"
                            />
                            <label for="ban" style={{ color: 'red', marginLeft: '5px' }}>
                                Cấm
                            </label>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <h3>
                    Hình ảnh CCCD <span style={{ color: 'red' }}>*</span>:
                </h3>
            </Grid>
            <Grid item xs={12} display="flex" height="300px" justifyContent="space-between">
                <Grid item xs={5.8}>
                    <p style={{ textAlign: 'center', fontWeight: 700, marginBottom: '10px' }}>Mặt Trước</p>
                    <Grid
                        item
                        xs={12}
                        style={{ marginRight: '50px', border: '1px solid #ccc', width: '100%', height: '250px' }}
                    >
                        {frontImg ? <img src={frontImg} alt=" " style={{ height: '250px' }} /> : null}{' '}
                    </Grid>
                </Grid>
                <Grid item xs={5.8}>
                    <p style={{ textAlign: 'center', fontWeight: 700, marginBottom: '10px' }}>Mặt Sau</p>
                    <Grid item xs={12} style={{ border: '1px solid #ccc', width: '100%', height: '250px' }}>
                        {backImg ? <img src={backImg} alt=" " style={{ height: '250px' }} /> : null}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
    const handleCloseDialog = () => {
        setShowEditCustomer(false);
    };
    return (
        <CustomizeDiaglog
            open={showEditCustomer}
            onClose={handleCloseDialog}
            title="Cập nhật khách hàng"
            content={renderContent()}
            action={
                <Button
                    type="submit"
                    onClick={(e) => onSubmit(e)}
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
            maxWidth={DIALOG_SIZE.xl}
        />
    );
};

export default UpdateInfor;
