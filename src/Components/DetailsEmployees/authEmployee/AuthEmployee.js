import React, { useEffect, useState } from 'react'
import { styled } from "@mui/material/styles";
import { Grid, Paper } from '@mui/material'
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import ReplyIcon from '@mui/icons-material/Reply';
import { useNavigate } from 'react-router-dom';
import file from '../../../asset/img/file.png'
import './authemployee.css'
import axios from 'axios';

function AuthEmployee() {
    const history = useNavigate();
    const [employeeList, setEmployeeList] = useState([]);

    // Axios
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://tranvancaotung-001-site1.ftempurl.com/api/v1/user/getAll/1',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            },
        }).then((res) => {
            setEmployeeList(res.data[0].fullName);
            // console.log('aaaaa', res.data);
        });
    }, []);

    //Cầm đồ
    const [checkedPlus, setCheckPlus] = useState(false);
    const [textPlus, setTextPlus] = useState('+');
    const [parentCheckbox, setParentCheckbox] = useState(false);

    const [childCheckboxes, setChildCheckboxes] = useState([
        { id: 1, label: 'Xem thông tin quỹ tiền mặt, tiền đang vay, lãi dự kiến, lãi đã thu.', isChecked: false },
        { id: 2, label: 'Xem danh sách hợp đồng', isChecked: false },
        { id: 3, label: 'Tạo mới hợp đồng', isChecked: false },
        { id: 4, label: 'Sửa hợp đồng', isChecked: false },
        { id: 5, label: 'Xóa hợp đồng', isChecked: false },
        { id: 6, label: 'Đóng tiền lãi', isChecked: false },
        { id: 7, label: 'Trả bớt gốc', isChecked: false },
        { id: 8, label: 'Up chứng từ', isChecked: false },
        { id: 9, label: 'Gia hạn', isChecked: false },
        { id: 10, label: 'Nợ', isChecked: false },
        { id: 11, label: 'Chuộc đồ', isChecked: false },
        { id: 12, label: 'Lịch sử', isChecked: false },
    ]);

    //Quản lý cửa hàng
    const [textPlus2, setTextPlus2] = useState('+');
    const [checkedPlus2, setCheckPlus2] = useState(false);
    const [parentCheckbox2, setParentCheckbox2] = useState(false);
    const [childCheckboxes2, setChildCheckboxes2] = useState([
        { id: 1, label: 'Chuỗi cửa hàng', isChecked: false },
        { id: 2, label: 'Chi tiết cửa hàng', isChecked: false },
        { id: 3, label: 'Danh sách cửa hàng', isChecked: false },
        { id: 4, label: 'Cấu hình hàng hóa', isChecked: false },
        { id: 5, label: 'Tiền quỹ đầu ngày', isChecked: false },
    ]);


    //Quản lý kho
    const [textPlus3, setTextPlus3] = useState('+');
    const [checkedPlus3, setCheckPlus3] = useState(false);
    const [parentCheckbox3, setParentCheckbox3] = useState(false);
    const [childCheckboxes3, setChildCheckboxes3] = useState([
        { id: 1, label: 'Thêm mới kho', isChecked: false },
        { id: 2, label: 'Xem thông tin danh sách kho', isChecked: false },
    ]);

    //Quản lý nhân viên
    const [textPlus4, setTextPlus4] = useState('+');
    const [checkedPlus4, setCheckPlus4] = useState(false);
    const [parentCheckbox4, setParentCheckbox4] = useState(false);

    //Quản lý khách hàng
    const [textPlus5, setTextPlus5] = useState('+');
    const [checkedPlus5, setCheckPlus5] = useState(false);
    const [parentCheckbox5, setParentCheckbox5] = useState(false);


    //Check Cầm Đồ
    const handleCheckbox1 = (event) => {
        setParentCheckbox(event.target.checked);
        setChildCheckboxes(
            childCheckboxes.map((checkbox) => ({
                ...checkbox,
                isChecked: event.target.checked,
            }))
        );
    };

    const handleChildCheckboxChange = (event) => {
        const { id, checked } = event.target;
        setChildCheckboxes(
            childCheckboxes.map((checkbox) =>
                checkbox.id == id ? { ...checkbox, isChecked: checked } : checkbox
            )
        );
        setParentCheckbox(
            childCheckboxes.every((checkbox) => checkbox.isChecked)
        );
    };
    const handleCheckPlus = (e) => {
        if (e.target.innerHTML == '+') {
            setTextPlus('-')
        }
        else {
            setTextPlus('+')
        }
        setCheckPlus(!checkedPlus);
    }

    let children = "";
    if (checkedPlus) {
        children = (
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3, alignItems: "start", justifyContent: "start" }}>
                {
                    childCheckboxes.map((checkbox) => {
                        return (
                            <div key={checkbox.id.toString()} className="checkbox-container">
                                <FormControlLabel
                                    control={<Checkbox checked={checkbox.isChecked}
                                        onChange={handleChildCheckboxChange}
                                        id={checkbox.id.toString()}
                                    />}
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 44, padding: "0 0 15px 0" } }}
                                />
                                <img src={file} alt='file'
                                    className='img_file' />
                                <span>{checkbox.label}</span>
                            </div>
                        )
                    })
                }
            </Box>
        );
    }

    //Check quản lý cửa hàng
    const handleCheckbox2 = (event) => {
        setParentCheckbox2(event.target.checked);
        setChildCheckboxes2(
            childCheckboxes2.map((checkbox) => ({
                ...checkbox,
                isChecked: event.target.checked,
            }))
        );
    };

    const handleChildCheckboxChange2 = (event) => {
        const { id, checked } = event.target;
        setChildCheckboxes2(
            childCheckboxes2.map((checkbox) =>
                checkbox.id == id ? { ...checkbox, isChecked: checked } : checkbox
            )
        );
        setParentCheckbox2(
            childCheckboxes2.every((checkbox) => checkbox.isChecked)
        );
    };

    const handleCheckPlus2 = (e) => {
        if (e.target.innerHTML == '+') {
            setTextPlus2('-')
        }
        else {
            setTextPlus2('+')
        }
        setCheckPlus2(!checkedPlus2);
    }


    let children2 = "";
    if (checkedPlus2) {
        children2 = (
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3, alignItems: "start", justifyContent: "start" }}>
                {
                    childCheckboxes2.map((checkbox) => {
                        return (
                            <div key={checkbox.id.toString()} className="checkbox-container">
                                <FormControlLabel
                                    control={<Checkbox checked={checkbox.isChecked}
                                        onChange={handleChildCheckboxChange2}
                                        id={checkbox.id.toString()}
                                    />}
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 44, padding: "0 0 15px 0" } }}
                                />
                                <img src={file} alt='file'
                                    className='img_file' />
                                <span>{checkbox.label}</span>
                            </div>
                        )
                    })
                }
            </Box>
        );
    }


    //Check quản lý kho
    const handleCheckbox3 = (event) => {
        setParentCheckbox3(event.target.checked);
        setChildCheckboxes3(
            childCheckboxes3.map((checkbox) => ({
                ...checkbox,
                isChecked: event.target.checked,
            }))
        );
    };

    const handleChildCheckboxChange3 = (event) => {
        const { id, checked } = event.target;
        setChildCheckboxes3(
            childCheckboxes3.map((checkbox) =>
                checkbox.id == id ? { ...checkbox, isChecked: checked } : checkbox
            )
        );
        setParentCheckbox3(
            childCheckboxes3.every((checkbox) => checkbox.isChecked)
        );
    };

    const handleCheckPlus3 = (e) => {
        if (e.target.innerHTML == '+') {
            setTextPlus3('-')
        }
        else {
            setTextPlus3('+')
        }
        setCheckPlus3(!checkedPlus3);
    }

    let children3 = "";
    if (checkedPlus3) {
        children3 = (
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3, alignItems: "start", justifyContent: "start" }}>
                {
                    childCheckboxes3.map((checkbox) => {
                        return (
                            <div key={checkbox.id.toString()} className="checkbox-container">
                                <FormControlLabel
                                    control={<Checkbox checked={checkbox.isChecked}
                                        onChange={handleChildCheckboxChange3}
                                        id={checkbox.id.toString()}
                                    />}
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 44, padding: "0 0 15px 0" } }}
                                />
                                <img src={file} alt='file'
                                    className='img_file' />
                                <span>{checkbox.label}</span>
                            </div>
                        )
                    })
                }
            </Box>
        );
    }


    //Check quản lý nhân viên
    const handleCheckbox4 = (event) => {
        setParentCheckbox4(event.target.checked);
    };


    const handleCheckPlus4 = (e) => {
        if (e.target.innerHTML == '+') {
            setTextPlus4('-')
        }
        else {
            setTextPlus4('+')
        }
        setCheckPlus4(!checkedPlus4);
    }

    //Check quản lý khách hàng
    const handleCheckbox5 = (event) => {
        setParentCheckbox5(event.target.checked);
    };


    const handleCheckPlus5 = (e) => {
        if (e.target.innerHTML == '+') {
            setTextPlus5('-')
        }
        else {
            setTextPlus5('+')
        }
        setCheckPlus5(!checkedPlus5);
    }




    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: "22px 19px 22px 27px",
        borderRadius: "10px",
        color: theme.palette.text.secondary,
    }));


    return (
        <div className="box_employee">
            <h1 className="employee_heading-add">Phân quyền nhân viên</h1>
            <Grid container spacing={2} >
                <Grid item xs={12}>
                    <Item>
                        <div className="auth_input">
                            <div className='auth_input-group'>
                                <div className='auth_input-item'>
                                    <span>
                                        Cửa hàng <span className='auth_input-star'>*</span>:
                                    </span>
                                    <select>
                                        <option>S1</option>
                                        <option>S2</option>
                                        <option>S3</option>
                                    </select>
                                </div>
                                <div className='auth_input-item'>
                                    <span>
                                        Nhân viên <span className='auth_input-star'>*</span>:
                                    </span>
                                    <select>
                                        <option>nguyenvana</option>
                                        <option>S2</option>
                                        <option>S3</option>
                                    </select>
                                </div>
                            </div >
                            <div className='employee_btn-group' style={{ marginLeft: "10%" }} >
                                <button type='submit' className='employee_btn-item auth_btn-item aqua'><SaveAltIcon /><span>Lưu lại</span></button >
                                <button className='employee_btn-item auth_btn-item yellow' onClick={() => { history('/listemployees') }}><ReplyIcon /><span>Quay lại</span></button >
                            </div >
                        </div >
                        <div className=''>
                            <div className='auth_input-group'>
                                <div className='auth_check'>
                                    <span>
                                        Phân quyền:
                                    </span>
                                    <div style={{ display: 'block' }}>
                                        <div className='auth_check-item' >
                                            <div className='auth_check-plus'
                                                onClick={e => handleCheckPlus(e)}>{textPlus}</div>
                                            <div className="checkbox-container">
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={parentCheckbox}
                                                            onChange={handleCheckbox1}
                                                            indeterminate={
                                                                childCheckboxes.some((checkbox) => checkbox.isChecked) &&
                                                                !parentCheckbox
                                                            }
                                                        />
                                                    }
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 44, padding: "0 0 15px 0" } }}

                                                />
                                                <img src={file} alt='file'
                                                    className='img_file' />
                                                <span >Cầm đồ</span>
                                                {children}
                                            </div>
                                        </div>
                                        <div className='auth_check-item' >
                                            <div className='auth_check-plus'
                                                onClick={e => handleCheckPlus2(e)}>{textPlus2}</div>
                                            <div className="checkbox-container">
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={parentCheckbox2}
                                                            onChange={handleCheckbox2}
                                                            indeterminate={
                                                                childCheckboxes2.some((checkbox) => checkbox.isChecked) &&
                                                                !parentCheckbox2
                                                            }
                                                        />
                                                    }
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 44, padding: "0 0 15px 0" } }}

                                                />
                                                <img src={file} alt='file'
                                                    className='img_file' />
                                                <span >Quản lý cửa hàng</span>
                                                {children2}
                                            </div>
                                        </div>
                                        <div className='auth_check-item' >
                                            <div className='auth_check-plus'
                                                onClick={e => handleCheckPlus3(e)}>{textPlus3}</div>
                                            <div className="checkbox-container">
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={parentCheckbox3}
                                                            onChange={handleCheckbox3}
                                                            indeterminate={
                                                                childCheckboxes3.some((checkbox) => checkbox.isChecked) &&
                                                                !parentCheckbox3
                                                            }
                                                        />
                                                    }
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 44, padding: "0 0 15px 0" } }}

                                                />
                                                <img src={file} alt='file'
                                                    className='img_file' />
                                                <span >Quản lý kho</span>
                                                {children3}
                                            </div>
                                        </div>
                                    </div >
                                    <div className={{ style: 'block' }}>
                                        <div className='auth_check-item' >
                                            <div className='auth_check-plus'
                                                onClick={e => handleCheckPlus4(e)}>{textPlus4}</div>
                                            <div className="checkbox-container">
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={parentCheckbox4}
                                                            onChange={handleCheckbox4}
                                                        />
                                                    }
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 44, padding: "0 0 15px 0" } }}

                                                />
                                                <img src={file} alt='file'
                                                    className='img_file' />
                                                <span >Quản lý nhân viên</span>
                                            </div>
                                        </div>
                                        <div className='auth_check-item' >
                                            <div className='auth_check-plus'
                                                onClick={e => handleCheckPlus5(e)}>{textPlus5}</div>
                                            <div className="checkbox-container">
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={parentCheckbox5}
                                                            onChange={handleCheckbox5}
                                                        />
                                                    }
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 44, padding: "0 0 15px 0" } }}

                                                />
                                                <img src={file} alt='file'
                                                    className='img_file' />
                                                <span >Quản lý khách hàng</span>
                                            </div>
                                        </div>
                                    </div >
                                </div>

                            </div>
                        </div >
                    </Item>
                </Grid>
            </Grid>
        </div >
    )
}

export default AuthEmployee