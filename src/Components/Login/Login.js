import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import API from '../../API';
import Swal from 'sweetalert2';
import { AuthContext } from '../../helpers/AuthContext';

const Login = () => {
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const { setToken } = useContext(AuthContext);
    const history = useNavigate();

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
                    console.log(token);
                    setToken(token);
                    localStorage.setItem('accessToken', res.data.token.accessToken);
                }
                history('/');
            })
            .catch((error) => {
                if (error.response.status) {
                    Swal.fire({
                        text: `Sai tài khoản hoặc mật khẩu!`,
                        icon: 'warning',
                    }).then((result) => {});
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
                        <Link to="/unlogin">Quên mật khẩu ?</Link>
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
