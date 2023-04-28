import { StyledEngineProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import editIcon from './../../../asset/img/edit.png';
import ReactPaginate from 'react-paginate';
import './WareHouse.css';
import API from '../../../API';
const WareHouse = () => {
    const history = useNavigate();
    const [cityFilter, setCityFilter] = useState('HoChiMinh');
    const [statusFilter, setStatusFilter] = useState('available');

    const handleCityFilter = (e) => {
        setCityFilter(e.target.value);
    };

    const handleStatusFilter = (e) => {
        setStatusFilter(e.target.value);
    };

    // Axios
    const [listWarehouse, setListWarehouse] = useState([]);
    useEffect(() => {
        API({
            method: 'get',
            url: '/warehouse/GetAll/0',
        }).then((res) => {
            setListWarehouse(res.data);
             console.log('aaaaa', res.data);
        });
    }, []);
    // ==================================
    // |            Phân Trang        |
    // ==================================
    const [currentPage, setCurrentPage] = useState(0);
    const [warehousesPerPage] = useState(10);
    const offset = currentPage * warehousesPerPage;
    const currentWarehouses = listWarehouse.slice(offset, offset + warehousesPerPage);
    const pageCount = Math.ceil(listWarehouse.length / warehousesPerPage);

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };

    return (
        <>
            <StyledEngineProvider injectFirst>
                <div className="wareh-wrapper">
                    <h1 className="wareHouse_heading">Danh sách kho</h1>

                    <div className="wareh-content">
                        <button
                            className="wareHouse_button"
                            onClick={() => {
                                history('/warehouse/add');
                            }}
                        >
                            Thêm mới
                        </button>
                        {/* ================================ */}
                        {/* =            Table Show        = */}
                        {/* ================================ */}
                        <div className="tableWareHouse">
                            <table className="responstable">
                                <tr>
                                    <th>STT</th>
                                    <th data-th="Driver details">
                                        <span>Tên kho</span>
                                    </th>
                                    <th>Địa chỉ</th>
                                    <th>Tình trạng</th>
                                    <th>Chức năng</th>
                                </tr>
                                {currentWarehouses.map((i) => (
                                    <tr key={i.warehouseId}>
                                        <td>{i.warehouseId}</td>
                                        <td>
                                            <Link to={`/viewproduct/${i.warehouseId}`}>{i.warehouseName}</Link>
                                        </td>
                                        <td>{i.warehouseAddress}</td>
                                        <td>
                                            {i.status === 0 ? (
                                                <div className="MuiTableBody_root-status activity" >Đang hoạt động</div>
                                            ) : (
                                                <div className="MuiTableBody_root-status">Đã tạm dừng</div>
                                            )}
                                        </td>
                                        <td>
                                            <div className="MuiTableBody_root-itemLast">
                                                <Link to={`/editwarehouse/edit/${i.warehouseId}`}>
                                                    <img src={editIcon} alt="Edit" />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </div>
                </div>
            </StyledEngineProvider>
            {/* ================================ */}
            {/* =            Phân Trang        = */}
            {/* ================================ */}
            <ReactPaginate
                className="paginate-warehouse"
                previousLabel={'Trang trước'}
                nextLabel={'Trang sau'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        </>
    );
};

export default WareHouse;
