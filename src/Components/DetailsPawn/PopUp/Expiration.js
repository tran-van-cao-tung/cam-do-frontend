import React, { useEffect, useState } from 'react'
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Uploader } from 'uploader';
import { UploadDropzone } from 'react-uploader';
import callAPI from '../../../API';
import { useNavigate } from 'react-router-dom';

function Expiration({ setShowExpiration, showContractId }) {

    const history = useNavigate();

    const uploader = Uploader({ apiKey: 'public_kW15bAuFTht5jafbjpkWCsBg1M4s' }); // Your real API key.
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
    async function getUploadPart(params) {
        const baseUrl = 'https://api.upload.io';
        const path = `/v2/accounts/${params.accountId}/uploads/${params.uploadId}/parts/${params.uploadPartIndex}`;
        const entries = (obj) => Object.entries(obj).filter(([, val]) => (val ?? null) !== null);
        const response = await fetch(`${baseUrl}${path}`, {
            method: 'GET',
            headers: Object.fromEntries(
                entries({
                    Authorization: `Bearer ${params.apiKey}`,
                }),
            ),
        });
        const result = await response.json();
        if (Math.floor(response.status / 100) !== 2) throw new Error(`Upload API Error: ${JSON.stringify(result)}`);
        return result;
    }

    getUploadPart({
        accountId: 'kW15bAu',
        apiKey: 'public_kW15bAuFTht5jafbjpkWCsBg1M4s',
        uploadId: 'Kd759aLFxttm69kZ',
        uploadPartIndex: 7,
    }).then(
        (response) => console.log(`Success: ${JSON.stringify(response)}`),
        (error) => console.error(error),
    );
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    const [linkImg, setLinkImg] = useState();
    const handleImg = (img) => {
        setLinkImg(img[0].fileUrl);
    }

    console.log(linkImg)
    console.log(showContractId)
    const handleSubmit = () => {
        callAPI({
            method: 'post',
            url: `contract/createContractExpiration/${showContractId}?proofImg=${linkImg}`,
        }).then((res) => {
            console.log(res.data)
            window.location.reload(false);
        });
    }



    return (
        <div className="add-contract" onClick={() => setShowExpiration(false)}>
            <div className="content-contract" onClick={(e) => e.stopPropagation()}>
                {/* Tiêu đề */}
                <div className="heading-contract">
                    <h1>Đáo hạn hợp đồng</h1>
                </div>
                <div className="contents">
                    <div className="box__liquidation">
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <table className="table__liquidation">
                                        <tr>
                                            <th>Khách hàng</th>
                                            <th colSpan="2">
                                                <span className="start-red">Nguyễn Trần Khánh Hoa</span>{" "}
                                                - 098989898
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>Tiền cầm</th>
                                            <th colSpan="2">10,000,000 VNĐ</th>
                                        </tr>
                                        <tr>
                                            <th>Vay từ ngày</th>
                                            <th>23/12/2022</th>
                                            <th>01/01/2022</th>
                                        </tr>
                                        <tr>
                                            <th>Ngày trả lãi gần nhất</th>
                                            <th colSpan="2"></th>
                                        </tr>
                                    </table>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <table className="table__liquidation">
                                        <tr>
                                            <th>Lãi xuất</th>
                                            <th colSpan="2">
                                                <span className="start-red">5k/ngày</span>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>Tiền lãi đã đóng</th>
                                            <th className="start-red">0 VNĐ</th>
                                        </tr>
                                        <tr>
                                            <th>Gốc còn nợ: <span className="start-red">8,000,000 VNĐ</span></th>
                                            <th>Nợ lãi cũ: <span className="start-red">0 VNĐ</span></th>

                                        </tr>
                                        <tr>
                                            <th>Trạng thái</th>
                                            <th>Đang cầm</th>
                                        </tr>
                                    </table>
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
                </div>
                <div className="info__asset">
                    <div className="asset">
                        <p>Bạn có chắc chắn muốn đáo hạn hợp đồng cầm đồ này?</p>
                    </div>
                    <div className="asset">
                        <p>Hình ảnh <span style={{ color: "red" }}>*</span>:</p>
                        <UploadDropzone uploader={uploader}
                            options={uploaderOptions}
                            onUpdate={files => console.log(files.map(x => x.fileUrl).join("\n"))}
                            onComplete={files => {
                                handleImg(files);
                                alert(files.map(x => x.fileUrl).join("\n"))
                            }}
                            width="350px"
                            height="250px" />
                    </div>
                </div>
                <div className="btn__group btn__group-liquidation">
                    <button className="btn btn__save" onClick={handleSubmit}>Chấp nhận</button>
                    <button className="btn btn__close" onClick={() => { setShowExpiration(false) }}>Đóng</button>
                </div>
            </div>
        </div>
    )
}

export default Expiration