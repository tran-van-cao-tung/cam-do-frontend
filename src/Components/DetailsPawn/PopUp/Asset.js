import React, { useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import './popup.css';
import callAPI from '../../../API';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { UploadDropzone } from 'react-uploader';
import { Uploader } from 'uploader';
import AssetImg from './AssetImgModal';
import AssetImport from './AssetImport';
import AssetExport from './AssetExport';
import AssetNote from './AssetNote';

const Asset = ({ showContractId }) => {
    const [logAsset, setlogAsset] = useState([]);
    const [isChecked, setIsChecked] = useState([]);
    const [warehouse, setWarehouse] = useState([]);
    const [branch, setbranch] = useState(1);
    const updateBranch = ({ target }) => {
        setbranch(target.value);
    };
    //Ép kiểu dữ liệu date

    //Ép kiểu dữ liệu vnd

    //Upload img
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
    useEffect(() => {
        const id = showContractId;
        console.log('contract id asset', id);
        callAPI({
            method: 'get',
            url: `logAsset/getLogAssetsByContractId/${id}`,
        }).then((res) => {
            setlogAsset(res.data);
        });
    }, [showContractId]);

    const refreshImg = useCallback(() => {
        const id = showContractId;
        console.log('contract id asset', id);
        callAPI({
            method: 'get',
            url: `logAsset/getLogAssetsByContractId/${id}`,
        }).then((res) => {
            setlogAsset(res.data);
        });
    }, [showContractId]);

    async function loadWarehouse() {
        callAPI({
            method: 'get',
            url: '/warehouse/GetAll/0',
        }).then((res) => {
            setWarehouse(res.data);
            // console.log('aaaaa', res.data);
        });
    }
    useEffect(() => {
        refreshImg();
        loadWarehouse();
    }, [showContractId]);
    return (
        <div className="contents">
            <TableContainer>
                <Table
                    sx={{ minWidth: '700px', '&:last-child td, &:last-child ': { border: 0 } }}
                    aria-label="simple table"
                >
                    <TableHead
                        sx={{ '&:last-child td, &:last-child th': { borderRadius: '10px' } }}
                        style={{ borderRadius: '10px' }}
                    >
                        <TableRow
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: '1px solid rgba(0, 0, 0, 0.1)',
                                    background: 'orange',
                                    textAlign: 'center',
                                    color: '#000',
                                },
                            }}
                            style={{ borderRadius: '5px' }}
                        >
                            <TableCell>Tên tài sản</TableCell>
                            <TableCell>Kho lưu trữ</TableCell>
                            <TableCell>Biên nhập kho</TableCell>
                            <TableCell>Biên xuất kho</TableCell>
                            <TableCell>Giao dịch viên</TableCell>
                            <TableCell>Hình ảnh</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody
                        style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
                        sx={{
                            '&:last-child td, &:last-child th': {
                                background: 'rgba(80, 157, 168, 0.2)',
                                textAlign: 'center',
                            },
                        }}
                    >
                        {logAsset.map((item, index) => {
                            return (
                                <TableRow
                                    style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}
                                    sx={{ '& td, & th': { textAlign: 'center' } }}
                                >
                                    <TableCell>{item.assetName}</TableCell>
                                    <TableCell>{item.wareHouseName}</TableCell>
                                    <TableCell>
                                        <AssetImport item={item} />
                                    </TableCell>
                                    <TableCell>
                                        <AssetExport item={item} />
                                    </TableCell>
                                    <TableCell>{item.userName}</TableCell>
                                    <TableCell>
                                        <AssetImg item={item} refresh={refreshImg} />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Asset;
