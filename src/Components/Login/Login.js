import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';


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
        axios.post(`
        http://tranvancaotung-001-site1.ftempurl.com/api/authentication/login/create`, data).then(res => {
            localStorage.setItem('accessToken', res.data.accessToken)
            history('/')
        }).catch(err => { console.log(err) })
        
    }

    return (
        <div className='container'>
            <h1>Pawns</h1>
            <div className='content'>
                <form onSubmit={hanldeSubmit}>
                    <input type='text' placeholder='Tên Đăng Nhập' onChange={(e) => { setUserName(e.target.value) }} />
                    <input type='password' placeholder='Mật Khẩu' onChange={(e) => { setPassword(e.target.value) }} />
                    <button className='btn_login' type='submit'>Đăng Nhập</button>
                </form>
            </div>

        </div>
    );
}

export default Login;
