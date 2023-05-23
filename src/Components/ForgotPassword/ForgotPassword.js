import React, { useEffect, useState } from 'react';
import './Unlogin.scss';
import { Link } from 'react-router-dom';
import callAPI from '../../API';
import { toast } from 'react-toastify';

function ForgotPassword() {
    const [email, setEmail] = useState('');

    const hanldeSubmit = (e) => {
        e.preventDefault();
        callAPI({
            method: 'post',
            url: `user/recoveryPassword/` + email,
        }).then((res) => {
            console.log(`user/recoveryPassword/` + email);
            toast.success('Sửa password thành công!');
        });
    };
    return (
        <>
            <div className="container-un">
                <div className="content-unlogin">
                    <form className="from-unlogin" onSubmit={hanldeSubmit}>
                        <div className="content-unlogin_p">
                            <p>QUÊN MẬT KHẨU</p>
                        </div>
                        <input
                            type="email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            placeholder="Nhập Email vào...."
                        />
                        <div className="content-unlogin_text">
                            <Link to="/auth/login">Quay lại</Link>
                        </div>
                        <button className="btn_unlogin" type="submit">
                            Lấy lại mật khẩu
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;
