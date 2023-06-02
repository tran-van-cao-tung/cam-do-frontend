import React, { useEffect, useState } from 'react';
import './popup.css';
import callAPI from '../../../API';
import { Button, Grid, TextField, styled } from '@mui/material';
import { formatDate, formatMoney } from '../../../helpers/dateTimeUtils';
import { Save } from '@mui/icons-material';
import { NumericFormat } from 'react-number-format';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import { Uploader } from 'uploader';
import { UploadButton } from 'react-uploader';
import { AuthContext } from '../../../helpers/AuthContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isAllowed={(values) => {
                const { floatValue } = values;
                return floatValue >= 0;
            }}
            valueIsNumericString
            suffix=" VNĐ"
        />
    );
});

NumericFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
const Item = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const Liquidation = ({ showContractId, contracts }) => {
    var now = new Date().getTime();
    const { userInfo } = useContext(AuthContext);
    const [contractDetail, setContractDetail] = useState([]);
    const [liquidMoney, setLiquidMoney] = useState(0);
    const [liquidInfo, setLiquidInfo] = useState([]);
    const [linkImg, setLinkImg] = useState('');
    useEffect(() => {
        callAPI({
            method: 'get',
            url: `/contract/getContractInfoByContractId/` + showContractId,
        }).then((res) => {
            setContractDetail(res.data);
            console.log(res.data);
        });
    }, []);

    useEffect(() => {
        if (showContractId) {
            callAPI({
                method: 'get',
                url: `/liquidation/detail/` + showContractId,
            }).then((res) => {
                setLiquidInfo(res.data);
                setLinkImg(res.data.description);
            });
        } else {
            setLinkImg('');
        }
    }, [showContractId]);
    const uploader = Uploader({ apiKey: 'public_FW25bMK3mpqVXpSPo5c1xtLs1fF1' }); // Your real API key.
    const uploaderOptions = {
        multi: true,

        showFinishButton: true,

        styles: {
            colors: {
                primary: '#377dff',
            },
        },
    };
    const handleImg = (img) => {
        setLinkImg(img);
    };

    const handInputMoney = (e) => {
        setLiquidMoney(e.target.value);
    };

    const handleLiquid = () => {
        if (linkImg) {
            callAPI({
                method: 'post',
                url: `/liquidation/save/${showContractId}/${userInfo.userId}
                ?liquidationMoney=${liquidMoney}
                &proofImg=${linkImg}`,
            })
                .then((res) => {
                    toast.success('Thanh lý thành công!');
                    // window.location.reload(false);
                    contracts();
                })
                .catch((err) => toast.error('Thanh lý không thành công'));
        }
    };

    return (
        <>
            <div>
                {contractDetail.status === 4 ? (
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Item sx={{ textAlign: 'right', fontWeight: 700, fontSize: '25px' }}>Loại tài sản: </Item>
                        </Grid>
                        <Grid item xs={3}>
                            <Item sx={{ textAlign: 'center', fontSize: '25px', fontWeight: 700 }}>
                                {contractDetail.typeOfProduct}
                            </Item>
                        </Grid>

                        <Grid item xs={3}>
                            <Item sx={{ textAlign: 'right', fontWeight: 700, fontSize: '25px' }}> Tên tài sản : </Item>
                        </Grid>
                        <Grid item xs={3}>
                            <Item sx={{ textAlign: 'center', fontSize: '25px' }}> {contractDetail.assetName}</Item>
                        </Grid>
                        <Grid item xs={3}>
                            <Item sx={{ textAlign: 'right', fontWeight: 700, fontSize: '25px' }}>
                                {' '}
                                Số tiền thanh lý<span className="start-red">*</span>:
                            </Item>
                        </Grid>
                        <Grid item xs={3} sx={{ textAlign: 'left' }}>
                            <Item sx={{ textAlign: 'center', color: '#107287', fontSize: '25px', fontWeight: 400 }}>
                                {formatMoney(liquidInfo.liquidationMoney)}
                            </Item>
                        </Grid>
                        <Grid item xs={3} sx={{ textAlign: 'center', alignItems: 'center' }}>
                            <Item sx={{ textAlign: 'right', fontWeight: 700, fontSize: '25px' }}>Ngày thanh lý:</Item>{' '}
                        </Grid>
                        <Grid item xs={3} sx={{ textAlign: 'left' }}>
                            <Item sx={{ textAlign: 'center', fontSize: '25px', color: '#107287' }}>
                                {formatDate(liquidInfo.liquidationDate)}
                            </Item>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Item sx={{ textAlign: 'right', fontWeight: 700, fontSize: '25px' }}>Loại tài sản: </Item>
                        </Grid>
                        <Grid item xs={3}>
                            <Item sx={{ textAlign: 'center', fontSize: '25px', fontWeight: 700 }}>
                                {contractDetail.typeOfProduct}
                            </Item>
                        </Grid>

                        <Grid item xs={3}>
                            <Item sx={{ textAlign: 'right', fontWeight: 700, fontSize: '25px' }}> Tên tài sản : </Item>
                        </Grid>
                        <Grid item xs={3}>
                            <Item sx={{ textAlign: 'center', fontSize: '25px' }}> {contractDetail.assetName}</Item>
                        </Grid>
                        <Grid item xs={3}>
                            <Item sx={{ textAlign: 'right', fontWeight: 700, fontSize: '25px' }}>
                                {' '}
                                Số tiền thanh lý<span className="start-red">*</span>:
                            </Item>
                        </Grid>
                        <Grid item xs={3} sx={{ textAlign: 'left' }}>
                            <Item sx={{ textAlign: 'center', color: '#107287', fontSize: '25px', fontWeight: 400 }}>
                                <div className="box__input">
                                    <TextField
                                        onChange={(e) => handInputMoney(e)}
                                        name="liquidMoney"
                                        id="formatted-numberformat-input"
                                        placeholder="Tiền thanh lý"
                                        InputProps={{
                                            inputComponent: NumericFormatCustom,
                                        }}
                                        variant="standard"
                                    />
                                </div>
                            </Item>
                        </Grid>
                        <Grid item xs={3} sx={{ textAlign: 'center', alignItems: 'center' }}>
                            <Item sx={{ textAlign: 'right', fontWeight: 700, fontSize: '25px' }}>Ngày thanh lý:</Item>{' '}
                        </Grid>
                        <Grid item xs={3} sx={{ textAlign: 'left' }}>
                            <Item sx={{ textAlign: 'center', fontSize: '25px', color: '#107287' }}>
                                <p className="line__height">{formatDate(now)}</p>
                            </Item>
                        </Grid>
                    </Grid>
                )}

                <Grid container spacing={2}>
                    {contractDetail.status === 4 ? (
                        <div
                            style={{
                                // maxWidth: '250px',
                                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                                margin: '20px auto',
                                borderRadius: '12px',
                            }}
                        >
                            <div style={{ padding: '10px', fontSize: '25px', fontWeight: '700' }}>
                                <p>Hình Ảnh Tài Sản</p>
                            </div>
                            <img style={{ maxWidth: '800px' }} src={linkImg} alt="ảnh tài sản" />
                        </div>
                    ) : (
                        <div
                            style={{
                                margin: '20px auto',
                                position: 'relative',
                            }}
                        >
                            <div
                                style={{
                                    // maxWidth: '250px',
                                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                                    borderRadius: '12px',
                                }}
                            >
                                <div style={{ padding: '10px', fontSize: '25px', fontWeight: '700', width: '800px' }}>
                                    <p> Upload Hình ảnh:</p>
                                    <img src={linkImg} alt="" />
                                </div>
                            </div>
                            <UploadButton
                                uploader={uploader}
                                options={{ multi: true }}
                                onComplete={(files) => handleImg(files.map((x) => x.fileUrl).join('\n'))}
                            >
                                {({ onClick }) => (
                                    <button
                                        style={{
                                            backgroundColor: 'orange',
                                            border: 'none',
                                            position: 'absolute',
                                            right: '5px',
                                            top: '5%',
                                        }}
                                        onClick={onClick}
                                    >
                                        +
                                    </button>
                                )}
                            </UploadButton>
                            <div className="btn__group">
                                <Button
                                    onClick={(e) => handleLiquid(e)}
                                    variant="contained"
                                    color="success"
                                    sx={{
                                        fontSize: '16px',
                                        padding: '15px 30px',
                                    }}
                                    startIcon={<Save />}
                                >
                                    Thanh lý
                                </Button>
                            </div>
                        </div>
                    )}
                </Grid>
            </div>
        </>
    );
};

export default Liquidation;
