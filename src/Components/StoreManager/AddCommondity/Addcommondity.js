import './AddCommondity.css';

import Button from '@mui/material/Button';
import API from '../../../API';
import {Grid, TextField } from '@mui/material';

import React, { useState } from 'react';

import { Save } from '@mui/icons-material';
import CustomizeDiaglog, { DIALOG_SIZE } from '../../../helpers/CustomizeDiaglog';
import { toast } from 'react-toastify';

const Addcommondity = ({ setShowAddCommodity, showAddCommodity }) => {
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState(0);
    const [attributeDTOs, setAttributeDTOs] = useState([
        {
            description: '',
        },
        {
            description: '',
        },
    ]);
    const handleOnChangeName = (e) => {
        setName(e.target.value);
    };
    const handleOnChangeCode = (e) => {
        setCode(e.target.value);
    };

    const handleAddAttribute = () => {
        setAttributeDTOs((previous) => {
            return [
                ...previous,
                {
                    description: '',
                },
            ];
        });
    };

    const handleChangeAttribute = (value, index) => {
        setAttributeDTOs((previous) => {
            const newAttributes = [...previous];
            newAttributes[index].description = value;
            return newAttributes;
        });
    };

    const handleRemoveAttributes = (index) => {
        console.log(index);
        setAttributeDTOs((previous) => {
            const newAttributes = [...previous];
            newAttributes.splice(index, 1);
            console.log({ previous, newAttributes });
            return newAttributes;
        });
    };

    const handleSumbitCommondy = (e) => {
        const preparedAttributes = attributeDTOs.filter((item) => !!item.description);
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
                toast.success('Lưu Thành Công');
            })
            .catch((err) => toast.error('Lưu Không Thành Công'));
    };
    const renderContent = () => (
        <Grid container spacing={3}>
            {/* Left */}
            <Grid item xs={6}>
                <h3>Nhập thông tin hàng hoá</h3>
                <Grid item xs={12} marginTop="15px">
                    <TextField
                        onChange={handleOnChangeCode}
                        id="standard-basic"
                        label={
                            <p>
                                Mã hàng <span style={{ color: 'red' }}>*</span>:
                            </p>
                        }
                        fullWidth
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12} marginTop="10px">
                    <TextField
                        onChange={handleOnChangeName}
                        id="standard-basic"
                        label={
                            <p>
                                Tên hàng hoá<span style={{ color: 'red' }}>*</span>:
                            </p>
                        }
                        fullWidth
                        variant="standard"
                    />
                </Grid>
            </Grid>
            {/* Right */}
            <Grid item xs={6}>
                <Grid item xs={12} marginBottom="2px" display="flex" justifyContent="space-between" alignItems="center">
                    <h3>Cấu hình hàng hóa</h3>

                    <Button className="add-btn" variant="contained" onClick={handleAddAttribute}>
                        Thêm thuộc tính
                    </Button>
                </Grid>

                {attributeDTOs.map((item, index) => (
                    <Grid
                        item
                        xs={12}
                        display="flex"
                        marginBottom="10px"
                        justifyContent="space-between"
                        alignItems="center"
                        key={index}
                    >
                        <TextField
                            onChange={(e) => handleChangeAttribute(e.target.value, index)}
                            id="standard-basic"
                            label={
                                <p>
                                    Thuộc tính<span style={{ color: 'red' }}>*</span>:
                                </p>
                            }
                            marginTop="10px"
                            fullWidth
                            value={item.description}
                            variant="standard"
                        />
                        <Button
                            sx={{
                                backgroundColor: 'red',
                            }}
                            className="edit-btn"
                            marginLeft="5px"
                            variant="contained"
                            onClick={() => handleRemoveAttributes(index)}
                        >
                            -
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
    const handleCloseDialog = () => {
        setShowAddCommodity(false);
    };

    return (
        <CustomizeDiaglog
            open={setShowAddCommodity}
            onClose={handleCloseDialog}
            title="Thêm mới cấu hình hàng hoá"
            content={renderContent()}
            action={
                <Button
                    onClick={(e) => handleSumbitCommondy(e)}
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
            maxWidth={DIALOG_SIZE.md}
        />
    );
};

export default Addcommondity;
