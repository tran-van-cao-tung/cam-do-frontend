import "./DetaisPawn.css";
import moment from "moment";
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import API from '../../API';
import cash from './../../asset/img/cash.png';
const ContractNoti = () => {
  //
  const [list, setList] = useState([]);
  // Axios
  useEffect(() => {
    API({
      method: 'get',
      url: '/notification/notificationList/1',
  }).then((res) => {
      setList(res.data);
      // console.log('aaaaa', res.data);
  });
  }, []);
  // ==================================
  // |  Filter Value Radio and Search |
  // ==================================
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const filteredData = list
    .filter((item) => {
      if (statusFilter === 'all') return true;
      return item.status === (statusFilter === 'active' ? 0 : 1);
    })
    .filter((item) => {
      if (searchTerm.value === '') return item;
      if (item.branchName.toLowerCase().includes(searchTerm.toLowerCase())) return item;
    });
  // ==================================
  // |            Phân Trang        |
  // ==================================
  const [currentPage, setCurrentPage] = useState('');
  const storesPerPage = 4; // số lượng cửa hàng hiển thị trên mỗi trang
  const totalPages = Math.ceil(filteredData.length / storesPerPage); // tính toán số lượng trang
  const startIndex = currentPage * storesPerPage;
  const endIndex = startIndex + storesPerPage;
  const currentPageData = filteredData.slice(startIndex, endIndex);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };
  return (
    <div className="details-pawn">
      <h1 className="header"> <h1>Thông báo thu nợ hôm nay</h1></h1>
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
                  <th>Ngày cầm</th>
                  <th>Ngày đến hạn</th>
                  <th>Lý do</th>
                  <th>Chức năng</th>
                </tr>
                {currentPageData.map((item, index) => (
                  <tr key={index.branchId}>
                    <td>{index + 1}</td>
                    <td>{item.branchName}</td>
                    <td>{item.address}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{Intl.NumberFormat({ style: 'currency', currency: 'VND' }).format(item.fund)}</td>
                    <td>{moment(item.createDate).format('DD/MM/YYYY')}</td>
                    <td>
                      {item.status === 1 ? (
                        <div className="MuiTableBody_root-status">Đã tạm đừng</div>
                      ) : (
                        <div className="MuiTableBody_root-status activity">Đang hoạt động</div>
                      )}
                    </td>
                    <td>
                      <div className="MuiTableBody_root-itemLast">
                        <img src={cash} alt="" />
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
    </div>
  );
};

export default ContractNoti;
