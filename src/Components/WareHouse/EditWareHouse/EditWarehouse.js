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
import API from '../../../API';
import { Link, useParams } from 'react-router-dom';
import BtnCloseAnimation from '../../ButtonUI/BtnCloseAnimation/BtnCloseAnimation';
import BtnSave from '../../ButtonUI/BtnSave/BtnSave';
import Swal from 'sweetalert2';

const EditWarehouse = () => {
    const params = useParams();
    const [item, setItem] = useState([]);
    // Axios
    useEffect(() => {
        async function callAPI() {
            await API({
                method: 'get',
                url: `/warehouse/GetAllDetail/${params.id},0`,
            }).then((res) => {
                setItem(res.data);
                // console.log('aaaaa', res.data);
            });
        }
        callAPI();
    }, []);



    const handleSubmitEdit = () => {
        const data = {
            warehouseId: parseInt(params.id),
            warehouseName: item.warehouseName,
            warehouseAddress: item.warehouseAddress,
            status: item.status,
            contractAssets: []
        }
        API({
            method: 'put',
            url: `/warehouse/updateWareHouse/`,
            data: data,
        })
            .then((res) => {
                Swal.fire({
                    text: `Cập nhật thành công`,
                    icon: 'success',
                }).then((result) => { });
            })
    };

    const handleOnChangeName = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };


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
                                value={item.warehouseName}
                                placeholder="Nhập tên cửa hàng"
                                inputProps={{ 'aria-label': 'search' }}
                                className="add-input"
                                name="warehouseName"
                                onChange={handleOnChangeName}
                            />
                        </FormControl>

                        <FormControl className="add-input-group">
                            <FormLabel className="label">
                                Địa chỉ&nbsp;<label style={{ color: 'red' }}>*</label>:
                            </FormLabel>
                            <InputBase
                                value={item.warehouseAddress}
                                placeholder="Nhập địa chỉ"
                                inputProps={{ 'aria-label': 'search' }}
                                className="add-input"
                                name="warehouseAddress"
                                onChange={handleOnChangeName}
                            />
                        </FormControl>

                        <FormControl className="add-status-group">
                            <FormLabel className="label">
                                Tình trạng&nbsp;<label style={{ color: 'red' }}>*</label>:
                            </FormLabel>
                            <RadioGroup row name="status" value={item.status ? item.status : 0} onChange={handleOnChangeName} >
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
                        <Button onClick={handleSubmitEdit}>
                            <BtnSave />
                        </Button>

                        <Link to="/warehouse">
                            <Button>
                                <BtnCloseAnimation />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditWarehouse;
