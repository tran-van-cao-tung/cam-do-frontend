import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Grid } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ReplyIcon from '@mui/icons-material/Reply';
import './editemployee.css';
import PasswordInput from '../PasswordInput';


function EditEmployee() {
    const history = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = event => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Mật khẩu không trùng khớp!');
        }
    };


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: "22px 19px 22px 27px",
        borderRadius: "10px",
        color: theme.palette.text.secondary,
    }));



    return (
        <div className="box_employee">
            <h1 className="employee_heading-add">Cập nhật nhân viên</h1>
            <Grid container spacing={2} >
                <Grid item xs={12}>
                    <Item>
                        <form onSubmit={handleSubmit}>
                            <div className='employeeAdd'>
                                <div className='employee_input'>
                                    <span>
                                        Họ và tên <span>*</span>:
                                    </span>
                                    <input type="text" name='name' />
                                </div>
                                <div className='employee_input'>
                                    <span>
                                        Tên cửa hàng <span>*</span>:
                                    </span>
                                    <select /* className='employee_search-option' */>
                                        <option>TP. Hồ Chí Minh</option>
                                        <option>TP. Đà Nẵng</option>
                                        <option>TP. Hà Nội</option>
                                    </select>
                                </div>
                                <div className='employee_username'>
                                    <span>
                                        Tên đăng nhập <span>*</span>:
                                    </span>
                                    <span>nguyenvana</span>
                                </div>
                                <PasswordInput label="Mật khẩu" value={password} onChange={handlePasswordChange} />
                                <PasswordInput label="Nhập lại mật khẩu" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                                <div className='employee_input'>
                                    <span>
                                        Email<span>*</span>:
                                    </span>
                                    <input type="text" name='name' />
                                </div>
                                <div className='employee_input'>
                                    <span>
                                        Địa chỉ <span>*</span>:
                                    </span>
                                    <input type="text" name='name' />
                                </div>
                                <div className='employee_input'>
                                    <span>
                                        Số điện thoại <span>*</span>:
                                    </span>
                                    <input type="text" name='name' />
                                </div>
                                <div className='employee_search employee_style-search'>
                                    <div className='employee_search-check employee_style-check'>
                                        <span className='employee_search-heading'>Tình trạng<span>*</span>:</span>
                                        <input type="radio" name="radio" value="all" />
                                        <label className='check2'>Đang làm việc</label>
                                        <input type="radio" name="radio" value="all" />
                                        <label className='check3'>Tạm khóa</label>
                                    </div >
                                </div>
                                <div className='employee-btn'>
                                    <div className='employee_btn-group' >
                                        <button type='submit' className='employee_btn-item aqua'><SaveAltIcon /><span>Lưu lại</span></button >
                                        <button className='employee_btn-item yellow' onClick={() => { history('/listemployees') }}><ReplyIcon /><span>Quay lại</span></button >
                                    </div >
                                </div >
                            </div >
                        </form>
                    </Item>
                </Grid>
            </Grid>
        </div >
    )
}

export default EditEmployee