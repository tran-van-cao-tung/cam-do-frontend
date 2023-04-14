import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ReplyIcon from '@mui/icons-material/Reply';
import './editemployee.css';
import PasswordInput from '../PasswordInput';
import axios from 'axios';
import callAPI from '../../../API';

function EditEmployee() {
    const history = useNavigate();
    const [confirmPassword, setConfirmPassword] = useState('');
    const [listEmployees, setListEmployees] = useState([]);
    const [branch, setBranch] = useState([]);

    const id = useParams();

    const handlePasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (listEmployees.password !== confirmPassword) {
            alert('Mật khẩu không trùng khớp!');
            return;
        }
        const userId = id.id;
        const data = {
            userId: userId,
            roleId: 1,
            branchId: listEmployees.branchId,
            userName: listEmployees.userName,
            password: listEmployees.password,
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
    };

    //Đổ dữ liệu user
    useEffect(() => {
        const slug = id.id;
        callAPI({
            method: 'get',
            url: `user/getUserById/${slug}`,
        }).then((res) => {
            setListEmployees(res.data);
        });
    }, [id.id]);

    //đổ dữ liệu branch
    useEffect(() => {
        callAPI({
            method: 'get',
            url: `branch/getChain`,
        }).then((res) => {
            setBranch(res.data);
        });
    }, []);

    const handleInput = (e) => {
        e.persist();
        setListEmployees({ ...listEmployees, [e.target.name]: e.target.value });
    };

    return (
        <div className="box_employee">
            <h1 className="employee_heading-add">Cập nhật nhân viên</h1>
            <div className="wareh-content">
                <form onSubmit={handleSubmit}>
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
                                style={{ width: '576px' }}
                                onChange={(e) => handleInput(e)}
                                value={listEmployees.branchId}
                            >
                                <option>Tên cửa hàng</option>
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
                        <PasswordInput
                            label="Mật hẩu"
                            name="password"
                            value={listEmployees.password}
                            onChange={(e) => handleInput(e)}
                        />
                        <PasswordInput
                            label="Nhập lại mật khẩu"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handlePasswordChange}
                        />
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
                                <input type="radio" name="status" onChange={(e) => handleInput(e)} value={1} />
                                <label className="check2">Đang làm việc</label>
                                <input type="radio" name="status" onChange={(e) => handleInput(e)} value={2} />
                                <label className="check3">Tạm khóa</label>
                            </div>
                        </div>
                        <div className="employee-btn">
                            <div className="employee_btn-group">
                                <button type="submit" className="employee_btn-item aqua">
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
        </div>
    );
}

export default EditEmployee;
