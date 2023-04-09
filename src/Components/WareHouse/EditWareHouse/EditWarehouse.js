import React, { useState, useEffect } from 'react';
import './EditWarehouse.css';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import InputBase from '@mui/material/InputBase';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Divider } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditWarehouse = () => {
    const params = useParams();

    // Axios
    useEffect(() => {
        async function callAPI() {
            await axios({
                method: 'get',
                url: `http://tranvancaotung-001-site1.atempurl.com/api/v1/warehouse/GetAllDetail/${params.id},1`,
            }).then((res) => {
                setItem(res.data);
                console.log(res.data);
                // console.log('aaaaa', res.data);
            });
        }
        callAPI();
    }, []);

    const [item, setItem] = useState([]);

    // console.log('aaaaaaaaaaaaaaaaaaaaaaa', item);

    const handleSubmitEdit = () => {
        axios({
            method: 'put',
            url: `http://tranvancaotung-001-site1.atempurl.com/api/v1/warehouse/updateWareHouse/${params.id}`,
            data: {
                warehouseName: item.branchName,
                warehouseAddress: item.address,
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
        /* setName(e.target.value); */
        setItem({ ...item, [e.target.name]: e.target.value });
        // console.log(name);
    };
    /* const handleOnChangePhone = (e) => {
        setPhone(e.target.value);
        // console.log(phone);
    };
    const handleOnChangeAddress = (e) => {
        setAddress(e.target.value);
        // console.log(address);
    };
    const handleOnChangeFund = (e) => {
        setFund(JSON.parse(e.target.value));
        // console.log(fund);
    };
    const handleOnChangeStatus = (e) => {
        setStatus(e.target.value);
        // console.log(status);
    }; */

    return (
        <>
            <div className="Addliststore">
                <h1>Cập Nhật kho</h1>
                <div className="wareh-content">
                    <div className="add-section">
                        <FormControl className="add-input-group">
                            <FormLabel className="label">
                                Tên kho&nbsp;<label style={{ color: 'red' }}>*</label>:
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

                        <Button className="back-btn" variant="contained" href="/warehouse">
                            Quay lại
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditWarehouse;