import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import API from '../../../API';
import './AddWareHouse.css';
import { useState } from 'react';

import CustomizeDiaglog, { DIALOG_SIZE } from '../../../helpers/CustomizeDiaglog';
import { Save } from '@mui/icons-material';
import { Grid, TextField } from '@mui/material';
import { toast } from 'react-toastify';

const AddWareHouse = ({ showAddWareHouse, setShowAddWareHouse }) => {
    const [statusFilter, setStatusFilter] = useState('available');

    const handleStatusFilter = (e) => {
        setStatusFilter(e.target.value);
    };

    // ================================
    // |         Add Ware Home         |
    // ================================

    const [name, seteName] = useState('');
    const [Address, setAddress] = useState('');
    const handleSubmit = (e) => {
        API({
            method: 'post',
            url: '/warehouse/createWarehouse',
            data: {
                warehouseName: name,
                warehouseAddress: Address,
            },
        })
            .then((res) => {
                console.log('Success Full');
                toast.success('Lưu Thành Công');
            })
            .catch((err) => toast.error('Lưu Không Thành Công'));
    };

    const handleOnChangeName = (e) => {
        seteName(e.target.value);
    };

    const handleOnChangeAddress = (e) => {
        setAddress(e.target.value);
    };
    const renderContent = () => (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Grid item xs={12}>
                    <TextField
                        onChange={(e) => handleOnChangeName(e)}
                        id="standard-basic"
                        label={
                            <p>
                                Tên kho <span style={{ color: 'red' }}>*</span>:
                            </p>
                        }
                        fullWidth
                        variant="standard"
                    />
                </Grid>
            </Grid>

            <Grid item xs={6}>
                <Grid item xs={12}>
                    <TextField
                        onChange={(e) => handleOnChangeAddress(e)}
                        id="standard-basic"
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
                    <RadioGroup
                        row
                        defaultValue={statusFilter}
                        name="status"
                        value={statusFilter}
                        onChange={handleStatusFilter}
                    >
                        <FormControlLabel
                            value="available"
                            control={<Radio />}
                            label="Còn chỗ"
                            className="radio-available"
                        />
                        <FormControlLabel value="full" control={<Radio />} label="Hết chỗ" className="radio-full" />
                        <FormControlLabel
                            value="closed"
                            control={<Radio />}
                            label="Tạm đóng"
                            className="radio-closed"
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
        </Grid>
    );

    const handleCloseDialog = () => {
        setShowAddWareHouse(false);
    };

    return (
        <>
            <CustomizeDiaglog
                open={showAddWareHouse}
                onClose={handleCloseDialog}
                title="Thêm Kho"
                content={renderContent()}
                action={
                    <Button
                        onClick={(e) => handleSubmit(e)}
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
        </>
    );
};

export default AddWareHouse;
