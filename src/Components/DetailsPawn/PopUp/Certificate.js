import React, { useEffect, useState } from 'react';
import './popup.css';
import Box from '@mui/material/Box';
import API from '../../../API.js';
import { Uploader } from 'uploader';
import { UploadDropzone } from 'react-uploader';
const Certificate = ({ setshowdetailContract }) => {
    // Function active button (Button Deatail Contract)
    const Item = styled(Box)(({ theme }) => ({
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

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
    useEffect(() => {
        API({
            method: 'get',
            url: 'ramsom/ransombyid/' + localStorage.getItem('PawnDetailID'),
        }).then((res) => {
            setRansom(res.data);
            // console.log('aaaaa', res.data);
        });
    }, []);
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
    return (
        <div>
            {/* <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Item sx={{ textAlign: 'right', fontSize: '25px', fontWeight: '700' }}>Hình ảnh:</Item>{' '}
                </Grid>
                <Grid item xs={6}>
                    <Item sx={{ textAlign: 'right', fontSize: '25px', fontWeight: '700' }}>
                        <UploadDropzone
                            uploader={uploader}
                            options={uploaderOptions}
                            onUpdate={(files) => console.log(files.map((x) => x.fileUrl).join('\n'))}
                            onComplete={(files) => alert(files.map((x) => x.fileUrl).join('\n'))}
                            width="300px"
                            height="150px"
                        />
                    </Item>{' '}
                </Grid>
            </Grid> */}
             <h2>Upload ảnh KH</h2>
        <UploadDropzone uploader={uploader}
          options={uploaderOptions}
          onUpdate={files => console.log(files.map(x => x.fileUrl).join("\n"))}
          onComplete={files => alert(files.map(x => x.fileUrl).join("\n"))}
          width="600px"
          height="375px" />
        </div>
    );
};

export default Certificate;
