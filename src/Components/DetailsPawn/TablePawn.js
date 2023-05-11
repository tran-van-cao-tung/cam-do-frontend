import React, { useContext, useEffect, useState } from 'react';
import cash from '../../asset/img/cash.png';
import wallet from '../../asset/img/wallet.png';
import API from '../../API.js';
import subwallet from '../../asset/img/subwallet.png';
import moment from 'moment';
import { AuthContext } from '../../helpers/AuthContext';
import ReactPaginate from 'react-paginate';
import { formatMoney } from '../../helpers/dateTimeUtils';
const TablePawn = ({
    setShowUpdateContract,
    setShowliquidation,
    setshowdetailContract,
    setShowContractId,
    setShowExpiration,
    setContract,
    rowsContract,
}) => {
    const { authState, currentBranchId } = useContext(AuthContext);

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
        localStorage.setItem('PawnDetailID', id);
        setshowdetailContract(true);
        setShowContractId(id);
    };

    const hanleShowExpiration = (id) => {
        setShowExpiration(true);
        localStorage.setItem('PawnDetailID', id);
        setShowContractId(id);
    };

    useEffect(() => {
        if (currentBranchId) {
            API({
                method: 'get',
                url: `contract/getAll/0/${currentBranchId}`,
            }).then((res) => {
                console.log(res.data);
                setContract(res.data);
            });
        }
    }, [currentBranchId, setContract]);
    //Ép kiểu dữ liệu date
    const formatDate = (value) => {
        return moment(value).format('DD/MM/YYYY');
    };

    const [currentPage, setCurrentPage] = useState(0);
    const [customersPerPage] = useState(6); // số lượng cửa hàng hiển thị trên mỗi trang
    const pageCount = Math.ceil(rowsContract.length / customersPerPage); // tính toán số lượng trang
    const startIndex = currentPage * customersPerPage;
    const endIndex = startIndex + customersPerPage;
    const currentCustomers = rowsContract.slice(startIndex, endIndex);

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
                                    <td>{formatMoney(i.loan)}</td>
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
