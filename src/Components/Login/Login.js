import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss';
import API from '../../API';

const Login = () => {
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const history = useNavigate();


    const hanldeSubmit = (e) => {
        e.preventDefault();
        const data = {
            userName: userName,
            password: password,
        }
        API({
            method: 'post',
            url: `authentication/login`,
            data: data
        }).then(res => {
            localStorage.setItem('accessToken', res.data.token.accessToken)
            localStorage.setItem('userName', res.data.account.userName);
            if (res.data.account.userId) {
                localStorage.setItem('userId', res.data.account.userId);
            }
            history('/')
            window.location.reload(false);
        });
    }

    return (
        <div className='container'>
            <h1>Pawns</h1>
            <div className='content-login'>
                <div className='content-login_backgroud'></div>
                <form onSubmit={hanldeSubmit}>
                    <div className='content-login_fromtext'>
                        <p>ĐĂNG NHẬP NGƯỜI DÙNG</p>
                    </div>
                    <input type='text' placeholder='Tên Đăng Nhập' onChange={(e) => { setUserName(e.target.value) }} />
                    <input type='password' placeholder='Mật Khẩu' onChange={(e) => { setPassword(e.target.value) }} />
                    <div className='content-login_text'>
                        <a href='#'>Quên mật khẩu ?</a>
                    </div>
                    <button className='btn_login' type='submit'>Đăng Nhập</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
