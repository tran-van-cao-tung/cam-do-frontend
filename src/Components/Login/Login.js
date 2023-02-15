import React from 'react';
import './login.css';
const Login = () => {
    return (
        <div className='container'>
            <h1>Pawns</h1>
            <div className='content'>
                <form>
                <input type='text' placeholder='Tên Đăng Nhập' />
                <input type='password' placeholder='Mật Khẩu' />
                <button className='btn_login'>Đăng Nhập</button>
                </form>
            </div>

        </div>
    );
}

export default Login;
