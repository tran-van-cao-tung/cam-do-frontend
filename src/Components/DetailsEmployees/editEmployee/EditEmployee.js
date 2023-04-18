import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ReplyIcon from '@mui/icons-material/Reply';
import './editemployee.css';
import PasswordInput from '../PasswordInput';
import * as Yup from 'yup';
import API from '../../../API';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { Formik, Field, Form, ErrorMessage } from 'formik';

function EditEmployee() {
    const history = useNavigate();
    const [confirmPassword, setConfirmPassword] = useState('');
    const [listEmployees, setListEmployees] = useState([]);
    const [branch, setBranch] = useState([]);
    /* const [listEmployees,setListEmployees] = useState({
        fullName: '',
        userName: '',
        password: '',
        email: '',
        address: '',
        phone: '',
        branchId: '',
        roleId: '',
        status: '',
    }); */

    const id = useParams();

    /* const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Mật khẩu không trùng khớp!');
            return;
        }
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
        callAPI({
            method: 'put',
            url: `user/updateUser`,
            data: data,
        }).then((res) => {
            alert('Chỉnh sửa Thành công!');
        });
    }; */

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

    const initialValue = {
        roleId: listEmployees.roleId,
        fullName: listEmployees.fullName,
        branchId: listEmployees?.branchId || '',
        userName: listEmployees?.userName || '',
        email: listEmployees?.email || '',
        address: listEmployees?.address || '',
        status: listEmployees?.status || '',
        phone: listEmployees?.phone || '',
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
    });

    const onSubmit = (data) => {
        if (data.password !== confirmPassword) {
            alert('Mật khẩu không trùng khớp!');
            return;
        }
        data.status = parseInt(data.status);
        API({
            method: 'post',
            url: `user/createUser`,
            data: data,
        }).then((res) => {
            alert('thêm thành công!');
        });
    };

    /*     const handleInput = (e) => {
            e.persist();
            setListEmployees({ ...listEmployees, [e.target.name]: e.target.value });
        }; */

    return (
        <div className="box_employee">
            <h1 className="employee_heading-add">Cập nhật nhân viên</h1>
            <div className="wareh-content">
                <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={onSubmit}>
                    return (
                    <div className="employeeAdd">
                        <div className="employee_input">
                            <span>
                                Họ và tên <span>*</span>:
                            </span>
                            <Field name="fullName" value={listEmployees.fullName} /* onChange={handleInput} */ />
                            {/* <input
                                    type="text"
                                    name="fullName"
                                    onChange={(e) => handleInput(e)}
                                    value={listEmployees.fullName}
                                /> */}
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
                        </div>
                        <ErrorMessage name="email" className="alert alert-danger" component="div" />
                        <div className="employee_input">
                            <span>
                                Địa chỉ <span>*</span>:
                            </span>
                            <Field id="address" name="address" />
                        </div>
                        <ErrorMessage name="address" className="alert alert-danger" component="div" />
                        <div className="employee_input">
                            <span>
                                Số điện thoại <span>*</span>:
                            </span>
                            <Field id="phone" name="phone" />
                        </div>
                        <ErrorMessage name="phone" className="alert alert-danger" component="div" />
                        <div className="employee_search employee_style-search">
                            <div className="employee_search-check employee_style-check">
                                <span className="employee_search-heading">
                                    Tình trạng<span>*</span>:
                                </span>
                                <Field type="radio" name="status" value="1" checked />
                                <label className="check2">Đang làm việc</label>
                                <Field type="radio" name="status" value="2" />
                                <label className="check3">Tạm khóa</label>
                            </div>
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
                    )
                </Formik>
            </div>
        </div>
    );
}

export default EditEmployee;
