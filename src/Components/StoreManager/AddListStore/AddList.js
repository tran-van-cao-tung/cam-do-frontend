import React, { useState } from 'react';
import './AddList.css';
import './AddList.scss';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';

import FormLabel from '@mui/material/FormLabel';
import InputBase from '@mui/material/InputBase';
import API from '../../../API';
import { Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import BtnCloseAnimation from '../../ButtonUI/BtnCloseAnimation/BtnCloseAnimation';
import BtnSave from '../../ButtonUI/BtnSave/BtnSave';
import { toast } from 'react-toastify';

const AddList = () => {
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
    const handleOnChangePhone = (event) => {
        const inputPhone = event.target.value;
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

    return (
        <>
            <div className="Addliststore">
                <h1>Thêm mới cửa hàng</h1>
                <div className="wareh-content">
                    {/* Add a erro message */}

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
                                // inputProps={{ 'aria-label': 'search', maxLength: 12 }}
                                className="add-input"
                                type="text"
                                value={phone}
                                onChange={handleOnChangePhone}
                            />
                            {phone.length < 11 ||
                                (phone.length > 12 && (
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
                            {/* <input
                                placeholder="Nhập số vốn đầu tư"
                                className="add-input"
                                type="number"
                                value={fund}
                                onChange={handleOnChangeFund}
                                // pattern="/^-?\d+\.?\d*$/"
                                // onKeyPress={ target.value.length==4 ?  false : true }
                                // if(this.value.length==4) return false;
                            /> */}
                            <InputBase
                                placeholder="Nhập số vốn đầu tư"
                                inputProps={{ 'aria-label': 'search', max: 10000000000, maxLength: 12 }}
                                className="add-input"
                                type="number"
                                onKeyPress="if(this.value.length==12) return false;"
                                // value={fund}
                                onChange={handleOnChangeFund}
                            />
                            {fundError && <div style={{ color: 'red' }}>{fundError}</div>}
                        </FormControl>

                        {/* <FormControl className="add-status-group">
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
                        </FormControl> */}
                    </div>

                    <Divider />

                    <div className="add-actions">
                        <Button onClick={handleSubmit}>
                            <BtnSave />
                        </Button>

                        <Link to="/liststore">
                            <Button>
                                <BtnCloseAnimation />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddList;
