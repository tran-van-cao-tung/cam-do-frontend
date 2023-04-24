import React, { useEffect, useState } from 'react'
import callAPI from '../../API';
import * as Yup from 'yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ReplyIcon from '@mui/icons-material/Reply';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField } from '@mui/material';
import Swal from 'sweetalert2';


function Profile() {
    const history = useNavigate();
    const [branch, setBranch] = useState([]);
    const [listEmployees, setListEmployees] = useState([]);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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

    const onSubmit = (e) => {
        e.preventDefault();
        const data = {
            roleId: 1,
            userId: localStorage.getItem('userId'),
            fullName: listEmployees.fullName,
            branchId: listEmployees.branchId,
            userName: listEmployees.userName,
            email: listEmployees.email,
            address: listEmployees.address,
            status: listEmployees.status,
            phone: listEmployees.phone,
            password: password,
        }
        console.log(data)
        validationSchema.validate(data, { abortEarly: false })
            .then(() => {
                if (password !== confirmPassword) {
                    Swal.fire({
                        text: `Mật khẩu không trùng khớp!`,
                        icon: 'warning',
                    }).then((result) => {
                    })
                    return;
                }
                data.status = parseInt(listEmployees.status);
                data.branchId = parseInt(listEmployees.branchId);
                callAPI({
                    method: 'put',
                    url: `user/updateUser`,
                    data: data,
                }).then((res) => {
                    Swal.fire({
                        text: `Chỉnh sửa thành công!`,
                        icon: 'success',
                    }).then((result) => {
                    })
                });
            })
            .catch((error) => {
                const errorMessages = error.inner.map(e => e.message).join('. ');
                Swal.fire({
                    text: `${errorMessages}`,
                    icon: 'warning',
                }).then((result) => {
                })
            });
    };
    //đổ dữ liệu branch
    useEffect(() => {
        callAPI({
            method: 'get',
            url: `branch/getChain`,
        }).then((res) => {
            setBranch(res.data);
        });
    }, []);
    //Đổ dữ liệu user
    useEffect(() => {
        callAPI({
            method: 'get',
            url: `user/getUserById/${localStorage.getItem('userId')}`,
        }).then((res) => {
            setListEmployees(res.data);
            /* setInitialValues(res.data) */
            console.log(res.data);
        });
    }, []);

    const handleInput = (e) => {
        setListEmployees({ ...listEmployees, [e.target.name]: e.target.value });
    }
    console.log(listEmployees)

    return (
        <div className="box_employee">
            <h1 className="employee_heading-add">Thông tin cá nhân</h1>
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
                                placeholder={listEmployees.fullName}
                            />
                        </div>
                        <div className="employee_input">
                            <span>
                                Tên cửa hàng <span>*</span>:
                            </span>
                            <select name='branchId' onChange={(e) => { handleInput(e) }} value={listEmployees.branchId} style={{
                                width: '576px',
                            }}>
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
                                <input type={showPassword1 ? 'text' : 'password'} id="password" name="password" onChange={(e) => { setPassword(e.target.value) }} />
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
                                placeholder={listEmployees.email}
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
                                placeholder={listEmployees.address}
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
                                placeholder={listEmployees.phone}
                            />
                        </div>
                        <div className="employee-btn">
                            <div className="employee_btn-group">
                                <button className="employee_btn-item aqua" type="submit">
                                    <SaveAltIcon />
                                    <span>Lưu lại</span>
                                </button>
                                <button
                                    className="employee_btn-item yellow"
                                    onClick={() => {
                                        history('/listemployees');
                                    }}
                                >
                                    <ReplyIcon />
                                    <span>Quay lại</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default Profile