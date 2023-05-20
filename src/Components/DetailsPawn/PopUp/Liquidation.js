import React, { useEffect, useState } from 'react';
import './popup.css';
import callAPI from '../../../API';
import { Button, TextField } from '@mui/material';
import { formatDate, formatMoney } from '../../../helpers/dateTimeUtils';
import { Save } from '@mui/icons-material';
import { NumericFormat } from 'react-number-format';
import PropTypes from 'prop-types';

import { Uploader } from 'uploader';
import { UploadDropzone } from 'react-uploader';
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
const Liquidation = ({ showContractId }) => {
    var now = new Date().getTime();
    const { userInfo } = useContext(AuthContext);
    const [contractDetail, setContractDetail] = useState([]);
    const [liquidMoney, setLiquidMoney] = useState(0);
    const [liquidInfo, setLiquidInfo] = useState([]);
    useEffect(() => {
        callAPI({
            method: 'get',
            url: `/contract/getContractInfoByContractId/` + showContractId,
        }).then((res) => {
            setContractDetail(res.data);
            console.log(res.data);
        });
    }, []);

    useEffect(() =>{
        if(contractDetail.status === 4){
            callAPI({
                method: 'get',
                url: `/liquidation/detail/` + showContractId,
            }).then((res) => {
                setLiquidInfo(res.data);
                console.log(res.data);
            }); 
        }
    })
    const uploader = Uploader({ apiKey: 'public_W142hsRDrKu5afNchEBx4f7nFNZx' }); // Your real API key.
    const uploaderOptions = {
        multi: true,

        showFinishButton: true,

        styles: {
            colors: {
                primary: '#377dff',
            },
        },
    };
    const [linkImg, setLinkImg] = useState();
    const handleImg = (img) => {
        setLinkImg(img);
    };

    const handInputMoney = (e) => {
        setLiquidMoney(e.target.value);
    };

    const handleLiquid = () => {
        if (linkImg) {
            console.log(showContractId);
            console.log(userInfo.userId);
            console.log(liquidMoney);
            console.log(linkImg);
            callAPI({
                method: 'post',
                url: `/liquidation/save/${showContractId}/${userInfo.userId}
                ?liquidationMoney=${liquidMoney}
                &proofImg=${linkImg}`,
            }).then((res) => {
                toast.success('Thanh lý thành công!');
                window.location.reload(false);
            }).catch((err) => toast.error("Thanh lý không thành công"));
        }
    }

    return (
        <div>
            <div className="info__asset">
                <div className="asset">
                    <div className="w30 text__right">
                        <p>
                            <b>Loại tài sản:</b>
                        </p>
                        <p>
                            <b>Tên tài sản :</b>
                        </p>

                        <p>
                            <b>
                                Số tiền thanh lý<span className="start-red">*</span>:
                            </b>
                        </p>

                        <b>Ngày thanh lý:</b>
                    </div>
                    {contractDetail.status === 4 ? (
                        //Đã đóng
                        <div className="w30 text__left">
                            <p>{liquidInfo.typeOfProduct}</p>
                            <p>{liquidInfo.assetName}</p>
                            <div className="box__input">
                                <p>{liquidInfo.liquidationMoney}</p>
                            </div>
                            <p className="line__height">{formatDate(liquidInfo.liquidationDate)}</p>
                        </div>
                    ) : (
                        <div className="w30 text__left">
                            <p>{contractDetail.typeOfProduct}</p>
                            <p>{contractDetail.assetName}</p>
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

                            <p className="line__height">{formatDate(now)}</p>
                        </div>
                    )}
                </div>
                <div className="asset">
                    {contractDetail.status === 4 ? (
                        ''
                    ) : (
                        <div>
                            <p>
                                Hình ảnh <span style={{ color: 'red' }}>*</span>:
                            </p>
                            <UploadDropzone
                                uploader={uploader}
                                options={uploaderOptions}
                                onUpdate={(files) => console.log("Up hình OK")}
                                onComplete={(files) => {
                                    handleImg(files.map((x) => x.fileUrl).join('\n'));
                                }}
                                width="600px"
                                height="375px"
                            />
                        </div>
                    )}
                    <img src={linkImg} width="600px" height="375px" alt='' />
                </div>
            </div>
            {contractDetail.status === 4 ? (
                ''
            ) : (
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
            )}

        </div>




    );
};

export default Liquidation;
