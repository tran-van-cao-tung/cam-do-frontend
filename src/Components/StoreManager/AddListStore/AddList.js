import React, { useState } from 'react';
import './AddList.css';
import './AddList.scss';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';

import FormLabel from '@mui/material/FormLabel';
import InputBase from '@mui/material/InputBase';
import API from '../../../API';
import { Divider, Grid, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import BtnCloseAnimation from '../../ButtonUI/BtnCloseAnimation/BtnCloseAnimation';
import BtnSave from '../../ButtonUI/BtnSave/BtnSave';
import { toast } from 'react-toastify';
import PageHeader from '../../../helpers/PageHeader';
import CustomizeDiaglog, { DIALOG_SIZE } from '../../../helpers/CustomizeDiaglog';
import { Save } from '@mui/icons-material';

const AddList = ({ showAddStore, setShowAddStore }) => {
    // const [id, setId] = useState();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [fund, setFund] = useState();
    const [status, setStatus] = useState(1);

    const [fundError, setFundError] = useState('');
    const handleOnChangeFund = (e) => {
        const value = JSON.parse(e.target.value);

        if (value > 1000000000000) {
            setFundError('Số tiền không được vượt quá 10 tỷ');
        } else {
            setFundError('');
            setFund(value);
        }
        // console.log(fund);
    };
    const handleSubmit = (e) => {
        // check điều kiện ở input
        if (
            name.length > 100 ||
            phone.length < 11 ||
            phone.length > 12 ||
            address.length > 200 ||
            fund > 1000000000000
        ) {
            toast.error('Bạn đang có điều kiện không đúng!');
            setTimeout(() => {}, 5000);
            return;
        }
        // check điều kiện không được rỗng ở input
        else if (name === '' || phone === '' || address === '' || fund === '') {
            toast.error('Bạn không được để trống!');
        }
        //
        e.preventDefault();
        API({
            method: 'post',
            url: '/branch/CreateBranch',

            data: {
                // "branchId": id,
                branchName: name,
                address: address,
                phoneNumber: phone,
                fund: fund,
                status: status,
            },
        })
            .then((res) => {
                // console.log('Success Full');
                toast.success('Lưu thành công!');
            })
            .catch((err) => console.log(err));
    };

    const handleOnChangeName = (e) => {
        setName(e.target.value);
        // console.log(name);
    };
    const handleOnChangePhone = (e) => {
        const inputPhone = e.target.value;
        const formattedPhone = inputPhone
            .replace(/\D/g, '') // loại bỏ các ký tự không phải số
            .replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3'); // chèn dấu cách vào giữa các số

        setPhone(formattedPhone);
    };

    // const handleOnChangePhone = (e) => {
    //     setPhone(e.target.value);
    //     // console.log(phone);
    // };
    const handleOnChangeAddress = (e) => {
        setAddress(e.target.value);
        // console.log(address);
    };

    const handleOnChangeStatus = (e) => {
        setStatus(e.target.value);
        // console.log(status);
    };
    const renderContent = () => (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Grid item xs={12}>
                    <TextField
                        value={name}
                        onChange={handleOnChangeName}
                        id="standard-basic"
                        label={
                            <p>
                                Tên cửa hàng <span style={{ color: 'red' }}>*</span>:
                            </p>
                        }
                        fullWidth
                        variant="standard"
                    />
                    {name.length > 100 && (
                        <div style={{ color: 'red' }}> Tên cửa hàng không được vượt quá 100 kí tự </div>
                    )}
                </Grid>

                <Grid item xs={12} marginTop="5px">
                    <TextField
                        value={phone}
                        id="standard-basic"
                        label={
                            <p>
                                Số điện thoại<span style={{ color: 'red' }}>*</span>:
                            </p>
                        }
                        fullWidth
                        type="text"
                        variant="standard"
                        onChange={handleOnChangePhone}
                    />
                    {phone.length < 11 ||
                        (phone.length > 12 && (
                            <div style={{ color: 'red' }}> Nhập đúng định dạng số điện thoại, 10 hoặc 11 số</div>
                        ))}
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <Grid item xs={12}>
                    <TextField
                        value={address}
                        id="standard-basic"
                        label={
                            <p>
                                Địa chỉ <span style={{ color: 'red' }}>*</span>:
                            </p>
                        }
                        fullWidth
                        variant="standard"
                        onChange={handleOnChangeAddress}
                    />
                    {address.length > 200 && (
                        <div style={{ color: 'red' }}> Tên cửa hàng không được vượt quá 200 kí tự </div>
                    )}
                </Grid>

                <Grid item xs={12} marginTop="5px">
                    <TextField
                        value={fund}
                        id="standard-basic"
                        label={
                            <p>
                                Số vốn đầu tư<span style={{ color: 'red' }}>*</span>:
                            </p>
                        }
                        fullWidth
                        type="number"
                        variant="standard"
                        onChange={handleOnChangeFund}
                    />
                    {fundError && <div style={{ color: 'red' }}>{fundError}</div>}
                </Grid>
            </Grid>
        </Grid>
    );

    const handleCloseDialog = () => {
        setShowAddStore(false);
    };
    return (
        <CustomizeDiaglog
            open={showAddStore}
            onClose={handleCloseDialog}
            title="Thêm Mới Cửa Hàng"
            content={renderContent()}
            action={
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
            }
            maxWidth={DIALOG_SIZE.sm}
        />
    );
};
export default AddList;
