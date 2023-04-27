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

import { Link, useParams } from 'react-router-dom';
import API from '../../../API';
import BtnSave from '../../ButtonUI/BtnSave/BtnSave';
import BtnCloseAnimation from '../../ButtonUI/BtnCloseAnimation/BtnCloseAnimation';

const EditListStore = () => {
    const id = useParams();
    const [branch, setBranch] = useState([]);
    const [status, setStatus] = useState(1);

    // Axios
    useEffect(() => {
        const slug = id.id;
        API({
            method: 'get',
            url: `branch/getById/${slug}`,
        }).then((res) => {
            setBranch(res.data);
        });
    }, [id.id]);

    const handleSubmitEdit = (event) => {
        const slug = id.id;
        event.preventDefault();
        const data = {
            branchName: branch.branchName,
            address: branch.address,
            phoneNumber: branch.phoneNumber,
            fund: branch.fund,
            status: parseInt(status),
        };
        API({
            method: 'put',
            url: `branch/updateBranch/${slug}`,
            data: data,
        }).then((res) => {
            alert('Lưu Thành Công');
        });
    };
    const handleOnChangeName = (e) => {
        setBranch({ ...branch, [e.target.name]: e.target.value });
        // console.log(name);
    };

    const handleCheckBox = (e) => {
        setStatus(e.target.value);
    };

    return (
        <>
            <div className="Addliststore">
                <h1>Cập nhật cửa hàng</h1>
                <div className="wareh-content">
                    <div className="add-section">
                        <FormControl className="add-input-group">
                            <FormLabel className="label">
                                Tên cửa hàng&nbsp;<label style={{ color: 'red' }}>*</label>:
                            </FormLabel>
                            <InputBase
                                value={branch.branchName}
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
                                value={branch.phoneNumber}
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
                                value={branch.address}
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
                                value={branch.fund}
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
                            <RadioGroup row name="status" defaultValue={1} onChange={handleCheckBox}>
                                <FormControlLabel
                                    value="1"
                                    control={<Radio />}
                                    label="Đang hoạt động"
                                    className="radio-available"
                                />

                                <FormControlLabel
                                    value="2"
                                    control={<Radio />}
                                    label="Đã tạm dừng"
                                    className="radio-closed"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>

                    <Divider />

                    <div className="add-actions">
                        <Button onClick={handleSubmitEdit}>
                            <BtnSave />
                        </Button>
                        <Button>
                            <Link to="/liststore">
                                <BtnCloseAnimation />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditListStore;
