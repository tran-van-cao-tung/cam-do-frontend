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
import { useForm, Controller } from 'react-hook-form';

import './AddWareHouse.css';
import { Link } from 'react-router-dom';

const WareHouse = () => {
    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {
            warehName: '',
            warehAddress: '',
            warehStatus: 'available',
        },
    });

    const onSubmit = (data) => console.log(data);

    return (
        <StyledEngineProvider injectFirst>
            <div className="wareh-wrapper">
                <h4 className="wareh-title">Thêm mới kho</h4>

                <div className="wareh-content">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="add-wareh-section">
                            <FormControl className="add-input-group" error={errors.warehName}>
                                <FormLabel className="label">
                                    Tên kho&nbsp;<label style={{ color: 'red' }}>*</label>:
                                </FormLabel>
                                <Controller
                                    name="warehName"
                                    control={control}
                                    render={({ field }) => (
                                        <InputBase
                                            {...field}
                                            placeholder="Nhập tên kho …"
                                            inputProps={{ 'aria-label': 'search' }}
                                            className="add-input"
                                            {...register('warehName', { required: 'Chưa nhập tên kho' })}
                                        />
                                    )}
                                />
                                <FormHelperText className="wareh-input-error">
                                    {errors?.warehName && errors.warehName.message}
                                </FormHelperText>
                            </FormControl>
                            <FormControl className="add-input-group" error={errors.warehAddress}>
                                <FormLabel className="label">
                                    Địa chỉ&nbsp;<label style={{ color: 'red' }}>*</label>:
                                </FormLabel>

                                <Controller
                                    name="warehAddress"
                                    control={control}
                                    render={({ field }) => (
                                        <InputBase
                                            {...field}
                                            placeholder="Nhập địa chỉ …"
                                            inputProps={{ 'aria-label': 'search' }}
                                            className="add-input"
                                            {...register('warehAddress', { required: 'Chưa nhập địa chỉ kho' })}
                                        />
                                    )}
                                />
                                <FormHelperText className="wareh-input-error">
                                    {errors?.warehAddress && errors.warehAddress.message}
                                </FormHelperText>
                            </FormControl>
                            <FormControl className="add-status-group">
                                <FormLabel className="label">
                                    Tình trạng&nbsp;<label style={{ color: 'red' }}>*</label>:
                                </FormLabel>

                                <Controller
                                    name="warehStatus"
                                    control={control}
                                    render={({ field }) => (
                                        <RadioGroup
                                            {...field}
                                            row
                                            defaultValue="available"
                                            // value={statusFilter}
                                            // onChange={handleStatusFilter}
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
                                    )}
                                />
                            </FormControl>
                        </div>
                        <Divider />
                        <div className="add-actions">
                            <Button type="submit" className="save-btn" variant="contained" startIcon={<SearchIcon />}>
                                Lưu lại
                            </Button>
                            <Link to="/warehouse">
                                <Button className="back-btn" variant="contained" startIcon={<ArrowBackIcon />}>
                                    Quay lại
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </StyledEngineProvider>
    );
};

export default WareHouse;
