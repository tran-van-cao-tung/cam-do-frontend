import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import './popup.css';
import bike from '../../../asset/img/bike.png';
import API from '../../../API';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { AuthContext } from '../../../helpers/AuthContext';
import userImg from '../../../asset/img/user.png';

import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Uploader } from 'uploader';
import { UploadDropzone } from 'react-uploader';

import CustomizeDiaglog, { DIALOG_SIZE } from '../../../helpers/CustomizeDiaglog';
import { Save } from '@mui/icons-material';
import ButtonCloseAnimation from '../../ButtonUI/BtnCloseAnimation/ButtonCloseAnimation';
import { formatMoney } from '../../../helpers/dateTimeUtils';
import { toast } from 'react-toastify';

const AddContract = ({ setShowAddContract, showAddContract, refresh }) => {
    const { authState, currentBranchId, userInfo } = useContext(AuthContext);
    const [img, setImg] = useState('');
    const [refesh, setRefesh] = useState(false);
    const [contract, setContract] = useState({});
    const [pawnableProduct, setPawnableProduct] = useState([]);
    const [packagelist, setPackage] = useState([]);
    const [packageItem, setPackageItem] = useState(null);
    const [warehouses, setWarehouses] = useState([]);
    const [totalProfit, setTotalProfit] = useState(0);
    const [cycle, setCycle] = useState(0);
    const [selectedInterest, setSelectedInterest] = useState(0);
    const [warehouse, setWarehouse] = useState('');
    const [insuranceFee, setInsuranceFee] = useState(200000);
    const [storageFee, setStorageFee] = useState(200000);

    const uploader = Uploader({ apiKey: 'public_FW25bMK3mpqVXpSPo5c1xtLs1fF1' }); // Your real API key.
    const uploaderOptions = {
        multi: true,

        // Comment out this line & use 'onUpdate' instead of
        // 'onComplete' to have the dropzone close after upload.
        showFinishButton: true,

        styles: {
            colors: {
                primary: '#377dff',
            },
        },
    };
    useEffect(() => {}, []);

    const handleImg = (inputImg) => {
        console.log('img is:', inputImg);
        setImg(inputImg);
    };

    async function loadWarehouse() {
        API({
            method: 'get',
            url: 'warehouse/getAllActive/0',
        }).then((res) => {
            setWarehouses(res.data);
            setWarehouse(res.data[0].warehouseId);
        });
    }

    useEffect(() => {
        loadWarehouse();
    }, []);

    const updateWarehouse = ({ target }) => {
        setWarehouse(target.value);
    };
    //Submit dữ liệu contract
    const handleSubmit = () => {
        const data = {
            customerId: customer.customerId,
            userId: userInfo.userId,
            branchId: currentBranchId,
            totalProfit: profit,
            warehouseId: warehouse,
            pawnableProductId: contract.pawnableProductId,
            packageId: packageItem.packageId,
            contractAssetName: contract.contractAssetName,
            insuranceFee: insuranceFee,
            storageFee: storageFee,
            loan: contract.loan,
            assetImg: img,
            pawnableAttributeDTOs: contractAttributes,
            interestRecommend: interestRecommend?? 0,
            description: 'string',
        };
        API({
            method: 'post',
            url: '/contract/createContract',
            data: data,
        })
            .then((res) => {
                refresh();
                toast.success('Tạo hợp đồng thành công');
                setShowAddContract(false);
                // window.location.reload(false);
            })
            .catch((err) => {
                toast.error('Tạo hơp đồng thất bại');
            });
    };

    //get dữ liệu pawnableProduct
    useEffect(() => {
        API({
            method: 'get',
            url: 'pawnableProduct/getAll/0',
        }).then((res) => {
            setPawnableProduct(res.data);
        });
    }, []);

    //get dữu liệu package
    useEffect(() => {
        API({
            method: 'get',
            url: 'package/getAll/0',
        }).then((res) => {
            setPackage(res.data);
            setTotalProfit(contract.loan);
        });
    }, []);

    function getInterest(pckID) {
        API({
            method: 'get',
            url: '/package/getPackageById/' + pckID,
        })
            .then((res) => {
                setSelectedInterest(res.data.packageInterest);
                setCycle(res.data.day / res.data.paymentPeriod);
            })
            .catch((err) => console.log('err at getInterest log 145'));
    }

    const [interestRecommend, setInterestRecommend] = useState(null);
    const handleRecommended = (e) => {
        const value = e.target.value;
        setInterestRecommend(!!value ? parseInt(value) : 0);
    };
    const profit = useMemo(() => {
        const _interest = interestRecommend ?? selectedInterest;
        if (
            _interest == null ||
            insuranceFee == null ||
            storageFee == null ||
            contract?.loan == null ||
            cycle == null
        ) {
            return 0;
        }
        let _fee = parseInt(insuranceFee) + parseInt(storageFee);
        return contract.loan * (_interest / 100) + _fee * cycle;
    }, [insuranceFee, storageFee, contract?.loan, selectedInterest, interestRecommend, cycle]);

    const handlePackageItem = (e) => {
        setPackageItem(
            packagelist.find((item) => {
                return item.packageId == e.target.value;
            }),
        );
        getInterest(e.target.value);
        setRefesh(!refesh);
    };

    const handleInput = (e) => {
        e.persist();
        setContract({ ...contract, [e.target.name]: e.target.value });
    };

    const handleSum = (e) => {
        const value = e.target.value;
        const _finalValue = !!value ? parseInt(value) : null;
        setContract((prev) => ({ ...prev, [e.target.name]: _finalValue }));
        if (e.target.name === 'insuranceFee') {
            setInsuranceFee(_finalValue);
        } else if (e.target.name === 'storageFee') {
            setStorageFee(_finalValue);
        }
    };

    const [customer, setCustomer] = useState();
    //Get dữ liệu customer bằng cccd
    const handleCustomer = (e) => {
        let value = e.target.value;
        API({
            method: 'get',
            url: `customer/getByCCCD/${value}`,
        })
            .then((res) => {
                setCustomer(res.data);
            })
            .catch((err) => console.log(err));
    };
    const [attributes, setAttributes] = useState();

    //get dữ liệu seri bằng dựa vào loại tài sản
    const handleSeri = (e) => {
        API({
            method: 'get',
            url: `pawnableProduct/getPawnAbleProductById/${e.target.value}`,
        })
            .then((res) => {
                setAttributes(res.data.attributes);
                setContract({ ...contract, pawnableProductId: e.target.value });
            })
            .catch((err) => console.log(err));
    };

    const [contractAttributes, setContractAttributes] = useState([]);
    const hanleInputAttribute = (e, id, index) => {
        const newArray = [...contractAttributes];
        if (e.target.name == index) {
            newArray[index] = {
                pawnableProductId: id,
                description: e.target.value,
            };
        }
        setContractAttributes(newArray);
        console.log(contractAttributes);
    };
    const renderContent = () => (
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
                                        <p>
                                            Tên khách hàng <span class="start-red">*</span>:
                                        </p>
                                        <p>Số CMND/Hộ chiếu:</p>
                                    </div>
                                    <div className="user__info-input">
                                        <input
                                            type="text"
                                            placeholder="Nhập tên khách hàng"
                                            name="customerName"
                                            onChange={(e) => handleInput(e)}
                                            value={customer ? customer.fullName : contract.customerName}
                                        />
                                        <input
                                            type="text"
                                            name="cccd"
                                            placeholder="Nhập CMND/Hộ chiếu"
                                            onMouseOut={(e) => handleCustomer(e)}
                                        />
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div className="user__info">
                                    <div className="user__info-label">
                                        <p>
                                            Số điện thoại <span class="start-red">*</span>:
                                        </p>
                                        <p>
                                            Địa chỉ <span class="start-red">*</span>:
                                        </p>
                                    </div>
                                    <div className="user__info-input">
                                        <input
                                            type="text"
                                            name="phone"
                                            placeholder="Nhập số điện thoại"
                                            value={customer ? customer.phone : ''}
                                        />
                                        <input
                                            type="text"
                                            name="address"
                                            placeholder="Nhập địa chỉ khách hàng"
                                            value={customer ? customer.address : ''}
                                        />
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
                                        <p>
                                            Loại tài sản<span class="start-red">*</span>:
                                        </p>
                                        <p>
                                            Tên tài sản <span class="start-red">*</span>:
                                        </p>
                                        <p>
                                            Phí bảo hiểm<span class="start-red">*</span>:
                                        </p>
                                        <p>
                                            Phí lưu kho<span class="start-red">*</span>:
                                        </p>
                                        <p>
                                            Tổng số tiền vay<span class="start-red">*</span>:
                                        </p>
                                        <p>
                                            NV thu tiền<span class="start-red">*</span>:
                                        </p>
                                    </div>
                                    <div className="user__info-input">
                                        {/* Lấy dữ liệu từ PawnableProduct */}
                                        <select onChange={(e) => handleSeri(e)}>
                                            <option>---Loại tài sản---</option>
                                            {pawnableProduct.map((item, index) => {
                                                return (
                                                    <option value={item.pawnableProductId} key={index}>
                                                        {item.typeOfProduct}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        <input
                                            type="text"
                                            name="contractAssetName"
                                            placeholder="Nhập tên tài sản"
                                            onChange={(e) => handleInput(e)}
                                        />
                                        <div className="box__input">
                                            <input
                                                type="number"
                                                name="insuranceFee"
                                                onChange={(e) => {
                                                    handleSum(e);
                                                }}
                                                value={insuranceFee}
                                            />
                                            <span>VNĐ</span>
                                        </div>
                                        <div className="box__input">
                                            <input
                                                type="number"
                                                name="storageFee"
                                                onChange={(e) => {
                                                    handleSum(e);
                                                }}
                                                value={storageFee}
                                            />
                                            <span>VNĐ</span>
                                        </div>
                                        <div className="box__input">
                                            <input
                                                type="number"
                                                name="loan"
                                                onChange={(e) => {
                                                    handleSum(e);
                                                }}
                                                value={contract?.loan}
                                            />
                                            <span>VNĐ</span>
                                        </div>
                                        <span style={{ width: '100%', height: '5px' }}>
                                            {userInfo ? userInfo.fullName : ''}
                                        </span>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div className="user__info">
                                    <div className="user__info-label">
                                        <p>
                                            Chọn gói cầm <span class="start-red">*</span>:
                                        </p>
                                        <p>Tổng ngày vay:</p>
                                        <p>Số ngày mõi kỳ: </p>
                                        {/*
                                            <p>Ngày vay:</p> */}
                                        <p>Lãi mặc định:</p>
                                        <p>Lãi đề xuất: </p>
                                        <p>Kho:</p>
                                        <p>Số tiền lãi dự kiến :</p>
                                    </div>
                                    <div className="user__info-input">
                                        {/* Lấy dữ liệu từ Package */}
                                        <select style={{ padding: '7px 0' }} onChange={(e) => handlePackageItem(e)}>
                                            <option>---Gói Cầm---</option>
                                            {packagelist.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.packageId}>
                                                        {item.packageName}
                                                    </option>
                                                );
                                            })}
                                        </select>

                                        <p className="flcenter">{packageItem?.day ?? ''} Ngày</p>
                                        <p className="flcenter">{packageItem?.paymentPeriod ?? ''} Ngày</p>
                                        {/* <input type="date" /> */}
                                        <p className="flcenter">{packageItem ? packageItem.packageInterest : ''}%</p>
                                        <input
                                            style={{ padding: '5px 0' }}
                                            type="number"
                                            name="interestRecommend"
                                            onChange={(e) => handleRecommended(e)}
                                        />
                                        <Box sx={{ minWidth: 120 }}>
                                            <FormControl>
                                                <InputLabel>Kho</InputLabel>
                                                <Select value={warehouse ?? ''} label="Kho" onChange={updateWarehouse}>
                                                    {warehouses.map((item, index) => {
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

                                        <p className="flend">{profit ? formatMoney(profit) : '0 VND'}</p>
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
                            <Grid item xs={12} md={6}>
                                <div className="user__info">
                                    <div className="user__info-label">
                                        {attributes
                                            ? attributes.map((item, index) => {
                                                  return (
                                                      <p key={index}>
                                                          {item.description} <span class="start-red">*</span>:
                                                      </p>
                                                  );
                                              })
                                            : ''}
                                    </div>
                                    <div className="user__info-input">
                                        {attributes
                                            ? attributes.map((item, index) => {
                                                  return (
                                                      <input
                                                          type="text"
                                                          name={index}
                                                          onChange={(e) =>
                                                              hanleInputAttribute(e, item.pawnableProductId, index)
                                                          }
                                                          placeholder={`Nhập ${item.description}`}
                                                      />
                                                  );
                                              })
                                            : ''}
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div className="user__info-label">
                                    <p>
                                        Hình ảnh <span class="start-red">*</span>:
                                    </p>
                                </div>
                                <div>
                                    {img ? (
                                        <a href={img} target="_blank" rel="noopener noreferrer">
                                            <img src={img} alt="" style={{ width: '400px', height: '300px' }} />
                                        </a>
                                    ) : (
                                        <UploadDropzone
                                            uploader={uploader}
                                            options={uploaderOptions}
                                            onUpdate={(files) => console.log(files.map((x) => x.fileUrl).join('\n'))}
                                            onComplete={(files) => handleImg(files.map((x) => x.fileUrl).join('\n'))}
                                            width="600px"
                                            height="375px"
                                        />
                                    )}
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </div>
        </div>
    );

    const handleCloseDialog = () => {
        setShowAddContract(false);
    };

    return (
        <>
            <CustomizeDiaglog
                open={showAddContract}
                onClose={handleCloseDialog}
                title="Thêm mới hợp đồng"
                content={renderContent()}
                action={
                    <div className="btn__group">
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleSubmit}
                            sx={{
                                fontSize: '16px',
                                padding: '15px 30px',
                            }}
                            startIcon={<Save />}
                        >
                            Lưu Lại
                        </Button>
                    </div>
                }
                maxWidth={DIALOG_SIZE.xl}
            />
        </>
    );
};

export default AddContract;
