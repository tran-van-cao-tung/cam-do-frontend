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

    const formatMoney = (value) => {
        return value.toLocaleString('vi-VN') + ' VNĐ';
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
                            <th style={{maxWidth:"100px"}}>Tên cửa hàng</th>
                            <th data-th="Driver details">
                                Vốn hiện tại
                            </th>
                            <th style={{minWidth:"200px"}}>Địa chỉ</th>
                            <th>Số điện thoại</th>
                            <th /* style={{maxWidth:"100px"}} */>Hợp đồng thanh lý</th>
                        </tr>
                        {currentPageData.map((currentPageData, index) => (
                            <tr key={index}>
                                <td align="center" style={{textAlign:"left"/* ,paddingLeft:"50px" */}}>{currentPageData.branchName}</td>
                                <td align="center">
                                    {formatMoney(
                                        currentPageData.currentFund
                                    )}
                                </td>
                                <td align="center">
                                    {currentPageData.address}
                                </td>
                                <td align="center">
                                    {currentPageData.phoneNumber}
                                </td>
                                <td align="center">
                                    {currentPageData.liquidationContracts}
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
