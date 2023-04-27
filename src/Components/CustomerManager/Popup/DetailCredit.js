import React from 'react';
import { styled } from '@mui/material/styles';
import './UpdateInfor.css';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import Grid from '@mui/material/Grid';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import saveBtn from '../../../asset/img/save1.png';
import returnBtn from '../../../asset/img/returnBTN.png';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import BtnCloseAnimation from '../../ButtonUI/BtnCloseAnimation/BtnCloseAnimation';
import BtnSave from '../../ButtonUI/BtnSave/BtnSave';

const DetailCredit = () => {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: '22px 0 22px 27px',
        borderRadius: '10px',
        color: theme.palette.text.secondary,
        height: 700,
    }));
    return (
        <div>
            <div className="headerCredit">
                <h1 className="headerCustomerName">Thông tin tín dụng</h1>
                <div className="creditPoint">
                    <p>
                        <span className="labelCredit">Điểm tín dụng:</span> <span>300</span>
                    </p>
                </div>
                <div>
                    <Item className="parperCredit">
                        <div className="infoCredit">
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <div className="creditInfo">
                                        <div className="creditInfoLabel">
                                            <p>Nghề nghiệp:</p>
                                            <p>Nơi làm việc:</p>
                                            <p>Lương:</p>
                                            <p>Địa chỉ:</p>
                                            <p>Tình trạng:</p>
                                            <p>Chứng từ:</p>
                                        </div>
                                        <div className="creditInfoInput">
                                            <input type="text" placeholder="Nhập thông tin" />
                                            <input type="text" placeholder="Nhập thông tin" />
                                            <input type="text" placeholder="Nhập thông tin" />
                                            <input type="text" placeholder="Nhập thông tin" />
                                            <div className="radioWorkJob">
                                                <div className="radioContentWorkJob">
                                                    <input
                                                        type="radio"
                                                        name="status"
                                                        value="Đang làm việc"
                                                        id="active"
                                                    />
                                                    <label for="active" style={{ color: 'green' }}>
                                                        Đang làm việc
                                                    </label>
                                                </div>
                                                <div className="radioContentWorkJob">
                                                    <input type="radio" name="status" value="Đã nghỉ việc" id="ban" />
                                                    <label for="ban" style={{ color: 'red' }}>
                                                        Đã nghỉ việc
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="chungtuCredit">
                                                <button>Thêm mới</button>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className="creditInfo">
                                        <div className="creditInfoLabel">
                                            <p>Tên thân nhân:</p>
                                            <p>Mối quan hệ:</p>
                                            <p>Tiền chu cấp:</p>
                                            <p>Địa chỉ:</p>
                                            <p>Số điện thoại:</p>
                                        </div>
                                        <div className="creditInfoInput">
                                            <input type="text" placeholder="Nhập thông tin" />
                                            <input type="text" placeholder="Nhập thông tin" />
                                            <input type="text" placeholder="Nhập thông tin" />
                                            <input type="text" placeholder="Nhập thông tin" />
                                            <input type="text" placeholder="Nhập thông tin" />
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} style={{ padding: '0px' }}>
                                    <div className="creditInfoDiff">
                                        <div className="creditInfoLabelDiff">
                                            <p>Tên người quen biết khác:</p>
                                            <p>Mối quan hệ:</p>
                                            <p>Tiền chu cấp:</p>
                                            <p>Địa chỉ:</p>
                                            <p>Số điện thoại:</p>
                                        </div>
                                        <div className="creditInfoInputDiff">
                                            <input type="text" placeholder="Nhập thông tin" />
                                            <input type="text" placeholder="Nhập thông tin" />
                                            <input type="text" placeholder="Nhập thông tin" />
                                            <input type="text" placeholder="Nhập thông tin" />
                                            <input type="text" placeholder="Nhập thông tin" />
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>

                            {/* button save & return */}
                            <div className="comfirmBtn">
                                <Button type="submit">
                                    <BtnSave />
                                </Button>
                                <Button>
                                    <Link to="/customer-manager/updateinfo">
                                        <BtnCloseAnimation />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </Item>
                </div>
            </div>
        </div>
    );
};

export default DetailCredit;
