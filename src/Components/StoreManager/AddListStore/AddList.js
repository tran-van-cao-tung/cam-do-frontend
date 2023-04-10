import React, { useState } from 'react';
import './AddList.css';
import './AddList.scss';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import InputBase from '@mui/material/InputBase';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import axios from 'axios';

import { Divider } from '@mui/material';

const AddList = () => {
    // const [id, setId] = useState();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [fund, setFund] = useState();
    const [status, setStatus] = useState();

    const [notification, setNotification] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        // check điều kiện ở input
        if (name.length > 100 || phone.length < 10 || phone.length > 11 || address.length > 200 || fundError) {
            setNotification('Bạn đang có điều kiện không đúng!');
            setTimeout(() => {
                setNotification(null);
            }, 5000);
            return;
        }
        // check điều kiện không được rỗng ở input
        if (name === '' || phone === '' || address === '' || fund === '') {
            setNotification('Bạn không được để trống!');
            setTimeout(() => {
                setNotification(null);
            }, 5000);
            return;
        }
        //
        e.preventDefault();
        setSuccess(true);
        // e.preventDefault();

        axios({
            method: 'post',
            url: 'http://tranvancaotung-001-site1.atempurl.com/api/v1/branch/CreateBranch',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
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
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                }, 5000);
            })
            .catch((err) => console.log(err));
    };

    const handleOnChangeName = (e) => {
        setName(e.target.value);
        // console.log(name);
    };
    const handleOnChangePhone = (e) => {
        setPhone(e.target.value);
        // console.log(phone);
    };
    const handleOnChangeAddress = (e) => {
        setAddress(e.target.value);
        // console.log(address);
    };
    const [fundError, setFundError] = useState('');
    const handleOnChangeFund = (e) => {
        const value = JSON.parse(e.target.value);
        if (value > 10000000000) {
            setFundError('Số tiền không được vượt quá 10 tỷ');
        } else {
            setFundError('');
            setFund(value);
        }
        // console.log(fund);
    };
    const handleOnChangeStatus = (e) => {
        setStatus(e.target.value);
        // console.log(status);
    };

    return (
        <>
            <div className="Addliststore">
                <h1>Thêm mới cửa hàng</h1>
                <div className="wareh-content">
                    {/* Add a erro message */}
                    {notification && (
                        <div class="alert alert-danger" role="alert">
                            <i class="material-icons">
                                <span>{notification}</span>
                            </i>
                        </div>
                    )}
                    {/* Add a success message */}
                    {success && (
                        <div class="alert alert-success" role="alert">
                            <i class="material-icons">
                                <span> Lưu thành công!</span>
                            </i>
                        </div>
                    )}
                    <div className="add-section">
                        <FormControl className="add-input-group">
                            <FormLabel className="label">
                                Tên cửa hàng&nbsp;<label style={{ color: 'red' }}>*</label>:
                            </FormLabel>
                            <InputBase
                                placeholder="Nhập tên cửa hàng"
                                inputProps={{ 'aria-label': 'search', maxLength: 101 }}
                                className="add-input"
                                // value={name}
                                onChange={handleOnChangeName}
                            />
                            {name.length > 100 && (
                                <div style={{ color: 'red' }}> Tên cửa hàng không được vượt quá 100 kí tự </div>
                            )}
                        </FormControl>

                        <FormControl className="add-input-group">
                            <FormLabel className="label">
                                Số điện thoại&nbsp;<label style={{ color: 'red' }}>*</label>:
                            </FormLabel>
                            <InputBase
                                placeholder="Nhập số điện thoại …"
                                inputProps={{ 'aria-label': 'search', maxLength: 12 }}
                                className="add-input"
                                type="number"
                                // value={phone}
                                onChange={handleOnChangePhone}
                            />
                            {phone.length < 10 ||
                                (phone.length > 11 && (
                                    <div style={{ color: 'red' }}>
                                        {' '}
                                        Nhập đúng định dạng số điện thoại, 10 hoặc 11 số
                                    </div>
                                ))}
                        </FormControl>

                        <FormControl className="add-input-group">
                            <FormLabel className="label">
                                Địa chỉ&nbsp;<label style={{ color: 'red' }}>*</label>:
                            </FormLabel>
                            <InputBase
                                placeholder="Nhập địa chỉ"
                                inputProps={{ 'aria-label': 'search', maxLength: 201 }}
                                className="add-input"
                                // value={address}
                                onChange={handleOnChangeAddress}
                            />
                            {address.length > 200 && (
                                <div style={{ color: 'red' }}> Tên cửa hàng không được vượt quá 200 kí tự </div>
                            )}
                        </FormControl>

                        <FormControl className="add-input-group">
                            <FormLabel className="label">
                                Số vốn đầu tư&nbsp;<label style={{ color: 'red' }}>*</label>:
                            </FormLabel>
                            <InputBase
                                placeholder="Nhập số vốn đầu tư"
                                inputProps={{ 'aria-label': 'search', max: 10000000000, maxLength: 12 }}
                                className="add-input"
                                type="number"
                                // value={fund}
                                onChange={handleOnChangeFund}
                            />
                            {fundError && <div style={{ color: 'red' }}>{fundError}</div>}
                        </FormControl>

                        <FormControl className="add-status-group">
                            <FormLabel className="label">
                                Tình trạng&nbsp;<label style={{ color: 'red' }}>*</label>:
                            </FormLabel>
                            <RadioGroup row name="status" defaultValue={0}>
                                <FormControlLabel
                                    value="0"
                                    control={<Radio />}
                                    label="Đang hoạt động"
                                    className="radio-available"
                                    onChange={handleOnChangeStatus}
                                />

                                <FormControlLabel
                                    value="1"
                                    control={<Radio />}
                                    label="Đã tạm dừng"
                                    className="radio-closed"
                                    onChange={handleOnChangeStatus}
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>

                    <Divider />

                    <div className="add-actions">
                        <Button onClick={handleSubmit} className="save-btn" variant="contained">
                            Lưu lại
                        </Button>

                        <Button className="back-btn" variant="contained" href="/liststore">
                            Quay lại
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddList;
