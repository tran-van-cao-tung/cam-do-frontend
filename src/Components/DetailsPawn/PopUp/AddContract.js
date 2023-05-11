import React, { useContext, useEffect, useRef, useState } from 'react';
import './popup.css';
import bike from '../../../asset/img/bike.png';
// import save from '../../../asset/img/save1.png';
// import close from '../../../asset/img/close1.png';
import API from '../../../API';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { AuthContext } from '../../../helpers/AuthContext';
import BtnCloseAnimation from '../../ButtonUI/BtnCloseAnimation/BtnCloseAnimation';
import BtnSave from '../../ButtonUI/BtnSave/BtnSave';
import { Button } from '@mui/material';
import { Uploader } from 'uploader';
import { UploadDropzone } from 'react-uploader';

const AddContract = ({ setShowAddContract, showAddContract }) => {
    const { authState, currentBranchId, userInfo} = useContext(AuthContext);
    const [img, setImg] = useState('');
    const [refesh, setRefesh] = useState(false);
    const [contract, setContract] = useState([]);
    const [pawnableProduct, setPawnableProduct] = useState([]);
    const [packagelist, setPackage] = useState([]);
    const [packageItem, setPackageItem] = useState([]);

    const uploader = Uploader({ apiKey: 'public_W142hpZ5oMgnCoyobLDGdqTbp4NX' }); // Your real API key.
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
    useEffect(() => {
        return () => {
            img && URL.revokeObjectURL(img.preview);
        };
    }, [img]);
    const [user, setUser] = useState();

    const handleImg = (inputImg) => {
        console.log("img is:", inputImg);
        setImg(inputImg);
    };

    //Submit dữ liệu contract
    const hanldeSubmit = (e) => {
        e.preventDefault();
        const data = {
            customerId: customer.customerId,
            userId: userInfo.userId,
            userBranchId: currentBranchId,
            totalProfit: 0,
            warehouseId: 1,
            pawnableProductId: contract.pawnableProductId,
            packageId: packageItem[0].packageId,
            contractAssetName: contract.contractAssetName,
            insuranceFee: contract.insuranceFee,
            storageFee: contract.storageFee,
            loan: contract.loan,
            assetImg: img,
            pawnableAttributeDTOs: contractAttributes,
            interestRecommend: contract.interestRecommend,
            description: 'string',
        };
        API({
            method: 'post',
            url: '/contract/createContract',
            data: data,
        }).then((res) => {
            alert('Tạo hợp đồng thành công');
            console.log('thành công');
            window.location.reload(false);
        });
        console.log(data);
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
        });
    }, []);

    //get dữ liệu Lấy userId
    useEffect(() => {
        API({
            method: 'get',
            url: 'user/getAll/0',
        })
            .then((res) => {
                setUser(
                    res.data.filter((item, index) => {
                        return item.userId === userInfo.userId;
                    })[0],
                );
            })
            .catch((err) => console.log(err));
    }, [userInfo]);

    const hanldePackageItem = (e) => {
        setPackageItem(
            packagelist.filter((item) => {
                return item.packageId == e.target.value;
            }),
        );
        setRefesh(!refesh);
    };

    const handleInput = (e) => {
        e.persist();
        setContract({ ...contract, [e.target.name]: e.target.value });
    };

    const handleSum = (e) => {
        setContract({ ...contract, [e.target.name]: e.target.value });
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

    return (
        <div className="add-contract" onClick={() => setShowAddContract(false)}>
            <div className="content-contract" onClick={(e) => e.stopPropagation()}>
                {/* Tiêu đề */}
                <div className="heading-contract">
                    <h1>Thêm mới hợp đồng</h1>
                    {/*  <div className="sub-heading">
            <p>
              Mã hợp đồng <span className="start-red">*</span>: CĐ-0007
            </p>
            <p>Điểm tín dụng: 0</p>
          </div> */}
                </div>
                <div className="contents">
                    <form onSubmit={hanldeSubmit}>
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
                                                            placeholder="0"
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
                                                            placeholder="0"
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
                                                            placeholder="0"
                                                        />
                                                        <span>VNĐ</span>
                                                    </div>
                                                    <span style={{ width: '100%', height: '10px' }}>
                                                        {user ? user.fullName : ''}
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
                                                    <p>Kỳ lãi:</p>
                                                    {/* <p>Ngày vay:</p> */}
                                                    <p>Lãi mặc định:</p>
                                                    <p>Lãi đề xuất: </p>
                                                    <p>Số tiền lãi dự kiến :</p>
                                                </div>
                                                <div className="user__info-input">
                                                    {/* Lấy dữ liệu từ Package */}
                                                    <select onChange={(e) => hanldePackageItem(e)}>
                                                        <option>---Gói Cầm---</option>
                                                        {packagelist.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item.packageId}>
                                                                    {item.packageName}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>

                                                    <p className="flcenter">
                                                        {packageItem[0] ? packageItem[0].day : ''} Ngày
                                                    </p>
                                                    {/* <input type="date" /> */}
                                                    <p className="flcenter">
                                                        {packageItem[0] ? packageItem[0].packageInterest : ''}%
                                                    </p>
                                                    <input
                                                        type="number"
                                                        name="interestRecommend"
                                                        onChange={(e) => handleInput(e)}
                                                    />
                                                    <p className="flend">{ }</p>
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

                                                </div>
                                                <div className="user__info-input">
                                                    {attributes
                                                        ? attributes.map((item, index) => {
                                                            return (
                                                                <input
                                                                    type="text"
                                                                    name={index}
                                                                    onChange={(e) =>
                                                                        hanleInputAttribute(
                                                                            e,
                                                                            item.pawnableProductId,
                                                                            index,
                                                                        )
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
                                                {
                                                    img ? (
                                                        <a href={img} target="_blank" rel="noopener noreferrer">
                                                            <img src={img} alt="" style={{ width: '400px', height: '300px' }} />
                                                        </a>
                                                    ) :
                                                        <UploadDropzone
                                                            uploader={uploader}
                                                            options={uploaderOptions}
                                                            onUpdate={(files) => console.log(files.map((x) => x.fileUrl).join('\n'))}
                                                            onComplete={(files) => handleImg(files.map((x) => x.fileUrl).join('\n'))}
                                                            width="600px"
                                                            height="375px"
                                                        />
                                                }
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </div>
                            <div className="btn__group">
                                {/* <button className="btn btn__save" type="submit">
                                    <img src={save} alt="" />
                                    Lưu lại
                                </button> */}
                                <Button onClick={(e) => hanldeSubmit(e)}>
                                    <BtnSave />
                                </Button>
                                <BtnCloseAnimation
                                    showAddContract={showAddContract}
                                    setShowAddContract={setShowAddContract}
                                />
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddContract;
