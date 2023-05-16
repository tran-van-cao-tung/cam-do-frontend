import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ReplyIcon from '@mui/icons-material/Reply';
import '../listEmployees/employee.css';
import './addemployee.css';
import PasswordInput from '../PasswordInput';
import API from '../../../API';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Swal from 'sweetalert2';
import BtnCloseAnimation from '../../ButtonUI/BtnCloseAnimation/BtnCloseAnimation';
import { Button } from '@mui/material';
import BtnSave from '../../ButtonUI/BtnSave/BtnSave';

function AddEmployee() {
    const [confirmPassword, setConfirmPassword] = useState('');
    /*  const [password, setPassword] = useState(''); */
    const [branch, setBranch] = useState([]);
    const [branchList, setBranchList] = useState([]);

    //đổ dữ liệu branch
    useEffect(() => {
        if(branch != null){
            API({
                method: 'get',
                url: `branch/getAll/0`,
            }).then((res) => {
                setBranch(res.data)
            });
        }
        
    }, [branch]);

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

    const initialValues = {
        roleId: 1,
        fullName: '',
        branchId: 0,
        userName: '',
        email: '',
        address: '',
        status: 1,
        phone: '',
        password: '',
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

    const onSubmit = (data) => {
        if (data.password !== confirmPassword) {
            Swal.fire({
                text: 'Mật khẩu không trùng khớp!',
                icon: 'warning',
            }).then((result) => {});
            return;
        }
        data.status = parseInt(data.status);
        data.branchId = parseInt(data.branchId);
        data.roleId = parseInt(data.roleId);
        API({
            method: 'post',
            url: `user/createUser`,
            data: data,
        }).then((res) => {
            alert('thêm thành công!');
            console.log(data);
        });
    };

    //đổ dữ liệu branch
    useEffect(() => {
        API({
            method: 'get',
            url: `branch/getChain`,
        }).then((res) => {
            setBranch(res.data);
        });
    }, []);

    return (
        <div className="box_employee">
            <h1 className="employee_heading-add">Thêm mới nhân viên</h1>
            <div className="wareh-content">
                <Formik initialValues={initialValues} /* validationSchema={validationSchema} */ onSubmit={onSubmit}>
                    <Form>
                        <div className="employeeAdd">
                            <div className="employee_input">
                                <span>
                                    Họ và tên <span>*</span>:
                                </span>
                                <Field id="fullName" name="fullName" />
                                {/* <input type="text" name='fullName' onChange={(e) => handleInput(e)} value={employeeInput.fullName} /> */}
                            </div>
                            <ErrorMessage name="fullName" className="alert alert-danger" component="div" />
                            <div className="employee_input">
                                <span>
                                    Tên cửa hàng <span>*</span>:
                                </span>
                                <Field
                                    as="select"
                                    id="branchId"
                                    name="branchId"
                                    style={{
                                        width: '576px',
                                    }} /* onChange={(e) => handleInput(e)} value={employeeInput.branchId} */
                                >
                                    <option>--Tên cửa hàng--</option>
                                    {branch.map((item, index) => {
                                        return (
                                            <option key={index} value={item.branchId}>
                                                {item.branchName}
                                            </option>
                                        );
                                    })}
                                </Field>
                            </div>
                            <ErrorMessage className="alert alert-danger" name="branchId" component="div" />
                            <div className="employee_input">
                                <span>
                                    Tên đăng nhập <span>*</span>:
                                </span>
                                <Field id="userName" name="userName" />
                                {/* <input type="text" name='userName' onChange={(e) => handleInput(e)} value={employeeInput.userName} /> */}
                            </div>
                            <ErrorMessage className="alert alert-danger" name="userName" component="div" />
                            <div className="employee_input">
                                <span>
                                    Mật khẩu<span>*</span>:
                                </span>
                                <div className="password-input">
                                    <Field type={showPassword1 ? 'text' : 'password'} id="password" name="password" />
                                    <button type="button" onClick={toggleShowPassword1}>
                                        {showPassword1 ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </button>
                                </div>
                            </div>
                            <ErrorMessage name="password" className="alert alert-danger" component="div" />
                            <div className="employee_input">
                                <span>
                                    Nhập lại mật khẩu<span>*</span>:
                                </span>
                                <div className="password-input">
                                    <Field
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
                                <Field id="email" name="email" />
                                {/* <input type="text" name='email' onChange={(e) => handleInput(e)} value={employeeInput.email} /> */}
                            </div>
                            <ErrorMessage name="email" className="alert alert-danger" component="div" />
                            <div className="employee_input">
                                <span>
                                    Địa chỉ <span>*</span>:
                                </span>
                                <Field id="address" name="address" />
                                {/*  <input type="text" name='address' onChange={(e) => handleInput(e)} value={employeeInput.address} /> */}
                            </div>
                            <ErrorMessage name="address" className="alert alert-danger" component="div" />
                            <div className="employee_input">
                                <span>
                                    Số điện thoại <span>*</span>:
                                </span>
                                <Field id="phone" name="phone" />
                                {/*  <input type="text" name='phone' onChange={(e) => handleInput(e)} value={employeeInput.phone} /> */}
                            </div>
                            <ErrorMessage name="phone" className="alert alert-danger" component="div" />
                            <div className="employee_input">
                                <span>
                                   Chức vụ <span>*</span>:
                                </span>
                                <Field
                                    as="select"
                                    id="roleId"
                                    name="roleId"
                                    style={{
                                        width: '576px',
                                    }} /* onChange={(e) => handleInput(e)} value={employeeInput.branchId} */
                                >
                                    <option value={2} selected>--Quản lý--</option>
                                    <option value={3}>--Nhân viên--</option>
                                </Field>
                            </div>
                            <div className="employee-btn">
                                <div className="employee_btn-group">
                                    <Button type="submit">
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
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default AddEmployee;
