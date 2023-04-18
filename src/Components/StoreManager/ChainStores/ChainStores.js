import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import API from '../../../API';
import * as React from 'react';
import { useEffect, useState } from 'react';
import './chainstores.css';
import ReactPaginate from 'react-paginate';

const ChainStores = () => {
    // Axios
    const [chainstores, setchainstores] = useState([]);
    // Axios
    useEffect(() => {
        API({
            method: 'get',
            url: '/branch/getChain',
        }).then((res) => {
            setchainstores(res.data);
        });
    }, []);
    // ==================================
    // |            Phân Trang        |
    // ==================================
    const [currentPage, setCurrentPage] = useState('');
    const storesPerPage = 6; // số lượng cửa hàng hiển thị trên mỗi trang
    const totalPages = Math.ceil(chainstores.length / storesPerPage); // tính toán số lượng trang
    const startIndex = currentPage * storesPerPage;
    const endIndex = startIndex + storesPerPage;
    const currentPageData = chainstores.slice(startIndex, endIndex);

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };
    return (
        <>
            <div className="tableChainStores">
                <TableContainer>
                    <h1 className="heading">Tổng quát các cửa hàng</h1>
                    <div className="transaction"></div>
                    {/* ================================ */}
                    {/* =            Table Show        = */}
                    {/* ================================ */}
                    <table className="responstable">
                        <tr>
                            <th>Tên cửa hàng</th>
                            <th data-th="Driver details">
                                <span>Quỹ tiền mặt</span>
                            </th>
                            <th>Vốn đầu tư</th>
                            <th>Cho vay cầm đồ</th>
                            <th>Lãi đã thu</th>
                        </tr>
                        {currentPageData.map((currentPageData) => (
                            <tr key={currentPageData.branchName}>
                                <td>{currentPageData.branchName}</td>
                                <td align="center">
                                    {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                        currentPageData.balance,
                                    )}
                                </td>
                                <td align="center">
                                    {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                        currentPageData.fund,
                                    )}
                                </td>
                                <td align="center">
                                    {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                        currentPageData.loan,
                                    )}
                                </td>
                                <td align="center">
                                    {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                        currentPageData.recveivedInterest,
                                    )}
                                </td>
                            </tr>
                        ))}
                    </table>
                    {/* ================================ */}
                    {/* =            Phân Trang        = */}
                    {/* ================================ */}
                </TableContainer>
            </div>
            <ReactPaginate
                className="paginate-chainStore"
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

export default ChainStores;
