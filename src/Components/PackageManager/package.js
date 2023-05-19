import React, { useEffect, useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import API from '../../API';
import edit from './../../asset/img/edit.png';
import './package.css';

import { isAvailableArray } from '../../helpers/utils';
import CustomizedTables from '../../helpers/CustomizeTable';
import { Box, Pagination, Stack } from '@mui/material';
import PageHeader from '../../helpers/PageHeader';

const DEFAULT = {
    pageNumber: 1,
    pageSize: 8,
    totalPage: 1,
};

const Package = () => {
    //
    const navigate = useNavigate();

    const [page, setPage] = useState(DEFAULT.pageNumber);
    const [pageSize] = useState(DEFAULT.pageSize);
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
            .catch((err) => console.log('Err at API package'));
    }, []);

    const totalPage = useMemo(() => {
        const result = Math.ceil(packageList.length / pageSize);
        return result;
    }, [packageList?.length, pageSize]);

    const renderedData = useMemo(() => {
        if (!isAvailableArray(packageList)) return [];

        const start = (page - 1) * pageSize;
        const end = page * pageSize;
        return packageList.slice(start, end);
    }, [packageList, page, pageSize]);
    const handlePagination = (e, value) => {
        setPage(value);
    };

    const dataTable = [
        {
            nameHeader: 'Tên gói vay',
            dataRow: (element) => {
                return element.packageName;
            },
        },
        {
            nameHeader: 'Lãi suất (%)',
            dataRow: (element) => {
                return element.packageInterest;
            },
        },
        {
            nameHeader: 'Số ngày',
            dataRow: (element) => {
                return element.day;
            },
        },
        {
            nameHeader: 'Kỳ lãi',
            dataRow: (element) => {
                return element.paymentPeriod;
            },
        },
        {
            nameHeader: 'Số ngày trễ hạn',
            dataRow: (element) => {
                return element.limitation;
            },
        },
        {
            nameHeader: 'Phạt đợt 1',
            dataRow: (element) => {
                return element.punishDay1;
            },
        },
        {
            nameHeader: 'Phạt đợt 2',
            dataRow: (element) => {
                return element.punishDay2;
            },
        },
        {
            nameHeader: 'Thanh lý vào ngày',
            dataRow: (element) => {
                return element.liquitationDay;
            },
        },
        {
            nameHeader: 'Phạt trễ lãi',
            dataRow: (element) => {
                return element.interestDiaryPenalty;
            },
        },
        {
            nameHeader: 'Phạt chuộc sớm',
            dataRow: (element) => {
                return element.ransomPenalty;
            },
        },
        {
            nameHeader: 'Chức năng',
            dataRow: (element) => {
                return (
                    <div
                        className="MuiTableBody_root-itemLast"
                        onClick={() => {
                            navigate(`/editPackage/${element.packageId}`);
                        }}
                    >
                        <img src={edit} alt="Edit" />
                    </div>
                );
            },
        },
    ];
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

    return (
        <>
            <PageHeader title="Điều chỉnh gói vay" />

            <div className="listPackage">
                <button
                    className="employee_button"
                    onClick={() => {
                        navigate('/addPackage');
                    }}
                >
                    Thêm mới
                </button>
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
};

export default Package;
