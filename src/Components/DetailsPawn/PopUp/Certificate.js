import React, { useEffect, useState } from 'react';
import './popup.css';
import API from '../../../API.js';
import { Uploader } from 'uploader';
import { UploadButton, UploadDropzone } from 'react-uploader';

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
    }, []);

    const refreshImg = useCallback(() => {
        API({
            method: 'get',
            url: '/contract/getImgByContractId/' + showContractId,
        }).then((res) => {
            setImg(res.data);
            // console.log('aaaaa', res.data);
        });
    }, [showContractId]);

    useEffect(() => {
        refreshImg();
    }, []);

    function uploadCusImg(customerImg) {
        API({
            method: 'put',
            url: `/contract/uploadContractImg/${showContractId}?customerImg=${customerImg}`,
        })
            .then((res) => {
                refreshImg();
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
                refreshImg();
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
                        <div style={{ position: 'relative' }}>
                            <p style={{ textAlign: 'center', fontWeight: 700, marginRight: '20px' }}>
                                Upload ảnh Khách Hàng
                            </p>
                            <UploadButton
                                uploader={uploader}
                                options={{ multi: true }}
                                onComplete={(files) => uploadCusImg(files.map((x) => x.fileUrl).join('\n'))}
                            >
                                {({ onClick }) => (
                                    <button
                                        style={{
                                            backgroundColor: 'orange',
                                            border: 'none',
                                            position: 'absolute',
                                            right: 0,
                                            top: 0,
                                        }}
                                        onClick={onClick}
                                    >
                                        +
                                    </button>
                                )}
                            </UploadButton>
                        </div>

                        <img class="certificateImg" src={img.customerVerifyImg} alt="" />
                    </div>
                    <div>
                        <div style={{ position: 'relative' }}>
                            <p style={{ textAlign: 'center', fontWeight: 700, marginRight: '20px' }}>
                                Upload ảnh chứng từ HĐ
                            </p>
                            <UploadButton
                                uploader={uploader}
                                options={{ multi: true }}
                                onComplete={(files) => uploadContractImg(files.map((x) => x.fileUrl).join('\n'))}
                            >
                                {({ onClick }) => (
                                    <button
                                        style={{
                                            backgroundColor: 'orange',
                                            border: 'none',
                                            position: 'absolute',
                                            right: 0,
                                            top: 0,
                                        }}
                                        onClick={onClick}
                                    >
                                        +
                                    </button>
                                )}
                            </UploadButton>
                        </div>

                        <img class="certificateImg" src={img.contractVerifyImg} alt="" />
                    </div>
                </>
            )}
        </div>
    );
};

export default Certificate;
