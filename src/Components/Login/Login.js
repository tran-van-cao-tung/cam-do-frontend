import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import API from '../../API';
import Swal from 'sweetalert2';
import { AuthContext } from '../../helpers/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const { setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const hanldeSubmit = (e) => {
        e.preventDefault();
        const data = {
            userName: userName,
            password: password,
        };
        API({
            method: 'post',
            url: `authentication/login`,
            data: data,
        })
            .then((res) => {
                const token = res?.data?.token?.accessToken;
                if (token) {
                    setToken(token);
                    localStorage.setItem('accessToken', res.data.token.accessToken);
                }
                navigate('/');
                toast.success('Đăng nhập thành công!!');
            })
            .catch((error) => {
                if (error.response.status) {
                    toast.error('Sai tài khoản hoặc mật khẩu!');
                }
            });
    };

    return (
        <div className="container">
            <h1>Pawns</h1>
            <div className="content-login">
                <div className="content-login_backgroud"></div>
                <form onSubmit={hanldeSubmit}>
                    <div className="content-login_fromtext">
                        <p>ĐĂNG NHẬP NGƯỜI DÙNG</p>
                    </div>
                    <input
                        type="text"
                        placeholder="Tên Đăng Nhập"
                        onChange={(e) => {
                            setUserName(e.target.value);
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Mật Khẩu"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <div className="content-login_text">
                        <Link to="/auth/forgot">Quên mật khẩu ?</Link>
                    </div>
                    <button className="btn_login" type="submit">
                        Đăng Nhập
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
