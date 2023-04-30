import React, { useContext, useEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import cash from '../../asset/img/cash.png';
import wallet from '../../asset/img/wallet.png';
import API from '../../API.js';
import subwallet from '../../asset/img/subwallet.png';
import note from '../../asset/img/note.png';
import moment from 'moment';
import { AuthContext } from '../../helpers/AuthContext';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const TablePawn = ({
    setShowUpdateContract,
    setShowliquidation,
    setshowdetailContract,
    setShowContractId,
    setShowExpiration,
    setContract,
    rowsContract,
}) => {
    const { authState } = useContext(AuthContext);

    const handleShow = (id) => {
        setShowUpdateContract(true);
        localStorage.setItem('PawnDetailID', id);
        console.log('Update', id);
    };
    const handleShowLiquidation = (id) => {
        setShowliquidation(true);
        localStorage.setItem('PawnDetailID', id);
        console.log('Liquid', id);
    };

    const handleShowDetailContract = (id) => {
        setshowdetailContract(true);
        setShowContractId(id);
    };

    const hanleShowExpiration = (id) => {
        setShowExpiration(true);
        localStorage.setItem('PawnDetailID', id);
        setShowContractId(id);
    };
    console.log();
    useEffect(() => {
        API({
            method: 'get',
            url: `contract/getAll/0/${authState.branchId}`,
        }).then((res) => {
            console.log(res.data);
            setContract(res.data);
        });
    }, [authState.branchId]);
    console.log(rowsContract);

    //Ép kiểu dữ liệu date
    const formatDate = (value) => {
        return moment(value).format('DD/MM/YYYY');
    };

    const formatMoney = (value) => {
        return value.toLocaleString('vi-VN') + ' VNĐ';
    };

    const [currentPage, setCurrentPage] = useState(0);
    const [customersPerPage, setCustomersPerPage] = useState(6); // số lượng cửa hàng hiển thị trên mỗi trang
    const pageCount = Math.ceil(rowsContract.length / customersPerPage); // tính toán số lượng trang
    const startIndex = currentPage * customersPerPage;
    const endIndex = startIndex + customersPerPage;
    const currentCustomers = rowsContract.slice(startIndex, endIndex);
    // const columns = [
    //     {
    //         field: '#',
    //         headerName: '#',
    //         width: 10,
    //         textAlign: 'center',
    //         valueGetter: (params) => {
    //             for (let i = 0; i < rowsContract.length; i++) {
    //                 if (params.row.contractId === rowsContract[i].contractId) {
    //                     return i + 1;
    //                 }
    //             }
    //         },
    //         sortable: false,
    //     },
    //     { field: 'contractCode', headerName: 'Mã HĐ', with: 20 },
    //     { field: 'customerName', headerName: 'Khách Hàng', width: 200 },
    //     {
    //         field: 'commodityCode',
    //         headerName: ' Mã TS',
    //     },
    //     {
    //         field: 'contractAssetName',
    //         headerName: 'Tài Sản',
    //         width: 160,
    //     },
    //     {
    //         field: 'loan',
    //         headerName: 'Tiền Cầm',
    //         width: 160,
    //         valueFormatter: (params) => formatMoney(params.value),
    //     },
    //     {
    //         field: 'contractStartDate',
    //         headerName: 'Ngày Cầm',
    //         width: 150,
    //         valueFormatter: (params) => formatDate(params.value),
    //     },
    //     {
    //         field: 'contractEndDate',
    //         headerName: 'Ngày đến hạn',
    //         width: 150,
    //         valueFormatter: (params) => formatDate(params.value),
    //     },
    //     {
    //         field: 'warehouseName',
    //         headerName: 'Kho',
    //     },
    //     {
    //         field: 'status',
    //         headerName: 'Tình Trạng',
    //         valueGetter: (params) =>
    //             `${
    //                 params.row.status === 1
    //                     ? 'Đang Cầm'
    //                     : params.row.status === 2
    //                     ? 'Trễ Hẹn'
    //                     : params.row.status === 3
    //                     ? 'Thanh Lý'
    //                     : params.row.status === 4
    //                     ? 'Đã Đóng'
    //                     : ''
    //             }`,
    //         width: 140,
    //     },
    //     {
    //         field: 'ChucNang',
    //         headerName: 'Chức năng',
    //         type: 'actions',
    //         getActions: (params, index) => [
    //             <GridActionsCellItem
    //                 icon={<img src={cash} />}
    //                 onClick={(e) => handleShowDetailContract(params.row.contractId)}
    //             />,
    //             <GridActionsCellItem icon={<img src={wallet} />} onClick={(e) => handleShow(params.row.contractId)} />,
    //             <GridActionsCellItem
    //                 icon={<img src={params.row.status === 1 ? note : subwallet} />}
    //                 onClick={(e) => {
    //                     params.row.status === 1
    //                         ? hanleShowExpiration(params.row.contractId)
    //                         : handleShowLiquidation(params.row.contractId);
    //                 }}
    //             />,
    //         ],

    //         width: 160,
    //     },
    // ];

    return (
        <>
            <div style={{ height: 510, width: '100%' }}>
                <div className="tableContainer">
                    <div
                        className="tableBadCustomer"
                        style={{ overflowX: 'scroll', minWidth: '500px', borderRadius: '10px' }}
                    >
                        <table className="responstable" style={{ width: '130%' }}>
                            <tr>
                                <th>STT</th>
                                <th>Mã HĐ</th>
                                <th>Khách Hàng</th>
                                <th>Mã TS</th>
                                <th>Tài Sản</th>
                                <th>Tiền Cầm</th>
                                <th>Ngày Cầm</th>
                                <th>Ngày Đến Hạn</th>
                                <th>Kho</th>
                                <th>Tình Trạng</th>
                                <th>Chức năng</th>
                            </tr>
                            {currentCustomers.map((i, index) => (
                                <tr key={i + 1}>
                                    <td>{index + 1}</td>
                                    <td>{i.contractCode}</td>
                                    <td>{i.customerName}</td>
                                    <td>{i.commodityCode}</td>
                                    <td>{i.contractAssetName}</td>
                                    <td>{i.loan}</td>
                                    <td>{formatDate(i.contractStartDate)}</td>
                                    <td>{formatDate(i.contractEndDate)}</td>
                                    <td>{i.warehouseName}</td>
                                    <td>
                                        {i.status === 1 ? (
                                            <div className="statusDangCam">Đang Cầm</div>
                                        ) : i.status === 2 ? (
                                            <div className="statusTreHen">Trễ Hẹn</div>
                                        ) : i.status === 3 ? (
                                            <div className="statusThanhLy">Thanh Lý</div>
                                        ) : i.status === 4 ? (
                                            <div className="statusDaDong">Đã Đóng</div>
                                        ) : (
                                            ''
                                        )}
                                    </td>
                                    <td>
                                        <div className="MuiTableBody_root-itemLast">
                                            <img
                                                onClick={(e) => {
                                                    handleShowDetailContract(i.contractId);
                                                }}
                                                src={cash}
                                                alt="..."
                                            />

                                            <img onClick={(e) => handleShow(i.contractId)} src={wallet} alt="Edit" />

                                            <img
                                                onClick={(e) => {
                                                    i.status === 1
                                                        ? hanleShowExpiration(i.contractId)
                                                        : handleShowLiquidation(i.contractId);
                                                }}
                                                src={subwallet}
                                                alt="Edit"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </table>
                    </div>
                </div>
            </div>
            <ReactPaginate
                className="paginatePawns"
                previousLabel={'Trang trước'}
                nextLabel={'Trang sau'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCount}
                onPageChange={(data) => {
                    setCurrentPage(data.selected);
                }}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        </>
    );
};

export default TablePawn;
