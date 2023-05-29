import React, { useContext, useEffect, useState } from 'react';

import user from '../../../asset/img/userpagedetai.png';
import bike from '../../../asset/img/bike.png';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import API from '../../../API.js';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { formatMoney } from '../../../helpers/dateTimeUtils';
import CustomizeDiaglog, { DIALOG_SIZE } from '../../../helpers/CustomizeDiaglog';
import ButtonCloseAnimation from '../../ButtonUI/BtnCloseAnimation/ButtonCloseAnimation';
import { Save } from '@mui/icons-material';
import { AuthContext } from '../../../helpers/AuthContext';
import { toast } from 'react-toastify';

const UpdateContract = ({ setShowUpdateContract, showUpdateContract, contracts, refresh }) => {
    const [detailContract, setDetailContract] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [pawnableProduct, setPawnableProduct] = useState();
    const [attributeInfo, setAttributeInfo] = useState([]);
    const [warehouse, setWarehouse] = useState({});

    const availableWarehouses = warehouses.filter((item) => {
        if (item.status === 1) {
            return item;
        }
    });
    const { userInfo } = useContext(AuthContext);
    console.log('contracts.status', userInfo.status);
    const updateWarehouse = ({ target }) => {
        setWarehouse(target.value);
    };

    function saveContract() {
        API({
            method: 'put',
            url: '/contractAsset/updateContractAsset/' + userInfo.userId,
            data: {
                contractAssetId: detailContract.contractAssetId,
                warehouseId: warehouse,
                contractAssetName: 'string',
                description: 'string',
                image: 'string',
            },
        })
            .then((res) => {
                refresh();
                toast.success('Chuyển kho thành công');
                setShowUpdateContract(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const [attributes, setAttributes] = useState();
    function showAttribute(id) {
        console.log('Pawnable id: ', id);
        API({
            method: 'get',
            url: `pawnableProduct/getPawnAbleProductById/` + id,
        })
            .then((res) => {
                console.log(res.data);
                setAttributes(res.data.attributes);
            })
            .catch((err) => console.log(err));
    }

    async function loadContractDetail() {
        console.log('Load detail');
        try {
            API({
                method: 'get',
                url: '/contract/getContractInfoByContractId/' + localStorage.getItem('PawnDetailID'),
            }).then((res) => {
                console.log('====================');
                console.log(res.data);
                console.log('====================');
                setDetailContract(res.data);
                setWarehouse(res.data.warehouseId);
                setAttributeInfo(res.data.attributeInfos);
            });
        } catch (error) { }
    }

    async function loadWarehouse() {
        API({
            method: 'get',
            url: '/warehouse/GetAll/0',
        }).then((res) => {
            setWarehouses(res.data);
        });
    }

    async function loadProduct() {
        API({
            method: 'get',
            url: 'pawnableProduct/getAll/0',
        }).then((res) => {
            console.log('----------------------');
            console.log(res.data);
            console.log('----------------------');
            setPawnableProduct(
                res.data.filter((item, index) => {
                    return item.typeOfProduct == detailContract.typeOfProduct;
                }),
            );
        });
    }
    useEffect(() => {
        loadContractDetail();
        loadWarehouse();
    }, []);

    useEffect(() => {
        if (detailContract) {
            loadProduct();
        }
    }, [detailContract]);

    useEffect(() => {
        if (pawnableProduct?.[0]?.pawnableProductId) {
            showAttribute(pawnableProduct[0].pawnableProductId);
        }
    }, [pawnableProduct]);

    const count = 0;

    const renderContent = () => (
        <>
            {/* Tiêu đề */}
            <div className="contents">
                {/* Thông tin khách hàng */}
                <div className="mgb21">
                    <div className="heading-info-user heading-user">
                        <div className="heading-info-user">
                            <h1 className="titile-user">Thông tin khách hàng</h1>
                        </div>
                    </div>
                    <div className="box__user">
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <div className="user__info">
                                        <div className="user__info-label">
                                            <p>Tên khách hàng :</p>
                                            <p>Số CMND/Hộ chiếu:</p>
                                        </div>
                                        <div className="user__info-input">
                                            <p>{detailContract.customerName}</p>
                                            <p>{detailContract.cccd}</p>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <div className="user__info">
                                        <div className="user__info-label">
                                            <p>Số điện thoại :</p>
                                            <p>Địa chỉ :</p>
                                        </div>
                                        <div className="user__info-input">
                                            <p>{detailContract.phoneNumber}</p>
                                            <p>{detailContract.address}</p>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
                </div>
                {/* thông tin cầm đồ */}
                <div className="mgb21">
                    <div className="heading-info-user heading-user">
                        <div className="heading-info-user">
                            <h1 className="titile-user">Thông tin cầm đồ</h1>
                        </div>
                    </div>
                    <div className="box__user">
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <div className="user__info">
                                        <div className="user__info-label">
                                            <p>Loại tài sản:</p>
                                            <p>Tên tài sản :</p>
                                            <p>Phí bảo hiểm:</p>
                                            <p>Phí lưu kho:</p>
                                            <p>Tổng số tiền vay:</p>
                                            <p>NV thu tiền:</p>
                                        </div>
                                        <div className="user__info-input">
                                            <p>{detailContract.typeOfProduct}</p>
                                            <p>{detailContract.assetName}</p>
                                            <div className="box__input">
                                                {detailContract.insuranceFee
                                                    ? formatMoney(detailContract.insuranceFee)
                                                    : '0 VNĐ'}
                                            </div>
                                            <div className="box__input">
                                                {detailContract.storageFee
                                                    ? formatMoney(detailContract.storageFee)
                                                    : '0 VNĐ'}
                                            </div>
                                            <div className="box__input">
                                                {detailContract.loan ? formatMoney(detailContract.loan) : '0 VNĐ'}
                                            </div>
                                            <p className="flend">{detailContract.userName}</p>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <div className="user__info">
                                        <div className="user__info-label">
                                            <p>Hình thức lãi:</p>
                                            <p>Kỳ lãi:</p>
                                            <p>Lãi mặc định:</p>
                                            <p>Lãi đề xuất:</p>
                                            <p>Số tiền lãi dự kiến :</p>
                                            <p>Kho: </p>
                                        </div>
                                        <div className="user__info-input">
                                            <p>{detailContract.packageName}</p>
                                            <p>{detailContract.paymentPeriod}</p>
                                            <p>{detailContract.packageInterest}%</p>
                                            <p>{detailContract.interestRecommend}%</p>
                                            <p>
                                                {detailContract.totalProfit
                                                    ? formatMoney(detailContract.totalProfit)
                                                    : '0 VNĐ'}
                                            </p>
                                            {detailContract.status === 4 ? (
                                                <Box sx={{ minWidth: 120 }}>
                                                    <FormControl>
                                                        <InputLabel>Kho</InputLabel>
                                                        <Select
                                                            disabled
                                                            value={warehouse ?? ''}
                                                            label="Kho"
                                                            onChange={updateWarehouse}
                                                        >
                                                            {availableWarehouses.map((item, index) => {
                                                                return (
                                                                    <MenuItem key={index} value={item.warehouseId}>
                                                                        {' '}
                                                                        {item.warehouseName}
                                                                    </MenuItem>
                                                                );
                                                            })}
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            ) : (
                                                <Box sx={{ minWidth: 120 }}>
                                                    <FormControl>
                                                        <InputLabel>Kho</InputLabel>
                                                        <Select
                                                            value={warehouse ?? ''}
                                                            label="Kho"
                                                            onChange={updateWarehouse}
                                                        >
                                                            {availableWarehouses.map((item, index) => {
                                                                return (
                                                                    <MenuItem key={index} value={item.warehouseId}>
                                                                        {' '}
                                                                        {item.warehouseName}
                                                                    </MenuItem>
                                                                );
                                                            })}
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            )}
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
                </div>
                {/* Thông tin tài sản */}

                <div className="mgb21">
                    <div className="heading-info-user heading-user">
                        <div className="heading-info-user">
                            <h1 className="titile-user">Thông tin tài sản</h1>
                        </div>
                    </div>
                    <div className="box__user">
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <div className="user__info">
                                            <div className="user__info-label">
                                                {attributes
                                                    ? attributes.map((item, index) => {
                                                        return (
                                                            <p key={index}>
                                                                {item.description}
                                                                {':'}
                                                            </p>
                                                        );
                                                    })
                                                    : ''}
                                            </div>
                                            <div className="user__info-input">
                                                {attributes
                                                    ? attributeInfo.map((item, index) => {
                                                        return <p>{item}</p>;
                                                    })
                                                    : ''}
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <div className="user__info-label">
                                            <p>Hình ảnh:</p>
                                        </div>
                                        <div>
                                            <a href={detailContract.assetImg} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={detailContract.assetImg}
                                                    alt=""
                                                    style={{ width: '400px', height: '300px' }}
                                                />
                                            </a>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
                </div>
            </div>
        </>
    );
    const handleCloseDialog = () => {
        setShowUpdateContract(false);
    };
    return (
        <>
            <CustomizeDiaglog
                open={showUpdateContract}
                onClose={handleCloseDialog}
                title={
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <p style={{ marginRight: '50px' }}>Cập nhật hợp đồng</p>

                        <h5>Mã hợp đồng: {detailContract.contractCode}</h5>
                    </Box>
                }
                content={renderContent()}

                action={
                    <div className="btn__group">
                        <ButtonCloseAnimation onConfirm={handleCloseDialog} />
                        {detailContract.status === 4 ? (
                            ''
                        ) : (
                            <Button
                                onClick={(e) => saveContract(e)}
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
                        )}
                    </div>
                }
                maxWidth={DIALOG_SIZE.xl}
            />
        </>
    );
};

export default UpdateContract;
