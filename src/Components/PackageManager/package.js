import React, { useEffect, useMemo, useState } from 'react';

import API from '../../API';
import edit from './../../asset/img/edit.png';
import './package.css';

import { isAvailableArray } from '../../helpers/utils';
import CustomizedTables from '../../helpers/CustomizeTable';
import { Box, Grid, Pagination, Stack, Tooltip } from '@mui/material';
import PageHeader from '../../helpers/PageHeader';
import CustomizeButton from '../../helpers/CustomizeButton';
import AddPackage from './AddPackage';
import EditPackage from './EditPackage';

const DEFAULT = {
    pageNumber: 1,
    pageSize: 8,
    totalPage: 1,
};

const Package = () => {
    //

    const [page, setPage] = useState(DEFAULT.pageNumber);
    const [pageSize] = useState(DEFAULT.pageSize);
    const [packageList, setPackageList] = useState([]);

    const fetchListCustomer = () => {
        API({
            method: 'get',
            url: '/package/getAll/0',
        })
            .then((res) => {
                setPackageList(res.data);
            })
            .catch((err) => console.log('Err at API package'));
    };
    // Axios
    useEffect(() => {
        fetchListCustomer();
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

    const [showEditPagkage, setShowEditPagkage] = useState(false);

    const handleShowEditPagkage = (id) => {
        setShowEditPagkage(true);
        localStorage.setItem('PagekageId', id);
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
            nameHeader: 'Phạt chuộc sớm %',
            dataRow: (element) => {
                return element.ransomPenalty;
            },
        },
        {
            nameHeader: 'Chức năng',
            dataRow: (element) => {
                return (
                    <Tooltip title="Cập nhật">
                        <img src={edit} alt="Edit" onClick={(e) => handleShowEditPagkage(element.packageId)} />
                    </Tooltip>
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

    const [showAddPagkage, setShowAddPagkage] = useState(false);
    const handleAddPackage = () => {
        setShowAddPagkage(true);
    };
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
                <PageHeader title="Điều chỉnh gói vay" />
                <CustomizeButton title="Thêm mới" handleClick={handleAddPackage} />
                {showAddPagkage && (
                    <AddPackage
                        refresh={fetchListCustomer}
                        showAddPagkage={showAddPagkage}
                        setShowAddPagkage={setShowAddPagkage}
                    />
                )}
            </Grid>

            {/* ================================ */}
            {/* =            Table Show        = */}
            {/* ================================ */}
            <Grid item xs={12}>
                <Box
                    padding="20px"
                    boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
                    borderRadius="8px"
                    bgcolor="#fff"
                    fontSize="14px"
                >
                    <CustomizedTables renderedData={renderedData} dataTable={dataTable} />
                    {showEditPagkage && (
                        <EditPackage
                            refresh={fetchListCustomer}
                            showEditPagkage={showEditPagkage}
                            setShowEditPagkage={setShowEditPagkage}
                        />
                    )}
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
                </Box>
            </Grid>
        </Grid>
    );
};

export default Package;
