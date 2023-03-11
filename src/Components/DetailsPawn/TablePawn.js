import React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import cash from '../../asset/img/cash.png';
import wallet from '../../asset/img/wallet.png';
import subwallet from '../../asset/img/subwallet.png';
import deletes from '../../asset/img/delete.png';

const TablePawn = () => {
    const columns = [
        { field: 'id', headerName: '#', width: 10, textAlign: 'center' },
        { field: 'maHD', headerName: 'Mã HĐ', with: 20 },
        { field: 'khachHang', headerName: 'Khách Hàng', width: 200 },
        {
            field: 'maTS',
            headerName: ' Mã TS',
        },
        {
            field: 'taiSan',
            headerName: 'Tài Sản',
            width: 160,
        },
        {
            field: 'tienCam',
            headerName: 'Tiền Cầm',
            width: 160,
        },
        {
            field: 'ngayCam',
            headerName: 'Ngày Cầm',
        },
        {
            field: 'lai',
            headerName: 'Lãi Đã Đóng',
            type: 'number',
        },
        {
            field: 'tienNo',
            headerName: 'Tiền Nợ',
            type: 'number',
        },

        {
            field: 'laiDenNay',
            headerName: 'Lãi Đến Hôm Nay',
        },
        {
            field: 'ngayDongLai',
            headerName: 'Ngày Đóng Lãi',
        },
        {
            field: 'tinhTrang',
            headerName: 'Tình Trạng',
            valueGetter: (params) =>
                `${
                    params.row.tinhTrang === 0
                        ? 'Đang Cầm'
                        : params.row.tinhTrang === 1
                        ? 'Trễ hẹn'
                        : params.row.tinhTrang === 2
                        ? 'Thanh lý'
                        : ''
                }`,
            width: 140,
        },
        {
            field: 'ChucNangw',
            headerName: 'Chức năng',
            type: 'actions',
            getActions: (params) => [
                <GridActionsCellItem icon={<img src={cash} />} label="Delete" />,
                <GridActionsCellItem icon={<img src={wallet} />} label="Delete" />,
                <GridActionsCellItem icon={<img src={subwallet} />} label="Delete" />,
                <GridActionsCellItem icon={<img src={deletes} />} label="Delete" />,
            ],
            width: 160,
        },
    ];

    const rows = [
        {
            id: 1,
            maHD: 'CĐ-0001',
            khachHang: 'Nguyen Tran Khanh Hoa',
            maTS: 'XM',
            taiSan: 'Xe SH Trắng',
            tienCam: '10000000',
            ngayCam: '23/12/2022',
            lai: '35000',
            tienNo: '0',
            laiDenNay: '23/12/2022',
            ngayDongLai: '29/12/2022',
            tinhTrang: 0,
            firstName: 'Jon',
            age: 35,
        },
        {
            id: 2,
            maHD: 'CĐ-0002',
            khachHang: 'Nguyen Tran Khanh Hoa',
            maTS: 'XM',
            taiSan: 'Xe SH Trắng',
            tienCam: '10000000',
            ngayCam: '23/12/2022',
            lai: '35000',
            tienNo: '0',
            laiDenNay: '23/12/2022',
            ngayDongLai: '29/12/2022',
            tinhTrang: 1,
            firstName: 'Jon',
            age: 35,
        },
        {
            id: 3,
            maHD: 'CĐ-0003',
            khachHang: 'Nguyen Tran Khanh Hoa',
            maTS: 'XM',
            taiSan: 'Xe SH Trắng',
            tienCam: '10000000',
            ngayCam: '23/12/2022',
            lai: '35000',
            tienNo: '0',
            laiDenNay: '23/12/2022',
            ngayDongLai: '29/12/2022',
            tinhTrang: 2,
            firstName: 'Jon',
            age: 35,
        },
    ];
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                style={{ textAlign: 'center' }}
            />
        </div>
    );
};

export default TablePawn;
