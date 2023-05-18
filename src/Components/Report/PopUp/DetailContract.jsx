// import React, { useEffect, useRef, useState } from 'react';
// import './popup.css';
// import user from '../../../asset/img/userpagedetai.png';
// import bike from '../../../asset/img/bike.png';
// import save from '../../../asset/img/save1.png';
// import close from '../../../asset/img/close1.png';
// import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import API from '../../../API.js';
// import BasicTabs from "../../DetailsPawn/PopUp/Tab";
// import moment from "moment";
// const UpdateContract = ({ setShowUpdateContract }) => {
//     // const [nameImg, setNameImg] = useState('');
//     // const [img, setImg] = useState('');
//     // const imginput = useRef();
//     // const [detailContract, setDetailContract] = useState([]);
//     // const [warehouse, setWarehouse] = useState([]);
//     // const [items, setItem] = useState([]);
//     // const saveContract = () => {
//     //     API({
//     //         method: 'put',
//     //         url: '/contract/updateContract/' + localStorage.getItem('contractId'),
//     //         data: {
//     //             insuranceFee: detailContract.insuranceFee,
//     //             storageFee: detailContract.storageFee,
//     //             loan: detailContract.loan,
//     //             warehouseId: warehouse.warehouseId,
//     //         },
//     //     })
//     //         .then((res) => {
//     //             console.log('Success Full');
//     //             alert('Lưu Thành Công');
//     //         })
//     //         .catch((err) => {
//     //             console.log(err);
//     //         });
//     // };

//     // useEffect(() => {
//     //     API({
//     //         method: 'get',
//     //         url: '/contract/getContractInfoByContractId/' + localStorage.getItem('show'),
//     //     }).then((res) => {
//     //         setDetailContract(res.data);
//     //         // console.log('aaaaa', res.data);
//     //     });

//     //     API({
//     //         method: 'get',
//     //         url: '/warehouse/GetAll/0',
//     //     }).then((res) => {
//     //         setWarehouse(res.data);
//     //         // console.log('aaaaa', res.data);
//     //     });

//     //     return () => {
//     //         img && URL.revokeObjectURL(img.preview);
//     //     };
//     // }, [img]);
//     // const handleClickImg = () => {
//     //     imginput.current.click();
//     // };
//     // const handleImg = (e) => {
//     //     const file = e.target.files[0];
//     //     setNameImg(file.name);
//     //     file.preview = URL.createObjectURL(file);
//     //     setImg(file.preview);
//     // };
//     // return (
//     //     <div>
//     //         <div className="add-contract" onClick={() => setShowUpdateContract(false)}>
//     //             <div className="content-contract" onClick={(e) => e.stopPropagation()}>
//     //                 {/* Tiêu đề */}
//     //                 <div className="heading-contract">
//     //                     <h1>Hợp đồng đã đóng</h1>
//     //                     <div className="sub-heading">
//     //                         <p>Mã hợp đồng: {detailContract.contractCode}</p>
//     //                     </div>
//     //                 </div>
//     //                 <div className="contents">
//     //                     {/* Thông tin khách hàng */}
//     //                     <div className="mgb21">
//     //                         <div className="heading-info-user heading-user">
//     //                             <div className="heading-info-user">
//     //                                 <img src={user} alt="hk" />
//     //                                 <h1 className="titile-user">Thông tin khách hàng</h1>
//     //                             </div>
//     //                         </div>
//     //                         <div className="box__user">
//     //                             <Box sx={{ flexGrow: 1 }}>
//     //                                 <Grid container spacing={2}>
//     //                                     <Grid item xs={12} md={6}>
//     //                                         <div className="user__info">
//     //                                             <div className="user__info-label">
//     //                                                 <p>Tên khách hàng :</p>
//     //                                                 <p>Số CMND/Hộ chiếu:</p>
//     //                                             </div>
//     //                                             <div className="user__info-input">
//     //                                                 <p>{detailContract.customerName}</p>
//     //                                                 <p>{detailContract.cccd}</p>
//     //                                             </div>
//     //                                         </div>
//     //                                     </Grid>
//     //                                     <Grid item xs={12} md={6}>
//     //                                         <div className="user__info">
//     //                                             <div className="user__info-label">
//     //                                                 <p>Số điện thoại :</p>
//     //                                                 <p>Địa chỉ :</p>
//     //                                             </div>
//     //                                             <div className="user__info-input">
//     //                                                 <p>{detailContract.phoneNumber}</p>
//     //                                                 <p>{detailContract.address}</p>
//     //                                             </div>
//     //                                         </div>
//     //                                     </Grid>
//     //                                 </Grid>
//     //                             </Box>
//     //                         </div>
//     //                     </div>
//     //                     {/* thông tin cầm đồ */}
//     //                     <div className="mgb21">
//     //                         <div className="heading-info-user heading-user">
//     //                             <div className="heading-info-user">
//     //                                 <img src={user} alt="hk" />
//     //                                 <h1 className="titile-user">Thông tin cầm đồ</h1>
//     //                             </div>
//     //                         </div>
//     //                         <div className="box__user">
//     //                             <Box sx={{ flexGrow: 1 }}>
//     //                                 <Grid container spacing={2}>
//     //                                     <Grid item xs={12} md={6}>
//     //                                         <div className="user__info">
//     //                                             <div className="user__info-label">
//     //                                                 <p>Loại tài sản:</p>
//     //                                                 <p>Tên tài sản :</p>
//     //                                                 <p>Phí bảo hiểm:</p>
//     //                                                 <p>Phí lưu kho:</p>
//     //                                                 <p>Tổng số tiền vay:</p>
//     //                                                 <p>NV thu tiền:</p>
//     //                                             </div>
//     //                                             <div className="user__info-input">
//     //                                                 <p>{detailContract.typeOfProduct}</p>
//     //                                                 <p>{detailContract.assetName}</p>
//     //                                                 <div className="box__input">
//     //                                                     <p>{detailContract.insuranceFee} VND</p>
//     //                                                 </div>
//     //                                                 <div className="box__input">
//     //                                                     <p>{detailContract.storageFee} VND</p>
//     //                                                 </div>
//     //                                                 <div className="box__input">
//     //                                                     <p>{detailContract.loan} VND</p>
//     //                                                 </div>
//     //                                                 <p>{detailContract.userName} </p>
//     //                                             </div>
//     //                                         </div>
//     //                                     </Grid>
//     //                                     <Grid item xs={12} md={6}>
//     //                                         <div className="user__info">
//     //                                             <div className="user__info-label">
//     //                                                 <p>Hình thức lãi:</p>
//     //                                                 <p>Kỳ lãi:</p>
//     //                                                 <p>Ngày vay:</p>
//     //                                                 <p>Số tháng vay:</p>
//     //                                                 <p>Số tiền lãi dự kiến :</p>
//     //                                                 <p>Kho: </p>
//     //                                             </div>
//     //                                             <div className="user__info-input">
//     //                                                 <p>{detailContract.packageName}</p>
//     //                                                 <p className="flcenter">{detailContract.paymentPeriod}</p>
//     //                                                 <p className="flcenter">{detailContract.packageInterest}</p>
//     //                                                 <p className="flcenter">{detailContract.totalProfit}</p>
//     //                                             </div>
//     //                                         </div>
//     //                                     </Grid>
//     //                                 </Grid>
//     //                             </Box>
//     //                         </div>
//     //                     </div>
//     //                     {/* Thông tin tài sản */}

//     //                     <div className="mgb21">
//     //                         <div className="heading-info-user heading-user">
//     //                             <div className="heading-info-user">
//     //                                 <img src={bike} alt="hk" />
//     //                                 <h1 className="titile-user">Thông tin tài sản</h1>
//     //                             </div>
//     //                         </div>
//     //                         <div className="box__user">
//     //                             <Box sx={{ flexGrow: 1 }}>
//     //                                 <Grid container spacing={2}>
//     //                                     <Grid item xs={12} md={6}>
//     //                                         <div className="user__info">
//     //                                             <div className="user__info-label">
//     //                                                 <p>Số seri :</p>
//     //                                                 <p>Hình ảnh :</p>
//     //                                             </div>
//     //                                             <div className="user__info-input">
//     //                                                 <label></label>
//     //                                                 <div className="input__img" onClick={handleClickImg}></div>
//     //                                             </div>
//     //                                         </div>
//     //                                     </Grid>
//     //
//     //                                 </Grid>
//     //                             </Box>
//     //                         </div>
//     //                     </div>
//     //                     <div>
//     //                         <img src={img} alt="" style={{ width: '100%' }} />
//     //                     </div>
//     //                 </div>
//     //             </div>
//     //         </div>
//     //     </div>
//     // );

//     const handleClose = () => {
//         setShowUpdateContract(false);
//     };
//     const [contractDetail, setContractDetail] = useState([]);
//     return (
//         <div className='add-contract'>
//             <div className="content-contract">
//                 <div className="heading-contract">
//                     <h1>Bảng chi tiết hợp đồng cầm đồ</h1>
//                     <Grid item xs={12} md={6}>
//                             <div className="btn__group">
//                                 <button className="btn btn__close" onClick={handleClose}>
//                                     <img src={close} alt="" />
//                                     Đóng
//                                 </button>
//                             </div>
//                         </Grid>
//                 </div>
//                 <div className="contents">
//                     <div className="box__liquidation">
//                         <div className="full_detailContract">
//                             <table className="table__detailContract">
//                                 <tr >
//                                     <th colSpan="2">Khách hàng</th>
//                                     <th colSpan="2" style={{ textAlign: "right" }}>
//                                         <span className="start-red">Test KH</span>
//                                         <span> - </span>
//                                         <span >
//                                             <span ><LocalPhoneIcon fontSize="small" className="detailContract_icon-phone" />
//                                             </span> 0938495005</span>
//                                     </th>
//                                 </tr>
//                                 <tr>
//                                     <th colSpan="2">Tiền cầm</th>
//                                     <th colSpan="2" className="start-red" style={{ textAlign: "right" }}>"0 VNĐ"</th>
//                                 </tr>
//                                 <tr>
//                                     <th colSpan="2">Vay từ ngày</th>
//                                     <th colSpan="1" style={{ textAlign: "right" }}>{moment("0001-01-01T00:00:00").format('DD/MM/YYYY')}</th>
//                                     <th colSpan="1" style={{ textAlign: "right" }}>{moment("0001-01-01T00:00:00").format('DD/MM/YYYY')}</th>
//                                 </tr>
//                             </table>
//                             <table className="table__detailContract">
//                                 <tr>
//                                     <th>Lãi suất</th>
//                                     <th style={{ textAlign: "right" }}>
//                                         <span>2%</span>
//                                     </th>
//                                 </tr>
//                                 <tr>
//                                     <th>Tiền lãi đã đóng</th>
//                                     <th className="start-red" style={{ textAlign: "right" }}>"0 VNĐ"</th>
//                                 </tr>
//                                 <tr>
//                                     <th>Nợ lãi cũ:</th>
//                                     <th style={{ textAlign: "right" }}><span className="start-red">""</span></th>

//                                 </tr>
//                                 <tr>
//                                     <th>Trạng thái:</th>
//                                     {/* {detailPawn.status === 1
//                                         ? <th style={{ textAlign: "right" }}><span className="detailContract_status" style={{ backgroundColor: "#50c2da" }}>Đang cầm</span></th> : detailPawn.status === 2 ?
//                                             <th style={{ textAlign: "right" }}><span className="detailContract_status" style={{ backgroundColor: "#d4d05c" }}>Trễ hẹn</span></th> :
//                                             detailPawn.status === 3 ?
//                                                 <th style={{ textAlign: "right" }}><span className="detailContract_status" style={{ backgroundColor: "#d45c5c" }}>Thanh lý</span></th> : ""} */}
//                                 </tr>
//                             </table>
//                         </div>
//                         <div sx={{ alignItems: 'center', alignContent: 'center' }}>
//                             {/* <BasicTabs showContractId={showContractId} /> */}
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// };

// export default UpdateContract;
