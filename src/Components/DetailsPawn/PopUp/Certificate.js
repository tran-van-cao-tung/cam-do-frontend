import React, { useEffect, useState } from 'react';
import './popup.css';
import API from '../../../API.js';
import { Uploader } from 'uploader';
import { UploadDropzone } from 'react-uploader';
const Certificate = ({ showContractId }) => {
    // Function active button (Button Deatail Contract)
    const uploader = Uploader({ apiKey: 'public_FW25bDE3z6GM9yWkBESNoAkzEgWY' }); // Your real API key.
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
            headers: {
                Authorization: `Bearer  ${localStorage.getItem('accessToken')}`,
            },
        }).then((res) => {
            setImg(res.data);
            // console.log('aaaaa', res.data);
        });
    });

    function uploadCusImg(customerImg) {
        API({
            method: 'put',
            url: `/contract/uploadContractImg/${showContractId}?customerImg=${customerImg}`,
            headers: {
                Authorization: `Bearer  ${localStorage.getItem('accessToken')}`,
            },
        })
            .then((res) => {
                alert('Lưu Hỉnh KH thành công');
            })
            .catch((err) => {
                console.log(err);
                alert('Lưu Hỉnh KH fail');
            });
    }
    function uploadContractImg(contractImg) {
        API({
            method: 'put',
            url: `/contract/uploadContractImg/${showContractId}?contractImg=${contractImg}`,
            headers: {
                Authorization: `Bearer  ${localStorage.getItem('accessToken')}`,
            },
        })
            .then((res) => {
                console.log('Success Full');
                alert('Lưu Thành Công');
            })
            .catch((err) => {
                console.log(err);
                alert('Lưu Hỉnh HĐ fail');
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
                    <div class="grid-item">
                        <h4>Upload ảnh Khách Hàng</h4>
                        <a href={img.customerVerifyImg} target="_blank" rel="noopener noreferrer">
                            <img class="certificateImg" src={img.customerVerifyImg} alt="Logo" />
                        </a>
                        <UploadDropzone
                            uploader={uploader}
                            options={uploaderOptions}
                            onUpdate={(files) => console.log(files.map((x) => x.fileUrl).join('\n'))}
                            onComplete={(files) => uploadCusImg(files.map((x) => x.fileUrl).join('\n'))}
                            width="600px"
                            height="375px"
                        />
                    </div>
                    <div class="grid-item">
                        <h4>Upload ảnh chứng từ HĐ</h4>
                        <a href={img.contractVerifyImg} target="_blank" rel="noopener noreferrer">
                            <img class="certificateImg" src={img.contractVerifyImg} alt="" />
                        </a>
                        <UploadDropzone
                            uploader={uploader}
                            options={uploaderOptions}
                            onUpdate={(files) => console.log(files.map((x) => x.fileUrl).join('\n'))}
                            onComplete={(files) => uploadContractImg(files.map((x) => x.fileUrl).join('\n'))}
                            width="600px"
                            height="375px"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Certificate;
