import React, { useState, useEffect } from 'react';
import './EditListStore.css';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import InputBase from '@mui/material/InputBase';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Divider } from '@mui/material';

import { useParams } from 'react-router-dom';

const EditListStore = () => {
    const params = useParams();

    // Axios
    useEffect(() => {
        async function callAPI() {
            await axios({
                method: 'get',
                url: `/branch/getById/${params.id}`,
            }).then((res) => {
                setItem(res.data);
                console.log(res.data);
                // console.log('aaaaa', res.data);
            });
        }
        callAPI();
    }, []);

    const [item, setItem] = useState([]);

    const handleSubmitEdit = () => {
        axios({
            method: 'put',
            url: `/branch/${params.id}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            data: {
                branchId: item.id,
                branchName: item.branchName,
                address: item.address,
                phoneNumber: item.phoneNumber,
                fund: item.fund,
                status: item.status,
            },
        })
            .then((res) => {
                console.log('Success Full');
                alert('Lưu Thành Công');
            })
            .catch((err) => console.log(err));
    };

    const handleOnChangeName = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
        // console.log(name);
    };

    return (
        <>
            <div className="Addliststore">
                <h1>Cập Nhật cửa hàng</h1>
                <div className="wareh-content">
                    <div className="add-section">
                        <FormControl className="add-input-group">
                            <FormLabel className="label">
                                Tên cửa hàng&nbsp;<label style={{ color: 'red' }}>*</label>:
                            </FormLabel>
                            <InputBase
                                value={item.branchName}
                                placeholder="Nhập tên cửa hàng"
                                inputProps={{ 'aria-label': 'search' }}
                                className="add-input"
                                name="branchName"
                                onChange={handleOnChangeName}
                            />
                        </FormControl>

                        <FormControl className="add-input-group">
                            <FormLabel className="label">
                                Số điện thoại&nbsp;<label style={{ color: 'red' }}>*</label>:
                            </FormLabel>
                            <InputBase
                                value={item.phoneNumber}
                                placeholder="Nhập số điện thoại …"
                                inputProps={{ 'aria-label': 'search' }}
                                className="add-input"
                                name="phoneNumber"
                                onChange={handleOnChangeName}
                            />
                        </FormControl>

                        <FormControl className="add-input-group">
                            <FormLabel className="label">
                                Địa chỉ&nbsp;<label style={{ color: 'red' }}>*</label>:
                            </FormLabel>
                            <InputBase
                                value={item.address}
                                placeholder="Nhập địa chỉ"
                                inputProps={{ 'aria-label': 'search' }}
                                className="add-input"
                                name="address"
                                onChange={handleOnChangeName}
                            />
                        </FormControl>

                        <FormControl className="add-input-group">
                            <FormLabel className="label">
                                Số vốn đầu tư&nbsp;<label style={{ color: 'red' }}>*</label>:
                            </FormLabel>
                            <InputBase
                                value={item.fund}
                                placeholder="Nhập số vốn đầu tư"
                                inputProps={{ 'aria-label': 'search' }}
                                className="add-input"
                                name="fund"
                                onChange={handleOnChangeName}
                            />
                        </FormControl>

                        <FormControl className="add-status-group">
                            <FormLabel className="label">
                                Tình trạng&nbsp;<label style={{ color: 'red' }}>*</label>:
                            </FormLabel>
                            <RadioGroup row name="status" defaultValue={0}>
                                <FormControlLabel
                                    value="0"
                                    control={<Radio />}
                                    label="Đang hoạt động"
                                    className="radio-available"
                                />

                                <FormControlLabel
                                    value="1"
                                    control={<Radio />}
                                    label="Đã tạm dừng"
                                    className="radio-closed"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>

                    <Divider />

                    <div className="add-actions">
                        <Button className="save-btn" variant="contained" onClick={handleSubmitEdit}>
                            Lưu lại
                        </Button>

                        <Button className="back-btn" variant="contained" href="/liststore">
                            Quay lại
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditListStore;
