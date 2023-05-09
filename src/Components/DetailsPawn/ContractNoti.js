import "./DetaisPawn.css";
import moment from "moment";
import React, { useContext, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import API from '../../API';
import cash from './../../asset/img/cash.png';
import { AuthContext } from "../../helpers/AuthContext";
const ContractNoti = () => {
    const { authState, currentBranchId } = useContext(AuthContext);
    //
    const [list, setList] = useState([]);
    // Axios
    useEffect(() => {
        if (currentBranchId) {
            API({
                method: 'get',
                url: '/notification/notificationList/' + currentBranchId,
            }).then((res) => {
                setList(res.data);
                console.log(res.data);
            });
        }
    }, [currentBranchId]);
    // ==================================
    // |  Filter Value Radio and Search |
    // ==================================
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const filteredData = list
        .filter((item) => {
            if (statusFilter === 'all') return true;
        })
        .filter((item) => {
            if (searchTerm.value === '') return item;
            if (item.customerName.toLowerCase().includes(searchTerm.toLowerCase())) return item;
        });
    // ==================================
    // |            Phân Trang        |
    // ==================================
    const [currentPage, setCurrentPage] = useState('');
    const storesPerPage = 4; // số lượng cửa hàng hiển thị trên mỗi trang
    const totalPages = Math.ceil(list.length / storesPerPage); // tính toán số lượng trang
    const startIndex = currentPage * storesPerPage;
    const endIndex = startIndex + storesPerPage;
    const currentPageData = list.slice(startIndex, endIndex);

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };
    return (
        <>
            <div className="listStoreContainer">
                <h1 className="liststorebody-h1">Thông báo thu nợ hôm nay</h1>
                <div className="ListStore1">
                    {/* ================================ */}
                    {/* =            Table Show        = */}
                    {/* ================================ */}
                    <div className="table">
                        <table className="responstable">
                            <tr>
                                <th>#</th>
                                <th>Mã HĐ</th>
                                <th data-th="Driver details">
                                    <span>Khách hàng</span>
                                </th>
                                <th>Mã TS</th>
                                <th>Tài sản</th>
                                <th>Tổng tiền cần đóng</th>
                                <th>Ngày cầm</th>
                                <th>Ngày đến hạn</th>
                                <th>Lý do</th>
                                <th>Chức năng</th>
                            </tr>
                            {currentPageData.map((item, index) => (
                                <tr key={index.branchId}>
                                    <td>{index + 1}</td>
                                    <td>{item.contractCode}</td>
                                    <td>{item.customerName}</td>
                                    <td>{item.commodityCode}</td>
                                    <td>{item.contractAssetName}</td>
                                    <td>{Intl.NumberFormat({ style: 'currency', currency: 'VND' }).format(item.totalPay)} VNĐ</td>
                                    <td>{moment(item.contractStartDate).format('DD/MM/YYYY')}</td>
                                    <td>{moment(item.contractEndDate).format('DD/MM/YYYY')}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        <div className="MuiTableBody_root-itemLast">
                                            <Link to={`/detaipawn/`}>
                                                <img src={cash} alt="" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </table>
                    </div>
                    {/* ================================ */}
                    {/* =            Phân Trang        = */}
                    {/* ================================ */}
                </div>
            </div>
            <ReactPaginate
                className="paginate-listStore"
                previousLabel={'Trang trước'}
                nextLabel={'Trang sau'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        </>
    );
};

export default ContractNoti;
