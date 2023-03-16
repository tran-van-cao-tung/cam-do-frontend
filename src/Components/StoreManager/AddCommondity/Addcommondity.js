import React from 'react';
import './AddCommondity.css';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import InputBase from '@mui/material/InputBase';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import { Divider } from '@mui/material';

const Addcommondity = () => {
    return (
        <>
            <div className="Addcommondity">
                <h1>Thêm mới cấu hình hàng hoá</h1>
                <div className="wareh-content">
                    <div className="add-content">
                        {/* Left */}
                        <div className="add-commodity-left">
                            <h3>Nhập thông tin hàng hoá</h3>
                            <Divider />
                            <FormControl className="add-input-group">
                                <FormLabel className="label">
                                    Mã hàng&nbsp;<label style={{ color: 'red' }}>*</label>:
                                </FormLabel>
                                <InputBase
                                    placeholder="XM"
                                    inputProps={{ 'aria-label': 'search' }}
                                    className="add-input"
                                />
                            </FormControl>

                            <FormControl className="add-input-group">
                                <FormLabel className="label">
                                    Tên hàng hoá&nbsp;<label style={{ color: 'red' }}>*</label>:
                                </FormLabel>
                                <InputBase
                                    placeholder="Xe máy SH"
                                    inputProps={{ 'aria-label': 'search' }}
                                    className="add-input"
                                />
                            </FormControl>
                            <FormControl className="add-status-group">
                                <FormLabel className="label">
                                    Tình trạng&nbsp;<label style={{ color: 'red' }}>*</label>:
                                </FormLabel>
                                <RadioGroup row name="status">
                                    <FormControlLabel
                                        value="available"
                                        control={<Radio />}
                                        label="Đang hoạt động"
                                        className="radio-available"
                                    />

                                    <FormControlLabel
                                        value="closed"
                                        control={<Radio />}
                                        label="Khoá"
                                        className="radio-closed"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        {/* Right */}
                        <div className="add-commodity-right">
                            <h3>Cấu hình thuộc tính hàng hóa</h3>
                            <Divider />
                            <div className="add-action">
                                <Button className="add-btn" variant="contained">
                                    Thêm thuộc tính
                                </Button>
                            </div>
                            <FormControl className="add-input-group">
                                <FormLabel className="label">
                                    Thuộc tính&nbsp;<label style={{ color: 'red' }}>*</label>:
                                </FormLabel>
                                <InputBase
                                    placeholder="Màu sắc"
                                    inputProps={{ 'aria-label': 'search' }}
                                    className="add-input"
                                />
                                <Button className="edit-btn" variant="contained">
                                    -
                                </Button>
                            </FormControl>

                            <FormControl className="add-input-group">
                                <FormLabel className="label">
                                    Thuộc tính&nbsp;<label style={{ color: 'red' }}>*</label>:
                                </FormLabel>
                                <InputBase
                                    placeholder="Biển kiểm soát"
                                    inputProps={{ 'aria-label': 'search' }}
                                    className="add-input"
                                />
                                <Button className="edit-btn" variant="contained">
                                    -
                                </Button>
                            </FormControl>

                            <FormControl className="add-input-group">
                                <FormLabel className="label">
                                    Thuộc tính&nbsp;<label style={{ color: 'red' }}>*</label>:
                                </FormLabel>
                                <InputBase
                                    placeholder="Thuộc tính hàng hoá"
                                    inputProps={{ 'aria-label': 'search' }}
                                    className="add-input"
                                />
                                <Button className="edit-btn" variant="contained">
                                    -
                                </Button>
                            </FormControl>

                            <FormControl className="add-input-group">
                                <FormLabel className="label">
                                    Thuộc tính&nbsp;<label style={{ color: 'red' }}>*</label>:
                                </FormLabel>
                                <InputBase
                                    placeholder="Thuộc tính hoàng hoá"
                                    inputProps={{ 'aria-label': 'search' }}
                                    className="add-input"
                                />
                                <Button className="edit-btn" variant="contained">
                                    -
                                </Button>
                            </FormControl>
                        </div>
                    </div>

                    <Divider />

                    <div className="add-actions">
                        <Button className="save-btn" variant="contained">
                            Lưu lại
                        </Button>

                        <Button className="back-btn" variant="contained" href="/commodity">
                            Quay lại
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Addcommondity;
