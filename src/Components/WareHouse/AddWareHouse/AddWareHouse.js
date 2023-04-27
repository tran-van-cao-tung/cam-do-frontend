import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Divider, FormHelperText, StyledEngineProvider } from '@mui/material';
import API from '../../../API';
import './AddWareHouse.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import BtnCloseAnimation from '../../ButtonUI/BtnCloseAnimation/BtnCloseAnimation';
import BtnSave from '../../ButtonUI/BtnSave/BtnSave';

const WareHouse = () => {
    const [statusFilter, setStatusFilter] = useState('available');

    const handleStatusFilter = (e) => {
        setStatusFilter(e.target.value);
    };

    // ================================
    // |         Add Ware Home         |
    // ================================

    const [Name, seteName] = useState('');
    const [Address, setAddress] = useState('');
    const handleSubmit = (e) => {
        API({
            method: 'post',
            url: '/warehouse/createWarehouse',
            data: {
                // "branchId": id,
                warehouseName: Name,
                warehouseAddress: Address,
            },
        })
            .then((res) => {
                console.log('Success Full');
                alert('Lưu Thành Công');
            })
            .catch((err) => console.log(err));
    };

    const handleOnChangeName = (e) => {
        seteName(e.target.value);
    };

    const handleOnChangeAddress = (e) => {
        setAddress(e.target.value);
    };
    return (
        <StyledEngineProvider injectFirst>
            <div className="wareh-wrapper">
                <h4 className="wareh-title">Thêm mới kho</h4>

                <div className="wareh-content">
                    <div className="add-wareh-section">
                        <FormControl className="add-input-group">
                            <FormLabel className="label">
                                Tên kho&nbsp;<label style={{ color: 'red' }}>*</label>:
                            </FormLabel>
                            <InputBase
                                placeholder="Nhập tên kho …"
                                inputProps={{ 'aria-label': 'search' }}
                                className="add-input"
                                onChange={handleOnChangeName}
                            />
                            {/* <FormHelperText id="component-error-text">
                                Error
                            </FormHelperText> */}
                        </FormControl>

                        <FormControl className="add-input-group">
                            <FormLabel className="label">
                                Địa chỉ&nbsp;<label style={{ color: 'red' }}>*</label>:
                            </FormLabel>
                            <InputBase
                                placeholder="Nhập địa chỉ …"
                                inputProps={{ 'aria-label': 'search' }}
                                className="add-input"
                                onChange={handleOnChangeAddress}
                            />
                        </FormControl>

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
                                <FormControlLabel
                                    value="full"
                                    control={<Radio />}
                                    label="Hết chỗ"
                                    className="radio-full"
                                />
                                <FormControlLabel
                                    value="closed"
                                    control={<Radio />}
                                    label="Tạm đóng"
                                    className="radio-closed"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>

                    <Divider />

                    <div className="add-actions">
                        <Button onClick={handleSubmit}>
                            <BtnSave />
                        </Button>

                        <Button>
                            <Link to="/warehouse">
                                <BtnCloseAnimation />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </StyledEngineProvider>
    );
};

export default WareHouse;
