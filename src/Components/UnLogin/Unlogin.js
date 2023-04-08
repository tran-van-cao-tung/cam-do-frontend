import React from 'react';
import './Unlogin.scss';

function Unlogin() {
    return (
        <>
            <div className="container-un">
                <div className="content-unlogin">
                    <form className='from-unlogin'>
                        <div className="content-unlogin_p">
                            <p>QUÊN MẬT KHẨU</p>
                        </div>
                        <input type="email" placeholder="Nhập Email vào...." />
                        <div className="content-unlogin_text">
                            <a href="/login">Quay lại</a>
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

export default Unlogin;
