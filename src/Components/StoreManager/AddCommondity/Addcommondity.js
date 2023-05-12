import './AddCommondity.css';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import InputBase from '@mui/material/InputBase';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import API from '../../../API';
import { Divider } from '@mui/material';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BtnCloseAnimation from '../../ButtonUI/BtnCloseAnimation/BtnCloseAnimation';
import BtnSave from '../../ButtonUI/BtnSave/BtnSave';

const Addcommondity = () => {
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState(0);
    const [attributeDTOs, setAttributeDTOs] = useState([
        {
            description: "",
        },
        {
            description: "",
        },
    ]);
    const handleOnChangeName = (e) => {
        setName(e.target.value);
    };
    const handleOnChangeCode = (e) => {
        setCode(e.target.value);
    };

    const handleOnChangeStatus = (e) => {
        setStatus(e.target.value);
    };

    const handleAddAttribute = () => {
        setAttributeDTOs(previous => {
            return [...previous, {
                description: "",
            },]
        })
    }

    const handleChangeAttribute = (value, index) => {
        setAttributeDTOs(previous => {
            const newAttributes = [...previous];
            newAttributes[index].description = value;
            return newAttributes;
        })
    }

    const handleRemoveAttributes = (index) =>{
        console.log(index);
        setAttributeDTOs(previous => {
            const newAttributes = [...previous];
            newAttributes.splice(index, 1);
            console.log({previous, newAttributes});
            return newAttributes;
        })
    }
    

    const handleSumbitCommondy = (e) => {
        const preparedAttributes= attributeDTOs.filter(item => !!item.description);
        API({
            method: 'post',
            url: '/pawnableProduct/createPawnable',
            data: {
                typeOfProduct: name,
                commodityCode: code,
                status: 1,
                attributeDTOs: preparedAttributes,
            },
        })
            .then((res) => {
                console.log('Success Full');
                alert('Lưu Thành Công');
            })
            .catch((err) => console.log(err));
    };

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
                                    name="commodityCode"
                                    onChange={handleOnChangeCode}
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
                                    name="typeOfProduct"
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
                                        onChange={handleOnChangeStatus}
                                    />

                                    <FormControlLabel
                                        value="1"
                                        control={<Radio />}
                                        label="Khoá"
                                        className="radio-closed"
                                        onChange={handleOnChangeStatus}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        {/* Right */}
                        <div className="add-commodity-right">
                            <h3>Cấu hình thuộc tính hàng hóa</h3>
                            <Divider />
                            <div className="add-action">
                                <Button className="add-btn" variant="contained" onClick={handleAddAttribute}>
                                    Thêm thuộc tính
                                </Button>
                            </div>

                            {attributeDTOs.map((item, index) =>
                                <FormControl className="add-input-group" key={index}>
                                <FormLabel className="label">
                                    Thuộc tính&nbsp;<label style={{ color: 'red' }}>*</label>:
                                </FormLabel>
                                <InputBase
                                    placeholder="Màu sắc"
                                    inputProps={{ 'aria-label': 'search' }}
                                    className="add-input"
                                    value={item.description}
                                    onChange={(e) => handleChangeAttribute(e.target.value, index)}
                                />
                                <Button className="edit-btn" variant="contained" onClick = {() => handleRemoveAttributes(index)}>
                                    -
                                </Button>
                            </FormControl>
                            )}
                        </div>
                    </div>

                    <Divider />

                    <div className="add-actions">
                        <Button onClick={handleSumbitCommondy}>
                            <BtnSave />
                        </Button>
                        <Link to="/commodity">
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

export default Addcommondity;
