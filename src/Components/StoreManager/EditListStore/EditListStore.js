import React, { useState, useEffect } from 'react';
import './EditListStore.css';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import API from '../../../API';

import CustomizeDiaglog, { DIALOG_SIZE } from '../../../helpers/CustomizeDiaglog';
import { Save } from '@mui/icons-material';
import { Grid, TextField } from '@mui/material';
import { toast } from 'react-toastify';

const EditListStore = ({ setShowEditStore, showEditStore, refresh }) => {
    const id = localStorage.getItem('brandId');

    const [branch, setBranch] = useState([]);
    const [status, setStatus] = useState(1);

    // Axios
    useEffect(() => {
        API({
            method: 'get',
            url: `branch/getById/` + id,
        }).then((res) => {
            console.log('store', res.data);
            setBranch(res.data);
        });
    }, [id]);

    const handleSubmitEdit = (event) => {
        event.preventDefault();
        const data = {
            branchID: branch.branchId,
            branchName: branch.branchName,
            address: branch.address,
            phoneNumber: branch.phoneNumber,
            fund: branch.fund,
            status: parseInt(status),
        };
        API({
            method: 'put',
            url: `branch/updateBranch/` + id,
            data: data,
        }).then((res) => {
            refresh();
            toast.success('Lưu Thành Công');
            setShowEditStore(false);
        });
    };
    const handleOnChangeName = (e) => {
        setBranch({ ...branch, [e.target.name]: e.target.value });
    };

    const handleCheckBox = (e) => {
        setStatus(e.target.value);
    };

    const renderContent = () => (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Grid item xs={12}>
                    <TextField
                        value={branch.branchName ?? ''}
                        name="branchName"
                        onChange={handleOnChangeName}
                        label={
                            <p>
                                Tên cửa hàng <span style={{ color: 'red' }}>*</span>:
                            </p>
                        }
                        fullWidth
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12} marginTop="5px">
                    <TextField
                        value={branch.phoneNumber ?? ''}
                        name="phoneNumber"
                        label={
                            <p>
                                Số điện thoại<span style={{ color: 'red' }}>*</span>:
                            </p>
                        }
                        fullWidth
                        type="text"
                        variant="standard"
                        onChange={handleOnChangeName}
                    />
                </Grid>
            </Grid>

            <Grid item xs={6}>
                <Grid item xs={12}>
                    <TextField
                        value={branch.address ?? ''}
                        name="address"
                        label={
                            <p>
                                Địa chỉ <span style={{ color: 'red' }}>*</span>:
                            </p>
                        }
                        fullWidth
                        variant="standard"
                        onChange={handleOnChangeName}
                    />
                </Grid>

                <Grid item xs={12} marginTop="5px">
                    <TextField
                        value={branch.fund ?? ''}
                        name="fund"
                        label={
                            <p>
                                Số vốn đầu tư<span style={{ color: 'red' }}>*</span>:
                            </p>
                        }
                        fullWidth
                        type="number"
                        variant="standard"
                        onChange={handleOnChangeName}
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
        setShowEditStore(false);
    };

    return (
        <CustomizeDiaglog
            open={showEditStore}
            onClose={handleCloseDialog}
            title="Cập nhật cửa hàng"
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

export default EditListStore;
