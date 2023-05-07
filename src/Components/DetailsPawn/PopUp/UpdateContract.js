import React, { useEffect, useRef, useState } from 'react';
import './popup.css';
import user from '../../../asset/img/userpagedetai.png';
import bike from '../../../asset/img/bike.png';
import save from '../../../asset/img/save1.png';
import close from '../../../asset/img/close1.png';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import API from '../../../API.js';
import BtnSave from '../../ButtonUI/BtnSave/BtnSave';
import BtnCloseAnimation from '../../ButtonUI/BtnCloseAnimation/BtnCloseAnimation';
import { Button } from '@mui/material';
const UpdateContract = ({ setShowUpdateContract, showUpdateContract }) => {
    const [nameImg, setNameImg] = useState('');
    const [img, setImg] = useState('');
    const imginput = useRef();
    const [detailContract, setDetailContract] = useState([]);
    const [warehouse, setWarehouse] = useState([]);
    const [pawnableProduct, setPawnableProduct] = useState();
    const [attributeInfo, setAttributeInfo] = useState([]);
    const [branch, setbranch] = useState();
    const updateValue = ({ target }) => {
        setbranch(target.value);
    };

    function getPermission(e) {
        updateValue(e);
        console.log('log at get permission', e.target.value);
        sessionStorage.setItem('selected branch', e.target.value);
        // API({
        //     method: 'post',
        //     url: '/permission/showpermission',
        //     data: {
        //         userId: e.target.value,
        //         nameUser: 'string',
        //     },
        // }).then((res) => {
        //     setEmployeePermission(res.data);
        //     for (let i = 0; i < 5; i++) {
        //         localStorage.setItem('permis ' + i, res.data[i].status);
        //         console.log('employee permis:', res.data[i].status);
        //     }

        // });
    }
    const saveContract = () => {

        // API({
        //   method: 'put',
        //   url: '/contract/updateContract/' + localStorage.getItem("PawnDetailID"),
        //   data: {
        //     insuranceFee: detailContract.insuranceFee,
        //     storageFee: detailContract.storageFee,
        //     loan: detailContract.loan,
        //     warehouseId: warehouse.warehouseId
        //   },
        // })
        //   .then((res) => {
        //     console.log('Success Full');
        //     alert('Lưu Thành Công');
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   })
    };
    const [attributes, setAttributes] = useState();
    function showAttribute(id) {
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

    const [contractAttributes, setContractAttributes] = useState([]);
    async function loadContractDetail() {
        console.log('Load detail');
        try {
            API({
                method: 'get',
                url: '/contract/getContractInfoByContractId/' + localStorage.getItem('PawnDetailID'),
            }).then((res) => {
                console.log("====================")
                console.log(res.data);
                console.log("====================")
                setDetailContract(res.data);
                setAttributeInfo(res.data.attributeInfos);
                // console.log('attr info', res.data.attributeInfos[]);
            });
        } catch (error) {

        }
    }

    async function loadWarehouse() {
        API({
            method: 'get',
            url: '/warehouse/GetAll/0',
        }).then((res) => {
            setWarehouse(res.data);
            // console.log('aaaaa', res.data);
        });
    }


    async function loadProduct() {
        API({
            method: 'get',
            url: 'pawnableProduct/getAll/0',
        }).then((res) => {
            console.log("----------------------")
            console.log(res.data);
            console.log("----------------------")
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

    useEffect(()=>{
        if(detailContract){
            loadProduct();
        }
    },[detailContract])

    useEffect(() =>{
        if(pawnableProduct?.[0]?.pawnableProductId){
            showAttribute(pawnableProduct[0].pawnableProductId);
        }
    },[pawnableProduct])
    const formatMoney = (value) => {
        return value.toLocaleString('vi-VN') + ' VNĐ';
    };
    return (
        <div>
            <div className="add-contract" onClick={() => setShowUpdateContract(false)}>
                <div className="content-contract" onClick={(e) => e.stopPropagation()}>
                    {/* Tiêu đề */}
                    <div className="heading-contract">
                        <h1>Cập nhật hợp đồng</h1>
                        <div className="sub-heading">
                            <p>Mã hợp đồng: {detailContract.contractCode}</p>
                        </div>
                    </div>
                    <div className="contents">
                        {/* Thông tin khách hàng */}
                        <div className="mgb21">
                            <div className="heading-info-user heading-user">
                                <div className="heading-info-user">
                                    <img src={user} alt="hk" />
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
                                    <img src={user} alt="hk" />
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
                                                        {detailContract.loan
                                                            ? formatMoney(detailContract.loan)
                                                            : '0 VNĐ'}
                                                    </div>
                                                    <p>{detailContract.userName} </p>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <div className="user__info">
                                                <div className="user__info-label">
                                                    <p>Hình thức lãi:</p>
                                                    <p>Kỳ lãi:</p>
                                                    {/* <p>Ngày vay:</p> */}
                                                    <p>Lãi mặc định</p>
                                                    <p>Số tiền lãi dự kiến :</p>
                                                    <p>Kho: </p>
                                                </div>
                                                <div className="user__info-input">
                                                    <p>{detailContract.packageName}</p>
                                                    <p className="flcenter">{detailContract.paymentPeriod}</p>
                                                    <p className="flcenter">{detailContract.packageInterest}</p>
                                                    <p className="flcenter">
                                                        {detailContract.totalProfit
                                                            ? formatMoney(detailContract.totalProfit)
                                                            : '0 VNĐ'}</p>
                                                    <select value={branch} onChange={getPermission}>
                                                        {warehouse.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item.warehouseId}>
                                                                    {item.warehouseName}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
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
                                    <img src={bike} alt="hk" />
                                    <h1 className="titile-user">Thông tin tài sản</h1>
                                </div>
                            </div>
                            <div className="box__user">
                                <Box sx={{ flexGrow: 1 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <div className="user__info">
                                                <div className="user__info-label">
                                                    {/* <p>
                            Số seri <span class="start-red">*</span>:
                          </p> */}
                                                    {attributes
                                                        ? attributes.map((item, index) => {
                                                            return (
                                                                <p key={index}>
                                                                    {item.description}{' '}
                                                                    <span class="start-red">*</span>:
                                                                </p>
                                                            );
                                                        })
                                                        : ''}
                                                    <p>
                                                        Hình ảnh <span class="start-red">*</span>:
                                                    </p>
                                                </div>
                                                <div className="user__info-input">
                                                    {/* <input type="text" name="name" placeholder="Nhập tên khách hàng" value={seri[0] ? seri[0].attributes.length : ""} /> */}
                                                    {attributes
                                                        ? attributeInfo.map((item, index) => {
                                                            return <p>{item}</p>;
                                                        })
                                                        : ''}
                                                    <div>{/* <img src="" alt="img"/> */}</div>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <div className="btn__group">
                                                {/* <button className="btn btn__save" type="submit" onClick={saveContract}>
                                                    <img src={save} alt="" />
                                                    Lưu lại
                                                </button> */}

                                                <Button type="submit" onClick={saveContract}>
                                                    <BtnSave />
                                                </Button>
                                                <Button variant="outlined" color="error" size="medium">
  Error
</Button>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </div>
                        </div>
                        <div>
                            <img src={img} alt="" style={{ width: '100%' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateContract;
