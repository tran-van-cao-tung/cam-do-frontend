import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../API';
import edit from './../../asset/img/edit.png';
import './package.css';

const Package = () => {
    //
    const history = useNavigate();
    const [packageList, setPackageList] = useState([]);
    // Axios
    useEffect(() => {
        API({
            method: 'get',
            url: '/package/getAll/0',
        })
            .then((res) => {
                setPackageList(res.data);
            })
            .catch((err) => console.log("Err at API package"));
    }, []);
    // ==================================
    // |  Filter Value Radio and Search |
    // ==================================
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const filteredData = packageList
        .filter((item) => {
            if (statusFilter === 'all') return true;
            return item.status === (statusFilter === 'active' ? 0 : 1);
        })
        .filter((item) => {
            if (searchTerm.value === '') return item;
            if (item.packageName.toLowerCase().includes(searchTerm.toLowerCase())) return item;
        });
    // ==================================
    // |            Phân Trang        |
    // ==================================
    const [currentPage, setCurrentPage] = useState('');
    const storesPerPage = 6; // số lượng cửa hàng hiển thị trên mỗi trang
    const totalPages = Math.ceil(filteredData.length / storesPerPage); // tính toán số lượng trang
    const startIndex = currentPage * storesPerPage;
    const endIndex = startIndex + storesPerPage;
    const currentPageData = filteredData.slice(startIndex, endIndex);

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };
    return (
        <>
            <h1 className="listPackagebody-h1">Điều chỉnh gói vay</h1>
            <div className="listPackage">
                <button
                    className="employee_button"
                    onClick={() => {
                        history('/addPackage');
                    }}
                >
                    Thêm mới
                </button>
                {/* ================================ */}
                {/* =            Table Show        = */}
                {/* ================================ */}
                <div className="tablePackage">
                    <table className="responstable">
                        <tr>
                            <th>STT</th>
                            <th>Tên gói vay</th>
                            <th data-th="Driver details">
                                <span>Lãi suất (%)</span>
                            </th>
                            <th>Số ngày</th>
                            <th>Kỳ lãi</th>
                            <th>Số ngày trễ hạn</th>
                            <th>Phạt đợt 1</th>
                            <th>Phạt đợt 2</th>
                            <th>Thanh lý vào ngày</th>
                            <th>Chức năng</th>
                        </tr>
                        {currentPageData.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.packageName}</td>
                                <td>{item.packageInterest}</td>
                                <td>{item.day}</td>
                                {/* <td>{Intl.NumberFormat({ style: 'currency', currency: 'VND' }).format(item.fund)}</td> */}
                                <td>{item.paymentPeriod}</td>
                                {/* <td>{moment(item.createDate).format('DD/MM/YYYY')}</td> */}
                                <td>{item.limitation}</td>
                                {/* <td>
                                    {item.status === 1 ? (
                                        <div className="MuiTableBody_root-status">Đã tạm đừng</div>
                                    ) : (
                                        <div className="MuiTableBody_root-status activity">Đang hoạt động</div>
                                    )}
                                </td> */}
                                <td>{item.punishDay1}</td>
                                <td>{item.punishDay2}</td>
                                <td>{item.liquitationDay}</td>
                                <td>
                                    <div className="MuiTableBody_root-itemLast" onClick={() => { history(`/editPackage/${item.packageId}`) }}>
                                        <img src={edit} alt="Edit" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
                {/* ================================ */}
                {/* =            Phân Trang        = */}
                {/* ================================ */}
                <ReactPaginate
                    className="paginate-listPackage"
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
            </div>
        </>
    );
};

export default Package;
