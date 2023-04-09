import React, { useState } from 'react';
import './AddList.css';

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

    const handleSubmit = (e) => {
        // e.preventDefault();
        axios({
            method: 'post',
            url: 'http://tranvancaotung-001-site1.atempurl.com/api/v1/branch/CreateBranch',
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('accessToken')}`
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
                console.log('Success Full');
                alert('Lưu Thành Công');
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
    const handleOnChangeFund = (e) => {
        setFund(JSON.parse(e.target.value));
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
                    <div className="add-section">
                        <FormControl className="add-input-group">
                            <FormLabel className="label">
                                Tên cửa hàng&nbsp;<label style={{ color: 'red' }}>*</label>:
                            </FormLabel>
                            <InputBase
                                placeholder="Nhập tên cửa hàng"
                                inputProps={{ 'aria-label': 'search' }}
                                className="add-input"
                                // value={name}
                                onChange={handleOnChangeName}
                            />
                        </FormControl>

                        <FormControl className="add-input-group">
                            <FormLabel className="label">
                                Số điện thoại&nbsp;<label style={{ color: 'red' }}>*</label>:
                            </FormLabel>
                            <InputBase
                                placeholder="Nhập số điện thoại …"
                                inputProps={{ 'aria-label': 'search' }}
                                className="add-input"
                                // value={phone}
                                onChange={handleOnChangePhone}
                            />
                        </FormControl>

                        <FormControl className="add-input-group">
                            <FormLabel className="label">
                                Địa chỉ&nbsp;<label style={{ color: 'red' }}>*</label>:
                            </FormLabel>
                            <InputBase
                                placeholder="Nhập địa chỉ"
                                inputProps={{ 'aria-label': 'search' }}
                                className="add-input"
                                // value={address}
                                onChange={handleOnChangeAddress}
                            />
                        </FormControl>

                        <FormControl className="add-input-group">
                            <FormLabel className="label">
                                Số vốn đầu tư&nbsp;<label style={{ color: 'red' }}>*</label>:
                            </FormLabel>
                            <InputBase
                                placeholder="Nhập số vốn đầu tư"
                                inputProps={{ 'aria-label': 'search' }}
                                className="add-input"
                                // value={fund}
                                onChange={handleOnChangeFund}
                            />
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