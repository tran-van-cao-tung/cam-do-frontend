import React, { useState, useEffect } from 'react';
import './EditWarehouse.css';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Grid, TextField } from '@mui/material';
import API from '../../../API';

import CustomizeDiaglog, { DIALOG_SIZE } from '../../../helpers/CustomizeDiaglog';
import { Save } from '@mui/icons-material';
import { toast } from 'react-toastify';

const EditWarehouse = ({ setShowEditWareHouse, showEditWareHouse, refresh }) => {
    const id = localStorage.getItem('WareHouseId');
    const [item, setItem] = useState([]);
    const [status, setStatus] = useState(1);

    // Axios
    useEffect(() => {
        async function callAPI() {
            await API({
                method: 'get',
                url: `/warehouse/GetAllDetail/${id},0`,
            }).then((res) => {
                setItem(res.data);
                // console.log('aaaaa', res.data);
            });
        }
        callAPI();
    }, []);

    const handleSubmitEdit = () => {
        const data = {
            warehouseId: id,
            warehouseName: item.warehouseName,
            warehouseAddress: item.warehouseAddress,
            status: parseInt(status),
            contractAssets: [],
        };
        API({
            method: 'put',
            url: `/warehouse/updateWareHouse`,
            data: data,
        }).then((res) => {
            refresh();
            toast.success('Cập nhật thành công');
            setShowEditWareHouse(false);
        });
    };

    const handleOnChangeName = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };
    const handleCheckBox = (e) => {
        setStatus(e.target.value);
    };

    const renderContent = () => (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Grid item xs={12}>
                    <TextField
                        value={item.warehouseName ?? ''}
                        onChange={handleOnChangeName}
                        label={
                            <p>
                                Tên kho <span style={{ color: 'red' }}>*</span>:
                            </p>
                        }
                        fullWidth
                        name="warehouseName"
                        variant="standard"
                    />
                </Grid>
            </Grid>

            <Grid item xs={6}>
                <Grid item xs={12}>
                    <TextField
                        value={item.warehouseAddress ?? ''}
                        onChange={handleOnChangeName}
                        name="warehouseAddress"
                        label={
                            <p>
                                Địa chỉ<span style={{ color: 'red' }}>*</span>:
                            </p>
                        }
                        fullWidth
                        variant="standard"
                    />
                </Grid>
            </Grid>

            <Grid item xs={12}>
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

                        <FormControlLabel value="2" control={<Radio />} label="Đã tạm dừng" className="radio-closed" />
                    </RadioGroup>
                </FormControl>
            </Grid>
        </Grid>
    );
    const handleCloseDialog = () => {
        setShowEditWareHouse(false);
    };

    return (
        <CustomizeDiaglog
            open={showEditWareHouse}
            onClose={handleCloseDialog}
            title="Cập Nhật Kho"
            content={renderContent()}
            action={
                <Button
                    onClick={(e) => handleSubmitEdit(e)}
                    variant="contained"
                    color="success"
                    sx={{
                        fontSize: '16px',
                        padding: '15px 30px',
                    }}
                    startIcon={<Save />}
                >
                    Lưu Lại
                </Button>
            }
            maxWidth={DIALOG_SIZE.sm}
        />
    );
};

export default EditWarehouse;
