import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import { Uploader } from 'uploader';
import { UploadDropzone } from 'react-uploader';
import API from '../../../API';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import BtnSave from '../../ButtonUI/BtnSave/BtnSave';
import BtnCloseAnimation from '../../ButtonUI/BtnCloseAnimation/BtnCloseAnimation';
function Expiration({ setShowExpiration, showContractId, showExpiration }) {
    const history = useNavigate();

    const uploader = Uploader({ apiKey: 'public_W142hsRDrKu5afNchEBx4f7nFNZx' }); // Your real API key.
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

    const [ransomDetail, setRansom] = useState([]);
    // Axios
    /*   useEffect(() => {
          API({
              method: 'get',
              url: 'contract/uploadContractImg/' + showContractId,
          }).then((res) => {
              setRansom(res.data);
          });
      }, []); */

    const [linkImg, setLinkImg] = useState();
    const handleImg = (img) => {
        setLinkImg(img);
    };

    console.log(linkImg);
    console.log(showContractId);
    const handleSubmit = () => {
        API({
            method: 'post',
            url: `contract/createContractExpiration/${showContractId}?proofImg=${linkImg}`,
        }).then((res) => {
            console.log("log dao han");
            console.log(res.data);
            window.location.reload(false);
        });
    };
    console.log('Dao han');
    const [contractDetail, setContractDetail] = useState([]);
    useEffect(() => {
        API({
            method: 'get',
            url: `/contract/getContractDetail/` + localStorage.getItem('PawnDetailID'),
        }).then((res) => {
            setContractDetail(res.data);
            console.log(res.data);
        });
    }, []);

    const formatMoney = (value) => {
        return value.toLocaleString('vi-VN') + ' VNĐ';
    };

    return (
        <div className="add-contract" onClick={() => setShowExpiration(false)}>
            <div className="content-contract" onClick={(e) => e.stopPropagation()}>
                {/* Tiêu đề */}
                <div className="heading-contract">
                    <h1>Đáo hạn hợp đồng</h1>
                </div>
                <div className="contents">
                    <div className="box__liquidation">
                        <div className="full_detailContract">
                            <table className="table__detailContract">
                                <tr>
                                    <th colSpan="2">Khách hàng</th>
                                    <th colSpan="2" style={{ textAlign: 'right' }}>
                                        <span className="start-red">{contractDetail.customerName} </span>
                                        <span> - </span>
                                        <span>
                                            <span>
                                                <LocalPhoneIcon
                                                    fontSize="small"
                                                    className="detailContract_icon-phone"
                                                />
                                            </span>{' '}
                                            {contractDetail.phone}
                                        </span>
                                        {/* <span> - </span>
                    <span style={{ fontSize: "14px" }}>
                      <span ><HomeIcon fontSize="small" className="detailContract_icon-phone" />
                      </span> {detailPawn.branchId}</span> */}
                                    </th>
                                </tr>
                                <tr>
                                    <th colSpan="2">Tiền cầm</th>
                                    <th colSpan="2" className="start-red" style={{ textAlign: 'right' }}>
                                        {contractDetail.loan ? formatMoney(contractDetail.loan) : '0 VNĐ'}
                                    </th>
                                </tr>
                                <tr>
                                    <th colSpan="2">Vay từ ngày</th>
                                    <th colSpan="1" style={{ textAlign: 'right' }}>
                                        {moment(contractDetail.contractStartDate).format('DD/MM/YYYY')}
                                    </th>
                                    <th colSpan="1" style={{ textAlign: 'right' }}>
                                        {moment(contractDetail.contractEndDate).format('DD/MM/YYYY')}
                                    </th>
                                </tr>
                            </table>
                            <table className="table__detailContract">
                                <tr>
                                    <th>Lãi suất</th>
                                    <th style={{ textAlign: 'right' }}>
                                        <span>{contractDetail.packageInterest}%</span>
                                    </th>
                                </tr>
                                <tr>
                                    <th>Tiền lãi đã đóng</th>
                                    <th className="start-red" style={{ textAlign: 'right' }}>
                                        {contractDetail.interestPaid
                                            ? formatMoney(contractDetail.interestPaid)
                                            : '0 VNĐ'}
                                    </th>
                                </tr>
                                <tr>
                                    <th>Nợ lãi cũ:</th>
                                    <th style={{ textAlign: 'right' }}>
                                        <span className="start-red">
                                            {contractDetail.interestDebt
                                                ? formatMoney(contractDetail.interestDebt)
                                                : ''}
                                        </span>
                                    </th>
                                </tr>
                                <tr>
                                    <th>Trạng thái:</th>
                                    {contractDetail.status === 1 ? (
                                        <th style={{ textAlign: 'right' }}>
                                            <span className="detailContract_status" style={{ color: 'rgb(0, 166, 0)' }}>
                                                Đang Cầm
                                            </span>
                                        </th>
                                    ) : contractDetail.status === 2 ? (
                                        <th style={{ textAlign: 'right' }}>
                                            <span
                                                className="detailContract_status"
                                                style={{ color: 'rgb(83, 83, 255)' }}
                                            >
                                                Trễ Hẹn
                                            </span>
                                        </th>
                                    ) : contractDetail.status === 3 ? (
                                        <th style={{ textAlign: 'right' }}>
                                            <span
                                                className="detailContract_status"
                                                style={{ color: 'rgb(255, 255, 106)' }}
                                            >
                                                Thanh Lý
                                            </span>
                                        </th>
                                    ) : contractDetail.status === 4 ? (
                                        <th style={{ textAlign: 'right' }}>
                                            <span className="detailContract_status" style={{ color: 'red' }}>
                                                Đã Đóng
                                            </span>
                                        </th>
                                    ) : (
                                        ''
                                    )}
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="info__asset">
                    <div className="asset">
                        <p>Bạn có chắc chắn muốn đáo hạn hợp đồng cầm đồ này?</p>
                    </div>
                    <div className="asset">
                        <p>
                            Hình ảnh <span style={{ color: 'red' }}>*</span>:
                        </p>
                        <UploadDropzone
                            uploader={uploader}
                            options={uploaderOptions}
                            onUpdate={(files) => console.log(files.map((x) => x.fileUrl).join('\n'))}
                            onComplete={(files) => {
                                handleImg(files.map((x) => x.fileUrl).join('\n'));
                            }}
                            width="600px"
                            height="375px"
                        />
                        
                    </div>
                </div>
                <div className="btn__group btn__group-liquidation">
                    <Button onClick={handleSubmit}>
                        <BtnSave />
                    </Button>
                    <BtnCloseAnimation showExpiration={showExpiration} setShowExpiration={setShowExpiration} />
                </div>
            </div>
        </div>
    );
}

export default Expiration;
