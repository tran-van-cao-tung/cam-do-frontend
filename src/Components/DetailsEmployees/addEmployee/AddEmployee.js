import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ReplyIcon from '@mui/icons-material/Reply';
import "../listEmployees/employee.css";
import "./addemployee.css";
import PasswordInput from '../PasswordInput';


function AddEmployee() {
  const history = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [employeeInput, setEmployeeInput] = useState({
    /*  userId: "", */
    roleId: 0,
    branchId: 0,
    userName: "",
    password: "",
    email: "",
    fullName: "",
    address: "",
    phone: "",
    status: 0,
  });
  const [branch, setBranch] = useState([]);


  const handleInput = (e) => {
    e.persist();
    setEmployeeInput({ ...employeeInput, [e.target.name]: e.target.value });
  }
  const handlePasswordChange = event => {
    setConfirmPassword(event.target.value);
  };


  const handleSubmit = event => {
    event.preventDefault();
    if (employeeInput.password !== confirmPassword) {
      alert('Mật khẩu không trùng khớp!');
      return;
    }
    console.log(employeeInput.status);

    const data = {
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa2136",
      roleId: 0,
      branchId: 1,
      userName: employeeInput.userName,
      password: employeeInput.password,
      email: employeeInput.email,
      fullName: employeeInput.fullName,
      address: employeeInput.address,
      phone: employeeInput.phone,
      status: 0,
    }
    console.log(data)

    axios.post(`http://tranvancaotung-001-site1.ftempurl.com/api/v1/user`, data).then(res => {
      console.log("thêm thành công")
      console.log(res.data);
    }).catch((err) => console.log(err));

  };



  //đổ dữ liệu branch
  useEffect(() => {
    axios.get(`http://tranvancaotung-001-site1.ftempurl.com/api/v1/branch/chain`).then(res => {
      setBranch(res.data)
      console.log(res.data)
    })
  }, [])



  return (
    <div className="box_employee">
      <h1 className="employee_heading-add">Thêm mới nhân viên</h1>
      <div className='wareh-content'>

        <form onSubmit={handleSubmit}>
          <div className='employeeAdd'>
            <div className='employee_input'>
              <span>
                Họ và tên <span>*</span>:
              </span>
              <input type="text" name='fullName' onChange={(e) => handleInput(e)} value={employeeInput.fullName} />
            </div>
            <div className='employee_input'>
              <span>
                Tên cửa hàng <span>*</span>:
              </span>
              <select name='branchId' onChange={(e) => handleInput(e)} value={employeeInput.branchId}>
                {
                  branch.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>{item.branchName}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className='employee_input' >
              <span>
                Tên đăng nhập <span>*</span>:
              </span>
              <input type="text" name='userName' onChange={(e) => handleInput(e)} value={employeeInput.userName} />
            </div>
            <PasswordInput label="Mật hẩu" name="password" value={employeeInput.password} onChange={(e) => handleInput(e)} />
            <PasswordInput label="Nhập lại mật khẩu" name='confirmPassword' value={confirmPassword} onChange={handlePasswordChange} />
            <div className='employee_input'>
              <span>
                Email<span>*</span>:
              </span>
              <input type="text" name='email' onChange={(e) => handleInput(e)} value={employeeInput.email} />
            </div>
            <div className='employee_input'>
              <span>
                Địa chỉ <span>*</span>:
              </span>
              <input type="text" name='address' onChange={(e) => handleInput(e)} value={employeeInput.address} />
            </div>
            <div className='employee_input'>
              <span>
                Số điện thoại <span>*</span>:
              </span>
              <input type="text" name='phone' onChange={(e) => handleInput(e)} value={employeeInput.phone} />
            </div>
            <div className='employee_search employee_style-search'>
              <div className='employee_search-check employee_style-check'>
                <span className='employee_search-heading'>Tình trạng<span>*</span>:</span>
                <input type="radio" name='status' onChange={(e) => handleInput(e)} value='1' />
                <label className='check2'>Đang làm việc</label>
                <input type="radio" name='status' onChange={(e) => handleInput(e)} value='0' />
                <label className='check3'>Tạm khóa</label>
              </div >
            </div>
            <div className='employee-btn'>
              <div className='employee_btn-group' >
                <button className='employee_btn-item aqua' type='submit'><SaveAltIcon /><span>Lưu lại</span></button >
                <button className='employee_btn-item yellow' onClick={(e) => { history('/listemployees') }}><ReplyIcon /><span>Quay lại</span></button >
              </div >
            </div >
          </div >
        </form >
      </div>
    </div >

  )
}

export default AddEmployee