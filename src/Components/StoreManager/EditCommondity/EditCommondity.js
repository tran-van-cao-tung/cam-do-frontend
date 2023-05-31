import React, { useState, useEffect } from 'react';
import './EditCommondity.css';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import InputBase from '@mui/material/InputBase';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Link, useParams } from 'react-router-dom';
import API from '../../../API';

import { Divider } from '@mui/material';
import { toast } from 'react-toastify';
import PageHeader from '../../../helpers/PageHeader';

const EditCommondity = () => {
    const params = useParams();

    // Axios
    useEffect(() => {
        API({
            method: 'get',
            url: `/pawnableProduct/getPawnAbleProductById/${params.id}`,
        }).then((res) => {
            setItem(res.data);
            // console.log(res.data);
        });
    }, []);

    const [item, setItem] = useState([]);

    const handleSubmitEdit = () => {
        API({
            method: 'put',
            url: `/pawnableProduct/updatePawnableProduct`,
            data: {
                pawnableProductId: params.id,
                commodityCode: item.commodityCode,
                typeOfProduct: item.typeOfProduct,
                status: item.status,
            },
        })
            .then((res) => {
                toast.success('Lưu Thành Công');
            })
            .catch((err) => {
                toast.error('Update ko thành công');
            });
    };
    const handleOnChangeName = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
        // console.log(name);
    };

    return (
        <>
            <div className="Addcommondity">
                <PageHeader title="Cập nhật cấu hình hàng hóa" />

                <div className="wareh-content">
                    <div className="add-content">
                        {/* Left */}
                        <div className="add-commodity-left">
                            <FormControl className="add-input-group">
                                <FormLabel className="label">
                                    Mã hàng&nbsp;<label style={{ color: 'red' }}>*</label>:
                                </FormLabel>
                                <InputBase
                                    placeholder="XM"
                                    inputProps={{ 'aria-label': 'search' }}
                                    className="add-input"
                                    value={item.commodityCode}
                                    name="commodityCode"
                                    onChange={handleOnChangeName}
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
                                    value={item.typeOfProduct}
                                    name="typeOfProduct"
                                    onChange={handleOnChangeName}
                                />
                            </FormControl>
                            <FormControl className="add-status-group" disabled>
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
                                        label="Khoá"
                                        className="radio-closed"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>

                    <Divider />

                    <div className="add-actions">
                        <Button className="save-btn" variant="contained" onClick={handleSubmitEdit}>
                            Lưu lại
                        </Button>

                        <Link to="/commodity">
                            <Button className="back-btn" variant="contained">
                                Quay lại
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditCommondity;
