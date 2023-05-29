import React, { useContext, useEffect, useState } from 'react'
import callAPI from '../../API';
import * as Yup from 'yup';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Box, Grid, TextField, Button} from '@mui/material';
import Swal from 'sweetalert2';
import { AuthContext } from '../../helpers/AuthContext';
import { toast } from 'react-toastify';

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
    const [profile, setProfile] = useState({})

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

    useEffect(() => {
        setProfile({ ...userInfo ?? {} })
    }, [userInfo]);

    const onSubmit = (e) => {
        e.preventDefault();
        const data = {
            userId: userInfo.userId,
            fullName: profile.fullName,
            branchId: profile.branchId,
            email: profile.email,
            address: profile.address,
            status: profile.status,
            phone: profile.phone,
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
                    toast.success('Chỉnh sửa thành công!');
                });
            })
            .catch((error) => {
                const errorMessages = error.inner.map(e => e.message).join('. ');
                toast.error(errorMessages);
            });
    };
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
                                disabled
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
                        />
                    </Grid>
                </form>
            </div>
        </div >
    )
}

export default Profile