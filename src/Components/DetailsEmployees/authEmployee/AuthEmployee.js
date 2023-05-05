import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Grid, Paper } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import ReplyIcon from '@mui/icons-material/Reply';
import { Link, useNavigate } from 'react-router-dom';
import file from '../../../asset/img/file.png';
import './authemployee.css';
import API from '../../../API';
import BtnSave from '../../ButtonUI/BtnSave/BtnSave';
import BtnCloseAnimation from '../../ButtonUI/BtnCloseAnimation/BtnCloseAnimation';
import { AuthContext } from '../../../helpers/AuthContext';
function AuthEmployee() {
    const history = useNavigate();
    const [employeeList, setEmployeeList] = useState([]);
    const [employeePermission, setEmployeePermission] = useState([]);
    const [value, setValue] = useState();

    const { permissions } = useContext(AuthContext);

    const updateValue = ({ target }) => {
        setValue(target.value);
    };
    // Axios
    useEffect(() => {
        API({
            method: 'get',
            url: '/user/getAll/0',
        }).then((res) => {
            setEmployeeList(res.data);
            // console.log('aaaaa', res.data);
        });
    }, []);

    function getPermission(e) {
        updateValue(e);
        console.log('log at get permission', e.target.value);
        sessionStorage.setItem('selected', e.target.value);
        // setEmployeeList(e.target.value);
        API({
            method: 'post',
            url: '/permission/showpermission',
            data: {
                userId: e.target.value,
                nameUser: 'string',
            },
        }).then((res) => {
            setEmployeePermission(res.data);
            for (let i = 0; i < 5; i++) {
                localStorage.setItem('permis ' + i, res.data[i].status);
                console.log('employee permis:', res.data[i].status);
            }
            setPermission();
            console.log('permisstion :', employeePermission);
        });
    }

    function setPermission() {
        if (JSON.parse(localStorage.getItem('permis 0')) == true) {
            setParentCheckbox(true);
            console.log('Có cầm đồ');
        } else {
            setParentCheckbox(false);
            console.log('Ko có cầm đồ');
        }
        if (JSON.parse(localStorage.getItem('permis 1')) == true) {
            setParentCheckbox2(true);
            console.log('Có cửa hàng');
        } else {
            setParentCheckbox2(false);
            console.log('Ko có cửa hàng');
        }
        if (JSON.parse(localStorage.getItem('permis 2')) == true) {
            setParentCheckbox3(true);
            console.log('Có kho');
        } else {
            setParentCheckbox3(false);
            console.log('Ko có kho');
        }
        if (JSON.parse(localStorage.getItem('permis 3')) == true) {
            setParentCheckbox4(true);
            console.log('Có nhân viên');
        } else {
            setParentCheckbox4(false);
            console.log('Ko có nhân viên');
        }
        if (JSON.parse(localStorage.getItem('permis 4')) == true) {
            console.log('Có khách hàng');
            setParentCheckbox5(true);
        } else {
            setParentCheckbox5(false);
            console.log('Ko có khách hàng');
        }
    }

    const permissionArr = [
        {
            userId: sessionStorage.getItem('selected'),
            nameUser: 'string',
            namePermission: 'string',
            permissionId: 1,
            status: localStorage.getItem('permis 0'),
        },
        {
            userId: sessionStorage.getItem('selected'),
            nameUser: 'string',
            namePermission: 'string',
            permissionId: 2,
            status: localStorage.getItem('permis 1'),
        },
        {
            userId: sessionStorage.getItem('selected'),
            nameUser: 'string',
            namePermission: 'string',
            permissionId: 3,
            status: localStorage.getItem('permis 2'),
        },
        {
            userId: sessionStorage.getItem('selected'),
            nameUser: 'string',
            namePermission: 'string',
            permissionId: 4,
            status: localStorage.getItem('permis 3'),
        },
        {
            userId: sessionStorage.getItem('selected'),
            nameUser: 'string',
            namePermission: 'string',
            permissionId: 5,
            status: localStorage.getItem('permis 4'),
        },
    ];

    function savePermission() {
        API({
            method: 'put',
            url: '/permission/savepermission',
            data: permissionArr,
        }).then((res) => {
            alert('Chỉnh quyền Thành công!');
            window.location.reload(false);
            // console.log('aaaaa', res.data);
        });
    }

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
        localStorage.setItem('permis 0', event.target.checked);
        setChildCheckboxes(
            childCheckboxes.map((checkbox) => ({
                ...checkbox,
                isChecked: event.target.checked,
            })),
        );
    };

    const handleChildCheckboxChange = (event) => {
        const { id, checked } = event.target;
        setChildCheckboxes(
            childCheckboxes.map((checkbox) => (checkbox.id == id ? { ...checkbox, isChecked: checked } : checkbox)),
        );
        setParentCheckbox(childCheckboxes.every((checkbox) => checkbox.isChecked));
    };
    const handleCheckPlus = (e) => {
        if (e.target.innerHTML == '+') {
            setTextPlus('-');
        } else {
            setTextPlus('+');
        }
        setCheckPlus(!checkedPlus);
    };

    let children = '';
    if (checkedPlus) {
        children = (
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3, alignItems: 'start', justifyContent: 'start' }}>
                {childCheckboxes.map((checkbox) => {
                    return (
                        <div key={checkbox.id.toString()} className="checkbox-container">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checkbox.isChecked}
                                        onChange={handleChildCheckboxChange}
                                        id={checkbox.id.toString()}
                                    />
                                }
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 44, padding: '0 0 15px 0' } }}
                            />
                            <img src={file} alt="file" className="img_file" />
                            <span>{checkbox.label}</span>
                        </div>
                    );
                })}
            </Box>
        );
    }

    //Check quản lý cửa hàng
    const handleCheckbox2 = (event) => {
        setParentCheckbox2(event.target.checked);
        localStorage.setItem('permis 1', event.target.checked);
        setChildCheckboxes2(
            childCheckboxes2.map((checkbox) => ({
                ...checkbox,
                isChecked: event.target.checked,
            })),
        );
    };

    const handleChildCheckboxChange2 = (event) => {
        const { id, checked } = event.target;
        setChildCheckboxes2(
            childCheckboxes2.map((checkbox) => (checkbox.id == id ? { ...checkbox, isChecked: checked } : checkbox)),
        );
        setParentCheckbox2(childCheckboxes2.every((checkbox) => checkbox.isChecked));
    };

    const handleCheckPlus2 = (e) => {
        if (e.target.innerHTML == '+') {
            setTextPlus2('-');
        } else {
            setTextPlus2('+');
        }
        setCheckPlus2(!checkedPlus2);
    };

    let children2 = '';
    if (checkedPlus2) {
        children2 = (
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3, alignItems: 'start', justifyContent: 'start' }}>
                {childCheckboxes2.map((checkbox) => {
                    return (
                        <div key={checkbox.id.toString()} className="checkbox-container">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checkbox.isChecked}
                                        onChange={handleChildCheckboxChange2}
                                        id={checkbox.id.toString()}
                                    />
                                }
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 44, padding: '0 0 15px 0' } }}
                            />
                            <img src={file} alt="file" className="img_file" />
                            <span>{checkbox.label}</span>
                        </div>
                    );
                })}
            </Box>
        );
    }

    //Check quản lý kho
    const handleCheckbox3 = (event) => {
        setParentCheckbox3(event.target.checked);
        localStorage.setItem('permis 2', event.target.checked);
        setChildCheckboxes3(
            childCheckboxes3.map((checkbox) => ({
                ...checkbox,
                isChecked: event.target.checked,
            })),
        );
    };

    const handleChildCheckboxChange3 = (event) => {
        const { id, checked } = event.target;
        setChildCheckboxes3(
            childCheckboxes3.map((checkbox) => (checkbox.id == id ? { ...checkbox, isChecked: checked } : checkbox)),
        );
        setParentCheckbox3(childCheckboxes3.every((checkbox) => checkbox.isChecked));
    };

    const handleCheckPlus3 = (e) => {
        if (e.target.innerHTML == '+') {
            setTextPlus3('-');
        } else {
            setTextPlus3('+');
        }
        setCheckPlus3(!checkedPlus3);
    };

    let children3 = '';
    if (checkedPlus3) {
        children3 = (
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3, alignItems: 'start', justifyContent: 'start' }}>
                {childCheckboxes3.map((checkbox) => {
                    return (
                        <div key={checkbox.id.toString()} className="checkbox-container">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checkbox.isChecked}
                                        onChange={handleChildCheckboxChange3}
                                        id={checkbox.id.toString()}
                                    />
                                }
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 44, padding: '0 0 15px 0' } }}
                            />
                            <img src={file} alt="file" className="img_file" />
                            <span>{checkbox.label}</span>
                        </div>
                    );
                })}
            </Box>
        );
    }

    //Check quản lý nhân viên
    const handleCheckbox4 = (event) => {
        setParentCheckbox4(event.target.checked);
        localStorage.setItem('permis 3', event.target.checked);
    };

    const handleCheckPlus4 = (e) => {
        if (e.target.innerHTML == '+') {
            setTextPlus4('-');
        } else {
            setTextPlus4('+');
        }
        setCheckPlus4(!checkedPlus4);
    };

    //Check quản lý khách hàng
    const handleCheckbox5 = (event) => {
        setParentCheckbox5(event.target.checked);
        localStorage.setItem('permis 4', event.target.checked);
    };

    const handleCheckPlus5 = (e) => {
        if (e.target.innerHTML == '+') {
            setTextPlus5('-');
        } else {
            setTextPlus5('+');
        }
        setCheckPlus5(!checkedPlus5);
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: '22px 19px 22px 27px',
        borderRadius: '10px',
        color: theme.palette.text.secondary,
    }));

    return (
        <div className="box_employee">
            <h1 id="heading">Phân quyền nhân viên</h1>

            <div className="authContainer">
                <div className="auth_input">
                    <div className="auth_input-group">
                        <div className="auth_input-item">
                            <span>
                                Nhân viên <span className="auth_input-star">*</span>:
                            </span>
                            <select value={value} onChange={getPermission}>
                                {employeeList.map((item, index) => {
                                    return (
                                        <option key={index} value={item.userId}>
                                            {item.userName} - {item.fullName}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="employee_btn-group" style={{ marginLeft: '10%' }}>
                        <div className="employee_btn-group">
                            {/**Todo: add action here */}
                            <Button type="submit" onClick={savePermission}>
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

                <div className="auth_input-group">
                    <div className="auth_check">
                        <span>Phân quyền:</span>
                        <div style={{ display: 'block' }}>
                            <div className="auth_check-item">
                                <div className="auth_check-plus" onClick={(e) => handleCheckPlus(e)}>
                                    {textPlus}
                                </div>
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
                                        sx={{
                                            '& .MuiSvgIcon-root': { fontSize: 44, padding: '0 0 15px 0' },
                                        }}
                                    />
                                    <img src={file} alt="file" className="img_file" />
                                    <span>Cầm đồ</span>
                                    {children}
                                </div>
                            </div>

                            <div className="auth_check-item">
                                <div className="auth_check-plus" onClick={(e) => handleCheckPlus2(e)}>
                                    {textPlus2}
                                </div>
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
                                        sx={{
                                            '& .MuiSvgIcon-root': { fontSize: 44, padding: '0 0 15px 0' },
                                        }}
                                    />
                                    <img src={file} alt="file" className="img_file" />
                                    <span>Quản lý cửa hàng</span>
                                    {children2}
                                </div>
                            </div>

                            <div className="auth_check-item">
                                <div className="auth_check-plus" onClick={(e) => handleCheckPlus3(e)}>
                                    {textPlus3}
                                </div>
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
                                        sx={{
                                            '& .MuiSvgIcon-root': { fontSize: 44, padding: '0 0 15px 0' },
                                        }}
                                    />
                                    <img src={file} alt="file" className="img_file" />
                                    <span>Quản lý kho</span>
                                    {children3}
                                </div>
                            </div>
                        </div>
                        <div className={{ style: 'block' }}>
                            <div className="auth_check-item">
                                <div className="auth_check-plus" onClick={(e) => handleCheckPlus4(e)}>
                                    {textPlus4}
                                </div>
                                <div className="checkbox-container">
                                    <FormControlLabel
                                        control={<Checkbox checked={parentCheckbox4} onChange={handleCheckbox4} />}
                                        sx={{
                                            '& .MuiSvgIcon-root': { fontSize: 44, padding: '0 0 15px 0' },
                                        }}
                                    />
                                    <img src={file} alt="file" className="img_file" />
                                    <span>Quản lý nhân viên</span>
                                </div>
                            </div>
                            <div className="auth_check-item">
                                <div className="auth_check-plus" onClick={(e) => handleCheckPlus5(e)}>
                                    {textPlus5}
                                </div>
                                <div className="checkbox-container">
                                    <FormControlLabel
                                        control={<Checkbox checked={parentCheckbox5} onChange={handleCheckbox5} />}
                                        sx={{
                                            '& .MuiSvgIcon-root': { fontSize: 44, padding: '0 0 15px 0' },
                                        }}
                                    />
                                    <img src={file} alt="file" className="img_file" />
                                    <span>Quản lý khách hàng</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthEmployee;
