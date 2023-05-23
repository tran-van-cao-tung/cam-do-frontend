import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './editemployee.css';
import * as Yup from 'yup';
import API from '../../../API';

import BtnSave from '../../ButtonUI/BtnSave/BtnSave';
import { Button } from '@mui/material';
import BtnCloseAnimation from '../../ButtonUI/BtnCloseAnimation/BtnCloseAnimation';
import { toast } from 'react-toastify';
import PageHeader from '../../../helpers/PageHeader';

const validationSchema = Yup.object().shape({
    fullName: Yup.string()
        .required('Tên nhân viên không được để trống')
        .max(100, 'Tên nhân viên không được vượt quá 100 ký tự'),
    address: Yup.string().max(200, 'Địa chỉ không được vượt quá 200 ký tự'),
    phone: Yup.string().matches(/^\+?\d{10,12}$/, 'Nhập đúng định dạng số điện thoại, 10 số'),
    email: Yup.string()
        .email('Nhập đúng định dạng email, ví dụ: example@gmail.com')
        .required('Email không được để trống'),
});

function EditEmployee() {
    const history = useNavigate();
    const [employee, setEmployee] = useState({
        fullName: '',
        branchId: null,
        email: '',
        address: '',
        phone: '',
    });
    const id = useParams();

    const onSubmit = (event) => {
        event.preventDefault();
        const userId = id.id;
        const data = {
            userId: userId,
            branchId: employee.branchId,
            email: employee.email,
            fullName: employee.fullName,
            address: employee.address,
            phone: employee.phone,
            status: parseInt(employee.status),
        };
        validationSchema
            .validate(data, { abortEarly: false })
            .then(() => {
                data.status = parseInt(employee.status);
                data.branchId = parseInt(employee.branchId);
                API({
                    method: 'put',
                    url: `user/updateUser`,
                    data: data,
                }).then((res) => {
                    toast.success('Chỉnh sửa thành công!');
                });
            })
            .catch((error) => {
                const errorMessages = error.inner.map((e) => e.message).join('. ');
                toast.warning(`${errorMessages}`);
            });
    };

    //Đổ dữ liệu user
    useEffect(() => {
        const slug = id.id;
        API({
            method: 'get',
            url: `user/getUserById/${slug}`,
        }).then((res) => {
            setEmployee({
                ...res.data,
                fullName: res.data.fullName,
                email: res.data.email,
                address: res.data.address,
                phone: res.data.phone,
                branchId: res.data.userBranches[0].branchId,
            });
        });
    }, [id.id]);

    const handleInput = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const [branches, setBranches] = useState([]);

    useEffect(() => {
        API({
            method: 'get',
            url: `/branch/getAll/0`,
        }).then((res) => {
            setBranches(res.data);
        });
    }, []);

    const branchOptions = useMemo(() => {
        return branches;
    }, [branches]);

    return (
        <div className="box_employee">
            <PageHeader title="Cập nhật nhân viên" />

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
                                value={employee.fullName}
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
                                value={employee.branchId}
                                style={{
                                    width: '576px',
                                }}
                            >
                                <option>--Tên cửa hàng--</option>
                                {branchOptions.map((item, index) => {
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
                                Tên đăng nhập<span>*</span>:
                            </span>
                            <input type="text" name="username" disabled value={employee.userName} />
                        </div>
                        <div className="employee_input">
                            <span>
                                Email<span>*</span>:
                            </span>
                            <input type="text" name="email" onChange={(e) => handleInput(e)} value={employee.email} />
                        </div>
                        <div className="employee_input">
                            <span>
                                Địa chỉ <span>*</span>:
                            </span>
                            <input
                                type="text"
                                name="address"
                                onChange={(e) => handleInput(e)}
                                value={employee.address}
                            />
                        </div>
                        <div className="employee_input">
                            <span>
                                Số điện thoại <span>*</span>:
                            </span>
                            <input type="text" name="phone" onChange={(e) => handleInput(e)} value={employee.phone} />
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
                                    checked={employee.status == 1 ? true : false}
                                />
                                {/* <input type="radio" name='status' onChange={(e) => handleInput(e)} value={1} /> */}
                                <label className="check2">Đang làm việc</label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="2"
                                    onChange={handleInput}
                                    checked={employee.status == 2 ? true : false}
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
