import React, { useEffect, useState } from 'react';

import '../listEmployees/employee.css';
import './addemployee.css';

import API from '../../../API';
import * as Yup from 'yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { Button } from '@mui/material';

import CustomizeDiaglog, { DIALOG_SIZE } from '../../../helpers/CustomizeDiaglog';
import { Save } from '@mui/icons-material';
import { toast } from 'react-toastify';

function AddEmployee({ showAddEmployee, setShowAddEmployee, refresh }) {
    const [confirmPassword, setConfirmPassword] = useState('');

    const [branch, setBranch] = useState([]);
    const [employee, setEmployee] = useState({
        roleId: 2,
        fullName: '',
        branchId: 0,
        userName: '',
        email: '',
        address: '',
        status: 1,
        phone: '',
        password: '',
    });
    //đổ dữ liệu branch
    useEffect(() => {
        if (branch != null) {
            API({
                method: 'get',
                url: `branch/getAll/0`,
            }).then((res) => {
                setBranch(res.data);
            });
        }
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
        branchId: Yup.string().required('Vui lòng chọn chi nhánh cửa hàng'),
    });

    // const onSubmit = (data) => {
    //     console.log(confirmPassword);
    //     if (data.password !== confirmPassword) {
    //         toast.error('Mật khẩu không trùng khớp!');
    //         return;
    //     }
    //     data.status = parseInt(data.status);
    //     data.branchId = parseInt(data.branchId);
    //     data.roleId = parseInt(data.roleId);
    //     // API({
    //     //     method: 'post',
    //     //     url: `user/createUser`,
    //     //     data: data,
    //     // }).then((res) => {
    //     //     toast.success('Thêm thành công!');
    //     // });
    // };

    const onSubmit = (event) => {
        event.preventDefault();
        if (employee.password !== confirmPassword) {
            toast.error('Mật khẩu không trùng khớp!');
            return;
        }
        const data = {
            userName: employee.userName,
            branchId: parseInt(employee.branchId),
            email: employee.email,
            fullName: employee.fullName,
            address: employee.address,
            phone: employee.phone,
            status: parseInt(employee.status),
            roleId: parseInt(employee.roleId),
            password: employee.password,
        };
        validationSchema
            .validate(data, { abortEarly: false })
            .then(() => {
                // console.log(data);
                API({
                    method: 'post',
                    url: `user/createUser`,
                    data: data,
                }).then((res) => {
                    toast.success('Thêm thành công!');
                    handleCloseDialog();
                    refresh();
                });
            })
            .catch((error) => {
                const errorMessages = error.inner.map((e) => e.message).join('. ');
                toast.warning(`${errorMessages}`);
            });
    };

    const handleInput = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const renderContent = () => (
        <form /* validationSchema={validationSchema} */ onSubmit={onSubmit}>
            <div className="employeeAdd">
                <div className="employee_input">
                    <span>
                        Họ và tên <span>*</span>:
                    </span>
                    {/* <Field id="fullName" name="fullName" onChange={(e) => handleInput(e)} value={employee.fullName}/> */}
                    <input type="text" name="fullName" onChange={(e) => handleInput(e)} value={employee.fullName} />
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
                        value={employee.branchId}
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
                <div className="employee_input">
                    <span>
                        Tên đăng nhập <span>*</span>:
                    </span>
                    {/* <Field id="userName" name="userName" onChange={(e) => handleInput(e)} value={employee.userName} /> */}
                    <input type="text" name="userName" onChange={(e) => handleInput(e)} value={employee.userName} />
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
                            onChange={(e) => handleInput(e)}
                            value={employee.password}
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
                    {/* <Field id="email" name="email" /> */}
                    <input type="text" name="email" onChange={(e) => handleInput(e)} value={employee.email} />
                </div>
                <div className="employee_input">
                    <span>
                        Địa chỉ <span>*</span>:
                    </span>
                    {/* <Field id="address" name="address" /> */}
                    <input type="text" name="address" onChange={(e) => handleInput(e)} value={employee.address} />
                </div>
                <div className="employee_input">
                    <span>
                        Số điện thoại <span>*</span>:
                    </span>
                    {/* <Field id="phone" name="phone" /> */}
                    <input type="text" name="phone" onChange={(e) => handleInput(e)} value={employee.phone} />
                </div>
                <div className="employee_input">
                    <span>
                        Chức vụ <span>*</span>:
                    </span>
                    <select
                        id="roleId"
                        name="roleId"
                        style={{
                            width: '576px',
                        }}
                        onChange={(e) => handleInput(e)}
                        value={employee.roleId}
                    >
                        <option value={2} selected>
                            --Quản lý--
                        </option>
                        <option value={3}>--Nhân viên--</option>
                    </select>
                </div>
            </div>
        </form>
    );
    const handleCloseDialog = () => {
        setShowAddEmployee(false);
    };
    return (
        <>
            <CustomizeDiaglog
                open={showAddEmployee}
                onClose={handleCloseDialog}
                title="Thêm Mới Nhân Viên"
                content={renderContent()}
                action={
                    <Button
                        onClick={(e) => onSubmit(e)}
                        variant="contained"
                        color="success"
                        sx={{
                            fontSize: '16px',
                            padding: '15px 30px',
                        }}
                        startIcon={<Save />}
                    >
                        Lưu Lại
                    </Button>
                }
                maxWidth={DIALOG_SIZE.md}
            />
        </>
    );
}

export default AddEmployee;
