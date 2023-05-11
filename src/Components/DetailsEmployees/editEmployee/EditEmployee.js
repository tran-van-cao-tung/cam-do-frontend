import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ReplyIcon from '@mui/icons-material/Reply';
import './editemployee.css';
import PasswordInput from '../PasswordInput';
import * as Yup from 'yup';
import API from '../../../API';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import Swal from 'sweetalert2';
import BtnSave from '../../ButtonUI/BtnSave/BtnSave';
import { Button } from '@mui/material';
import BtnCloseAnimation from '../../ButtonUI/BtnCloseAnimation/BtnCloseAnimation';

function EditEmployee() {
    const history = useNavigate();
    const [confirmPassword, setConfirmPassword] = useState('');
    const [listEmployees, setListEmployees] = useState([]);
    const [password, setPassword] = useState('');
    const [branch, setBranch] = useState([]);

    const validationSchema = Yup.object().shape({
        fullName: Yup.string()
            .required('Tên nhân viên không được để trống')
            .max(100, 'Tên nhân viên không được vượt quá 100 ký tự'),
        userName: Yup.string()
            .required('Tài khoản không được để trống')
            .max(30, 'Tài khoản không được vượt quá 30 ký tự'),
        password: Yup.string()
            .required('Mật khẩu không được để trống')
            .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/, 'Mật khẩu cần ít nhất 10 ký tự, bao gồm chữ và số'),
        address: Yup.string().max(200, 'Địa chỉ không được vượt quá 200 ký tự'),
        phone: Yup.string().matches(/^\+?\d{10,12}$/, 'Nhập đúng định dạng số điện thoại, 10 số'),
        email: Yup.string()
            .email('Nhập đúng định dạng email, ví dụ: example@gmail.com')
            .required('Email không được để trống'),
    });

    const id = useParams();

    const onSubmit = (event) => {
        event.preventDefault();
        const userId = id.id;
        const data = {
            userId: userId,
            roleId: 1,
            branchId: listEmployees.branchId,
            userName: listEmployees.userName,
            password: password,
            email: listEmployees.email,
            fullName: listEmployees.fullName,
            address: listEmployees.address,
            phone: listEmployees.phone,
            status: parseInt(listEmployees.status),
        };
        validationSchema
            .validate(data, { abortEarly: false })
            .then(() => {
                if (password !== confirmPassword) {
                    Swal.fire({
                        text: `Mật khẩu không trùng khớp!`,
                        icon: 'warning',
                    }).then((result) => {});
                    return;
                }
                data.status = parseInt(listEmployees.status);
                data.branchId = parseInt(listEmployees.branchId);
                API({
                    method: 'put',
                    url: `user/updateUser`,
                    data: data,
                }).then((res) => {
                    Swal.fire({
                        text: `Chỉnh sửa thành công!`,
                        icon: 'success',
                    }).then((result) => {});
                });
            })
            .catch((error) => {
                const errorMessages = error.inner.map((e) => e.message).join('. ');
                Swal.fire({
                    text: `${errorMessages}`,
                    icon: 'warning',
                }).then((result) => {});
            });
    };

    //Đổ dữ liệu user
    useEffect(() => {
        const slug = id.id;
        API({
            method: 'get',
            url: `user/getUserById/${slug}`,
        }).then((res) => {
            setListEmployees(res.data);
            /* setInitialValues(res.data) */
            console.log(res.data);
        });
    }, [id.id]);

    //đổ dữ liệu branch
    useEffect(() => {
        API({
            method: 'get',
            url: `branch/getChain`,
        }).then((res) => {
            setBranch(res.data);
        });
    }, []);

    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const toggleShowPassword1 = () => {
        setShowPassword1((prev) => !prev);
    };
    const toggleShowPassword2 = () => {
        setShowPassword2((prev) => !prev);
    };
    const handlePasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    /* const initialValue = {
        roleId: listEmployees.roleId,
        fullName: listEmployees.fullName,
        branchId: listEmployees?.branchId || '',
        userName: listEmployees?.userName || '',
        email: listEmployees?.email || '',
        address: listEmployees?.address || '',
        status: listEmployees?.status || '',
        phone: listEmployees?.phone || '',
        password: '',
    }; */

    /*     const handleInput = (e) => {
            e.persist();
            setListEmployees({ ...listEmployees, [e.target.name]: e.target.value });
        }; */
    const handleInput = (e) => {
        setListEmployees({ ...listEmployees, [e.target.name]: e.target.value });
    };
    return (
        <div className="box_employee">
            <h1 className="employee_heading-add">Cập nhật nhân viên</h1>
            <div className="wareh-content">
                <form /* validationSchema={validationSchema} */ onSubmit={onSubmit}>
                    <div className="employeeAdd">
                        <div className="employee_input">
                            <span>
                                Họ và tên <span>*</span>:
                            </span>
                            <input
                                type="text"
                                name="fullName"
                                onChange={(e) => handleInput(e)}
                                value={listEmployees.fullName}
                            />
                        </div>
                        <div className="employee_input">
                            <span>
                                Tên cửa hàng <span>*</span>:
                            </span>
                            <select
                                name="branchId"
                                onChange={(e) => {
                                    handleInput(e);
                                }}
                                value={listEmployees.branchId}
                                style={{
                                    width: '576px',
                                }}
                            >
                                <option>--Tên cửa hàng--</option>
                                {branch.map((item, index) => {
                                    return (
                                        <option key={index} value={item.branchId}>
                                            {item.branchName}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="employee_username">
                            <span>
                                Tên đăng nhập <span>*</span>:
                            </span>
                            <span>{listEmployees.userName}</span>
                        </div>
                        <div className="employee_input">
                            <span>
                                Mật khẩu<span>*</span>:
                            </span>
                            <div className="password-input">
                                <input
                                    type={showPassword1 ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                                <button type="button" onClick={toggleShowPassword1}>
                                    {showPassword1 ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </button>
                            </div>
                        </div>
                        <div className="employee_input">
                            <span>
                                Nhập lại mật khẩu<span>*</span>:
                            </span>
                            <div className="password-input">
                                <input
                                    type={showPassword2 ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    onChange={handlePasswordChange}
                                    value={confirmPassword}
                                />
                                <button type="button" onClick={toggleShowPassword2}>
                                    {showPassword2 ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </button>
                            </div>
                        </div>
                        <div className="employee_input">
                            <span>
                                Email<span>*</span>:
                            </span>
                            <input
                                type="text"
                                name="email"
                                onChange={(e) => handleInput(e)}
                                value={listEmployees.email}
                            />
                        </div>
                        <div className="employee_input">
                            <span>
                                Địa chỉ <span>*</span>:
                            </span>
                            <input
                                type="text"
                                name="address"
                                onChange={(e) => handleInput(e)}
                                value={listEmployees.address}
                            />
                        </div>
                        <div className="employee_input">
                            <span>
                                Số điện thoại <span>*</span>:
                            </span>
                            <input
                                type="text"
                                name="phone"
                                onChange={(e) => handleInput(e)}
                                value={listEmployees.phone}
                            />
                        </div>
                        <div className="employee_search employee_style-search">
                            <div className="employee_search-check employee_style-check">
                                <span className="employee_search-heading">
                                    Tình trạng<span>*</span>:
                                </span>
                                <input
                                    type="radio"
                                    name="status"
                                    value="1"
                                    onChange={handleInput}
                                    checked={listEmployees.status == 1 ? true : false}
                                />
                                {/* <input type="radio" name='status' onChange={(e) => handleInput(e)} value={1} /> */}
                                <label className="check2">Đang làm việc</label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="2"
                                    onChange={handleInput}
                                    checked={listEmployees.status == 2 ? true : false}
                                />
                                {/* <input type="radio" name='status' onChange={(e) => handleInput(e)} value="2" /> */}
                                <label className="check3">Tạm khóa</label>
                            </div>
                        </div>
                        <div className="employee-btn">
                            <div className="employee_btn-group">
                                <Button onClick={(e) => onSubmit(e)}>
                                    <BtnSave />
                                </Button>
                                <Button>
                                    <Link to="/listemployees">
                                        <BtnCloseAnimation />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditEmployee;
