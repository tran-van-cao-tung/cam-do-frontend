import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './Commodity.css';
import './Table.scss';
import callAPI from '../../../API';

import CustomizedTables from '../../../helpers/CustomizeTable';
import { Box, Pagination, Stack } from '@mui/material';
import { isAvailableArray } from '../../../helpers/utils';

const DEFAULT = {
    pageNumber: 1,
    pageSize: 6,
    totalPage: 1,
};

function Commodity() {
    const [logContract, setLogContract] = useState([]);
    const [page, setPage] = useState(DEFAULT.pageNumber);
    const [pageSize] = useState(DEFAULT.pageSize);
    useEffect(() => {
        callAPI({
            method: 'get',
            url: `/pawnableProduct/getAll/1`,
        }).then((res) => {
            console.log(res.data);
            setLogContract(res.data);
        });
    }, []);

    // ==================================
    // |  Filter Value Radio and Search |
    // ==================================
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = logContract.filter((item) => {
        if (statusFilter === 'all' && searchTerm === '') return true;
        if (statusFilter !== 'all' && item.status !== (statusFilter === 'active' ? 1 : 0)) return false;
        if (searchTerm !== '' && !item.typeOfProduct.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        return true;
    });
    // // ==================================
    // // |            Phân trang          |
    // // ==================================

    // Memorize
    const totalPage = useMemo(() => {
        const result = Math.ceil(logContract.length / pageSize);
        return result;
    }, [logContract?.length, pageSize]);

    const renderedData = useMemo(() => {
        if (!isAvailableArray(logContract)) return [];

        const start = (page - 1) * pageSize;
        const end = page * pageSize;
        return logContract.slice(start, end);
    }, [logContract, page, pageSize]);
    const handlePagination = (e, value) => {
        setPage(value);
    };

    const dataTable = [
        {
            nameHeader: 'STT',
            dataRow: (element) => {
                return element.pawnableProductId;
            },
        },
        {
            nameHeader: 'Lĩnh vực',
            dataRow: (element) => {
                return <p>Cầm Đồ</p>;
            },
        },
        {
            nameHeader: 'Tên hàng hoá',
            dataRow: (element) => {
                return <Link to={`/commodity/edit/${element.pawnableProductId}`}>{element.typeOfProduct}</Link>;
            },
        },
        {
            nameHeader: 'Mã',
            dataRow: (element) => {
                return <Link to={`/commodity/edit/${element.pawnableProductId}`}>{element.commodityCode}</Link>;
            },
        },
        {
            nameHeader: 'Tình trạng',
            dataRow: (element) => {
                return element.status === 1 ? (
                    <div className="MuiTableBody_working-status">Đang hoạt động</div>
                ) : (
                    <div className="MuiTableBody_stop-status">Đã tạm dừng</div>
                );
            },
        },
    ];
    return (
        <>
            <h1 id="heading">Loại tài sản</h1>
            <div className="listCommodity">
                <div className="listCommoditybody">
                    {/* Button  Add */}
                    <Link to="/commodity/add">
                        <button className="addlistCommodity">Thêm mới loại tài sản</button>
                    </Link>
                    {/* Status */}
                    <div className="status">
                        <span>Tình Trạng</span>
                        {/* From status  */}
                        <span className="fromstatus">
                            <FormControl className="form-iteam">
                                <RadioGroup
                                    className="radioItem"
                                    aria-label="status"
                                    name="status"
                                    elementue={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <FormControlLabel
                                        value="all"
                                        control={<Radio />}
                                        label="Tất cả"
                                        className="radio-all"
                                    />
                                    <FormControlLabel
                                        value="active"
                                        control={<Radio />}
                                        label="Đang hoạt động"
                                        className="radio-active"
                                    />
                                    <FormControlLabel
                                        value="stop"
                                        control={<Radio />}
                                        label="Đã tạm dừng"
                                        className="radio-stop"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </span>
                        {/* Search */}
                        <div className="searchinput">
                            <input
                                type="text"
                                placeholder="Tìm kiếm cửa hàng..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                {/* ================================ */}
                {/* =            Table Show        = */}
                {/* ================================ */}
                <CustomizedTables renderedData={renderedData} dataTable={dataTable} />
                <Box marginTop="14px">
                    <Stack spacing={2}>
                        <Pagination
                            style={{ margin: '0 auto' }}
                            count={totalPage}
                            page={page}
                            onChange={handlePagination}
                            color="primary"
                        />
                    </Stack>
                </Box>
            </div>
        </>
    );
}

export default Commodity;
