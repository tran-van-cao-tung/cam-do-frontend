import React, { useContext, useEffect, useState } from 'react'
import callAPI from '../../API';
import * as Yup from 'yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ReplyIcon from '@mui/icons-material/Reply';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, TextField, Button} from '@mui/material';
import Swal from 'sweetalert2';
import { AuthContext } from '../../helpers/AuthContext';

const Field = ({
    label,
    content
}) => {
    return <>
        <Grid item xs={12} md={4}>
            <Box textAlign={"right"} fontSize={25}>
                {label}
            </Box>
        </Grid>
        <Grid item xs={12} md={8}>
            <Box textAlign={"left"}>
                {content}
            </Box>
        </Grid>
    </>
}

function Profile() {
    const { authState, userInfo, currentBranchId} = useContext(AuthContext);

    const history = useNavigate();
    const [branch, setBranch] = useState([]);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profile, setProfile] = useState({})

    const validationSchema = Yup.object().shape({
        fullName: Yup.string()
            .required('Tên nhân viên không được để trống')
            .max(100, 'Tên nhân viên không được vượt quá 100 ký tự'),
        userName: Yup.string()
            .required('Tài khoản không được để trống')
            .max(30, 'Tài khoản không được vượt quá 30 ký tự'),
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

    useEffect(() => {
        setProfile({ ...userInfo ?? {} })
    }, [userInfo]);

    const onSubmit = (e) => {
        e.preventDefault();
        const data = {
            roleId: 1,
            userId: userInfo.userId,
            fullName: profile.fullName,
            branchId: 1,
            userName: profile.userName,
            email: profile.email,
            address: profile.address,
            status: profile.status,
            phone: profile.phone,
            password: profile.password,
        }
        console.log(data)
        validationSchema.validate(data, { abortEarly: false })
            .then(() => {
                data.status = parseInt(userInfo.status);
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
    const handleOnchange = (key, value) => {
        setProfile(prev => ({
            ...prev,
            [key]: value
        }))
    }
    return (
        <div className="box_employee">
            <h1 className="employee_heading-add">Thông tin cá nhân</h1>
            <div className="wareh-content">
                <form /* validationSchema={validationSchema} */ onSubmit={onSubmit}>
                    <Grid container spacing={1} alignItems={"center"} sx={{ fontFamily: 'Frank Ruhl Libre' }}>
                        <Field
                            label={<span>
                                Họ và tên <span>*</span>:
                            </span>}
                            content={<TextField
                                sx={{
                                    width: { sm: 200, md: 500 }
                                }}
                                type="text"
                                size='small'
                                onChange={(e) => handleOnchange('fullName', e.target.value)}
                                value={profile.fullName}
                            />}
                        />

                        {/* Thông tin cửa hàng */}
                        <Field
                            label={<span>
                                Tên cửa hàng:
                            </span>}
                            content={"store 1"}
                        />

                        <Field
                            label={<span>
                                Tên đăng nhập:
                            </span>}
                            content={<TextField
                                sx={{
                                    width: { sm: 200, md: 500 }
                                }}
                                type="text"
                                size='small'
                                onChange={(e) => handleOnchange('userName', e.target.value)}
                                value={profile.userName}
                            />}
                        />

                        <Field
                            label={<span>
                                Email:
                            </span>}
                            content={<TextField
                                sx={{
                                    width: { sm: 200, md: 500 }
                                }}
                                type="text"
                                size='small'
                                onChange={(e) => handleOnchange('email', e.target.value)}
                                value={profile.email}
                            />}
                        />

                        <Field
                            label={<span>
                                Địa chỉ:
                            </span>}
                            content={<TextField
                                sx={{
                                    width: { sm: 200, md: 500 }
                                }}
                                type="text"
                                size='small'
                                onChange={(e) => handleOnchange('address', e.target.value)}
                                value={profile.address}
                            />}
                        />

                        <Field
                            label={<span>
                                Số điện thoại:
                            </span>}
                            content={<TextField
                                sx={{
                                    width: { sm: 200, md: 500 }
                                }}
                                type="text"
                                size='small'
                                onChange={(e) => handleOnchange('phone', e.target.value)}
                                value={profile.phone}
                            />}
                        />

                        <Field
                            label={
                            <Button type="submit" variant="contained" color="success">
                                <SaveAltIcon />
                                <span>Lưu lại</span>
                            </Button>}
                            content={
                            <Button variant="contained" color="warning"
                                onClick={() => {
                                    history('/listemployees');
                                }}
                            >
                                <ReplyIcon />
                                <span>Quay lại</span>
                            </Button>}
                        />
                    </Grid>

                    {/* <div className="employeeAdd">
                        <div className="employee_input">
                            <span>
                                Họ và tên <span>*</span>:
                            </span>
                            <input
                                type="text"
                                name="fullName"
                                // onChange={(e) => handleInput(e)}
                                value={userInfo.fullName}
                            />
                        </div>
                        <div className="employee_input">
                            <span>
                                Tên cửa hàng <span>*</span>:
                            </span>
                            <span>abc</span>
                        </div>
                        <div className="employee_username">
                            <span>
                                Tên đăng nhập <span>*</span>:
                            </span>
                            <span>{userInfo.userName}</span>
                        </div>
                        <div className="employee_input">
                            <span>
                                Email<span>*</span>:
                            </span>
                            <input
                                type="text"
                                name="email"
                                // onChange={(e) => handleInput(e)}
                                value={userInfo.email}
                            />
                        </div>
                        <div className="employee_input">
                            <span>
                                Địa chỉ <span>*</span>:
                            </span>
                            <input
                                type="text"
                                name="address"
                                // onChange={(e) => handleInput(e)}
                                value={userInfo.address}
                            />
                        </div>
                        <div className="employee_input">
                            <span>
                                Số điện thoại <span>*</span>:
                            </span>
                            <input
                                type="text"
                                name="phone"
                                // onChange={(e) => handleInput(e)}
                                value={userInfo.phone}
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
                    </div> */}
                </form>
            </div>
        </div >
    )
}

export default Profile