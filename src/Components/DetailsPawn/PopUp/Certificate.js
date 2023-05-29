import React, { useEffect, useState } from 'react';
import './popup.css';
import API from '../../../API.js';
import { Uploader } from 'uploader';
import { UploadDropzone } from 'react-uploader';

import { toast } from 'react-toastify';
import { useCallback } from 'react';
const Certificate = ({ showContractId }) => {
    // Function active button (Button Deatail Contract)
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

    const [img, setImg] = useState([]);
    // Axios

    useEffect(() => {
        API({
            method: 'get',
            url: '/contract/getImgByContractId/' + showContractId,
        }).then((res) => {
            setImg(res.data);
            // console.log('aaaaa', res.data);
        });
    }, [showContractId]);

    const refreshImg = useCallback(() => {
        API({
            method: 'get',
            url: '/contract/getImgByContractId/' + showContractId,
        }).then((res) => {
            setImg(res.data);
            // console.log('aaaaa', res.data);
        });
    }, [img]);

    useEffect(() => {
        refreshImg();
    }, [img]);

    function uploadCusImg(customerImg) {
        API({
            method: 'put',
            url: `/contract/uploadContractImg/${showContractId}?customerImg=${customerImg}`,
        })
            .then((res) => {
                toast.success('Lưu hình thành công');
            })
            .catch((err) => {
                console.log(err);
                toast.error('Lưu hình thất bại');
            });
    }
    function uploadContractImg(contractImg) {
        API({
            method: 'put',
            url: `/contract/uploadContractImg/${showContractId}?contractImg=${contractImg}`,
        })
            .then((res) => {
                toast.success('Lưu hình thành công');
            })
            .catch((err) => {
                toast.error('Lưu hình thất bại');
            });
    }
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    return (
        <div class="grid-container">
            {img.status === 4 ? (
                <>
                    <div class="grid-item">
                        <h4>Ảnh Khách Hàng</h4>
                        <a href={img.customerVerifyImg} target="_blank" rel="noopener noreferrer">
                            <img class="certificateImg" src={img.customerVerifyImg} alt="Logo" />
                        </a>
                    </div>
                    <div class="grid-item">
                        <h4>Ảnh chứng từ HĐ</h4>
                        <a href={img.contractVerifyImg} target="_blank" rel="noopener noreferrer">
                            <img class="certificateImg" src={img.contractVerifyImg} alt="" />
                        </a>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <p style={{ textAlign: 'center', fontWeight: 700 }}>Upload ảnh Khách Hàng</p>

                        {img.customerVerifyImg == null ? (
                            <UploadDropzone
                                uploader={uploader}
                                options={uploaderOptions}
                                onUpdate={(files) => console.log(files.map((x) => x.fileUrl).join('\n'))}
                                onComplete={(files) => uploadCusImg(files.map((x) => x.fileUrl).join('\n'))}
                                width="800px"
                                minWidth="500px"
                                height="375px"
                            />
                        ) : (
                            <img class="certificateImg" src={img.customerVerifyImg} alt="" />
                        )}
                        {/* )} */}
                    </div>
                    <div>
                        <p style={{ textAlign: 'center', fontWeight: 700 }}>Upload ảnh chứng từ HĐ</p>
                        {img.contractVerifyImg == null ? (
                            <UploadDropzone
                                uploader={uploader}
                                options={uploaderOptions}
                                onUpdate={(files) => console.log(files.map((x) => x.fileUrl).join('\n'))}
                                onComplete={(files) => uploadContractImg(files.map((x) => x.fileUrl).join('\n'))}
                                width="800px"
                                minWidth="500px"
                                height="375px"
                            />
                        ) : (
                            <img class="certificateImg" src={img.contractVerifyImg} alt="" />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Certificate;
