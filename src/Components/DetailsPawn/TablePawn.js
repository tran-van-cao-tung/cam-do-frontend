import React, { useEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import cash from '../../asset/img/cash.png';
import wallet from '../../asset/img/wallet.png';
import API from '../../API.js';
import subwallet from '../../asset/img/subwallet.png';
import note from '../../asset/img/note.png';
import moment from 'moment';

const TablePawn = ({
    setShowUpdateContract,
    setShowliquidation,
    setshowdetailContract,
    setShowContractId,
    setShowExpiration,
    setContract,
    rowsContract,
}) => {
    const handleShow = (id) => {
        setShowUpdateContract(true);
        localStorage.setItem('PawnDetailID', id);
        console.log('Update', id);
    };
    const handleShowLiquidation = (id) => {
        setShowliquidation(true);
        console.log(id);
    };

    const handleShowDetailContract = (id) => {
        setshowdetailContract(true);
        setShowContractId(id);
    };

    const hanleShowExpiration = (id) => {
        setShowExpiration(true);
        setShowContractId(id);
    };
    console.log();
    useEffect(() => {
        API({
            method: 'get',
            url: `contract/getAll/0`,
        }).then((res) => {
            console.log(res.data);
            setContract(
                res.data.filter((item, index) => {
                    return item.status;
                }),
            );
        });
    }, []);
    console.log(rowsContract);

    //Lấy dữ liệu BrandID có userId
    const [branchIdUser, setBranchIdUser] = useState([]);
    useEffect(() => {
        if (localStorage.getItem('userId')) {
            API({
                method: 'get',
                url: `user/getAll/0`,
            }).then((res) => {
                setBranchIdUser(
                    res.data.filter((user) => {
                        if (localStorage.getItem('userId')) {
                            return user.userId === localStorage.getItem('userId');
                        }
                    })[0].branchId,
                );
            });
        }
    }, []);

    //dựa vào BranchId
    console.log(branchIdUser);

    //Ép kiểu dữ liệu date
    const formatDate = (value) => {
        return moment(value).format('DD/MM/YYYY');
    };

    const formatMoney = (value) => {
        return value.toLocaleString('vi-VN') + ' VNĐ';
    };

    const columns = [
        {
            field: '#',
            headerName: '#',
            width: 10,
            textAlign: 'center',
            valueGetter: (params) => {
                for (let i = 0; i < rowsContract.length; i++) {
                    if (params.row.contractId === rowsContract[i].contractId) {
                        return i + 1;
                    }
                }
            },
            sortable: false,
        },
        { field: 'contractCode', headerName: 'Mã HĐ', with: 20 },
        { field: 'customerName', headerName: 'Khách Hàng', width: 200 },
        {
            field: 'commodityCode',
            headerName: ' Mã TS',
        },
        {
            field: 'contractAssetName',
            headerName: 'Tài Sản',
            width: 160,
        },
        {
            field: 'loan',
            headerName: 'Tiền Cầm',
            width: 160,
            valueFormatter: (params) => formatMoney(params.value),
        },
        {
            field: 'contractStartDate',
            headerName: 'Ngày Cầm',
            width: 150,
            valueFormatter: (params) => formatDate(params.value),
        },
        {
            field: 'contractEndDate',
            headerName: 'Ngày đến hạn',
            width: 150,
            valueFormatter: (params) => formatDate(params.value),
        },
        {
            field: 'warehouseName',
            headerName: 'Kho',
        },
        {
            field: 'status',
            headerName: 'Tình Trạng',
            valueGetter: (params) =>
                `${
                    params.row.status === 1
                        ? 'Đang Cầm'
                        : params.row.status === 2
                        ? 'Trễ Hẹn'
                        : params.row.status === 3
                        ? 'Thanh Lý'
                        : params.row.status === 4
                        ? 'Đã Đóng'
                        : ''
                }`,
            width: 140,
        },
        {
            field: 'ChucNang',
            headerName: 'Chức năng',
            type: 'actions',
            getActions: (params, index) => [
                <GridActionsCellItem
                    icon={<img src={cash} />}
                    onClick={(e) => handleShowDetailContract(params.row.contractId)}
                />,
                <GridActionsCellItem icon={<img src={wallet} />} onClick={(e) => handleShow(params.row.contractId)} />,
                <GridActionsCellItem
                    icon={<img src={params.row.status === 1 ? note : subwallet} />}
                    onClick={(e) => {
                        params.row.status === 1
                            ? hanleShowExpiration(params.row.contractId)
                            : handleShowLiquidation(params.row.contractId);
                    }}
                />,
            ],

            width: 160,
        },
    ];

    return (
        <div style={{ height: 510, width: '99%' }}>
            <DataGrid
                rows={rowsContract}
                getRowId={(row) => row.contractId}
                columns={columns}
                pageSize={7}
                rowsPerPageOptions={[7]}
                style={{ textAlign: 'center' }}
            />
        </div>
    );
};

export default TablePawn;
