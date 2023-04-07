import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss';

const Login = () => {
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const history = useNavigate();
    const hanldeSubmit = (e) => {
        e.preventDefault();
        // axios.post(`
        // http://tranvancaotung-001-site1.ftempurl.com/api/authentication/login/login`, data).then(res => {
        //     localStorage.setItem('accessToken', res.data.accessToken)
        //     history('/')
        // }).catch(err => { console.log(err) })
        axios({
            method: 'post',
            url: 'http://tranvancaotung-001-site1.ftempurl.com/api/v1/authentication/login',
            data: {
                userName: userName,
                password: password,
                remember: true
            }
        }).then((res) => {
            localStorage.setItem('accessToken', res.data.token.accessToken)
            console.log('accessToken', res.data.token.accessToken);
            history('/')
        });
    }

    return (
        <div className='container'>
            <h1>Pawns</h1>
            <div className='content-login'>
                <div className='content-login_backgroud'>Anh Tùng Tùng Tùng Tùng</div>
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
