import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import menu1 from '../../asset/img/menu1.png';
import menu2 from '../../asset/img/menu2.png';
import menu3 from '../../asset/img/menu3.png';
import menu5 from '../../asset/img/menu5.png';
import menu6 from '../../asset/img/menu6.png';
import menu7 from '../../asset/img/menu7.png';
import API from '../../API';
import { AiOutlineAlignRight } from 'react-icons/ai';
import { AuthContext } from '../../helpers/AuthContext';
import { isAvailableArray } from '../../helpers/utils';

export const PERMISSIONS = {
    "Cầm Đồ": 1,
    "Quản Lý Cửa Hàng": 2,
    "Quản Lý Kho": 3,
    "Quản Lý Nhân Viên": 4,
    "Quản Lý Khách Hàng": 5
}

const NavMenu = () => {
    const { authState, setPermissions, permissions } = useContext(AuthContext);

    const [show1, setShow1] = useState(JSON.parse(localStorage.getItem('show1')) || false);
    const [show2, setShow2] = useState(JSON.parse(localStorage.getItem('show2')) || false);
    const [show3, setShow3] = useState(JSON.parse(localStorage.getItem('show3')) || false);

    const clickShow = () => {
        setShow1(!show1);
    };
    const clickShow1 = () => {
        setShow2(!show2);
    };
    const clickShow2 = () => {
        setShow3(!show3);
    };

    useEffect(() => {
        localStorage.setItem('show1', JSON.stringify(show1));
        localStorage.setItem('show2', JSON.stringify(show2));
        localStorage.setItem('show3', JSON.stringify(show3));
    }, [show1, show2, show3]);
    const clickHide = () => {
        localStorage.setItem('show1', JSON.stringify(false));
        localStorage.setItem('show2', JSON.stringify(false));
        localStorage.setItem('show3', JSON.stringify(false));
        setShow1(false);
        setShow2(false);
        setShow3(false);
    };
    useEffect(() => {
        const shouldReload = !localStorage.getItem('pageLoaded');
        if (shouldReload) {
            localStorage.setItem('pageLoaded', 'true');
            window.location.reload(false);
        }
    }, []);

    useEffect(() => {
        console.log('check permission after login');
        if (authState?.userId) {
            API({
                method: 'post',
                url: '/permission/showpermission',
                data: {
                    userId: authState.userId,
                    nameUser: 'string',
                },
            }).then((res) => {
                const permissions = isAvailableArray(res.data) ? res.data : [];
                setPermissions(permissions);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authState?.userId]);

    const hasPermission = (id) => {
        const permission = permissions.find(item => item.permissionId === id);
        return permission?.status === true;
    }

    return (
        <div className="menu-conten">
            <div className="logos">
                <p className="logo">
                    P<span style={{ color: 'orange' }}>awnS</span>
                </p>
                <AiOutlineAlignRight className="ouline" />
            </div>
            <ul className="menu-text">
                <li onClick={clickHide}>
                    <NavLink to="/" className="text-menu home">
                        {' '}
                        <img src={menu1} className="iconMenu" />
                        <span>Trang chủ</span>
                    </NavLink>
                </li>
                {/* Cầm đồ */}
                {hasPermission(PERMISSIONS['Cầm Đồ']) && (
                    <li>
                        <NavLink to="/detaipawn" className="text-menu home">
                            {' '}
                            <img src={menu2} className="iconMenu" />
                            <span>Cầm đồ</span>
                        </NavLink>
                    </li>
                )}

                {/* Quản lý cửa hàng */}
                {hasPermission(PERMISSIONS['Quản Lý Cửa Hàng']) && (
                    <li>
                        <a className="text-menu home" onClick={clickShow}>
                            {' '}
                            <img src={menu3} className="iconMenu" />
                            <span>Quản lý cửa hàng</span>
                        </a>
                        {show1 && show1 ? (
                            <ul className={`submenu ${show1}`}>
                                <li className="subtext">
                                    <NavLink to="/chainstores">&#128900; Chuỗi cửa hàng</NavLink>
                                </li>
                                {/* <li className="subtext">
                                    <NavLink to="/detailsStore" className="subtext">
                                        &#128900; Chi tiết cửa hàng
                                    </NavLink>
                                </li> */}
                                <li className="subtext">
                                    <NavLink to="/liststore" className="subtext">
                                        &#128900; Danh sách cửa hàng
                                    </NavLink>
                                </li>
                                <li className="subtext">
                                    <NavLink to="/commodity" className="subtext">
                                        &#128900; Cấu hình hàng hóa
                                    </NavLink>
                                </li>
                                {/* <li className="subtext">
                                    <NavLink to="/money" className="subtext">
                                        &#128900; Nhập quỹ tiền mặt
                                    </NavLink>
                                </li> */}
                            </ul>
                        ) : (
                            <></>
                        )}
                    </li>
                )}

                {/* Quản lý kho */}
                {hasPermission(PERMISSIONS['Quản Lý Kho']) && (
                    <li>
                        <NavLink to="/warehouse" className="text-menu home">
                            {' '}
                            <img src={menu2} className="iconMenu" />
                            <span>Quản lý tài sản</span>
                        </NavLink>
                    </li>
                )}

                {/* Quản lý nhân viên */}
                {hasPermission(PERMISSIONS['Quản Lý Nhân Viên']) && (
                    <li>
                        <a className="text-menu home" onClick={clickShow1}>
                            <img src={menu5} className="iconMenu" />
                            <span>Quản lý nhân viên</span>
                        </a>
                        {show2 && (
                            <ul className={`submenu ${show1}`}>
                                <li className="subtext">
                                    <NavLink to="/listemployees">&#128900; Danh sách nhân viên</NavLink>
                                </li>
                                <li className="subtext">
                                    <NavLink to="/authorization" className="subtext">
                                        &#128900; Phân quyền nhân viên
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </li>
                )}

                {/* Quản lý khách hàng */}
                {hasPermission(PERMISSIONS['Quản Lý Khách Hàng']) && (
                    <li>
                        <NavLink to="/customer-manager" className="text-menu home">
                            <img src={menu6} className="iconMenu" />
                            <span>Quản lý khách hàng</span>
                        </NavLink>
                    </li>
                )}

                {/* Quản lý gói vay */}
                {authState.userName === 'Admin' && (
                    <li>
                        <NavLink to="/package" className="text-menu home">
                            <img src={menu6} className="iconMenu" />
                            <span>Quản lý gói vay</span>
                        </NavLink>
                    </li>
                )}

                {/* Báo cáo */}
                <li>
                    <NavLink to="/report-years" className="text-menu home">
                        <img src={menu7} className="iconMenu" />
                        <span>Báo cáo</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default NavMenu;
