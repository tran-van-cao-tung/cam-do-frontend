import React, { useEffect, useState, useMemo } from 'react';
import cash from '../../asset/img/cash.png';
import wallet from '../../asset/img/wallet.png';

import subwallet from '../../asset/img/subwallet.png';

import { formatDate, formatMoney } from '../../helpers/dateTimeUtils';
import Tooltip from '@mui/material/Tooltip';
import CustomizedTables from '../../helpers/CustomizeTable';
import { isAvailableArray } from '../../helpers/utils';
import { Grid, Box, Stack, Pagination } from '@mui/material';
import BtnDetails from './BtnDetails';

const DEFAULT = {
    pageNumber: 1,
    pageSize: 6,
    totalPage: 1,
};

const TablePawn = ({
    setShowUpdateContract,
    setShowliquidation,
    setshowdetailContract,
    setShowContractId,
    setShowExpiration,
    filteredContracts,
    contracts,
    filters,
    setFilters,
    setShowAddContract,
}) => {
    const handleShow = (id) => {
        setShowUpdateContract(true);
        localStorage.setItem('PawnDetailID', id);
        console.log('Update ', id);
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

    /////////////////////////////////////////////////
    const [page, setPage] = useState(DEFAULT.pageNumber);
    const [pageSize] = useState(DEFAULT.pageSize);
    const handlePagination = (e, value) => {
        setPage(value);
    };

    useEffect(() => {
        setPage(DEFAULT.pageNumber);
    }, [filteredContracts]);

    // Memorize
    const totalPage = useMemo(() => {
        const result = Math.ceil(filteredContracts.length / pageSize);
        return result;
    }, [filteredContracts?.length, pageSize]);

    const renderedData = useMemo(() => {
        if (!isAvailableArray(filteredContracts)) return [];

        const start = (page - 1) * pageSize;
        const end = page * pageSize;
        return filteredContracts.slice(start, end);
    }, [filteredContracts, page, pageSize]);

    const dataTable = [
        {
            nameHeader: 'Mã HĐ',
            dataRow: (element) => {
                return element.contractCode;
            },
        },
        {
            nameHeader: 'Khách hàng',
            dataRow: (element) => {
                return element.customerName;
            },
        },
        {
            nameHeader: 'CCCD',
            dataRow: (element) => {
                return element.cccd + ' ';
            },
        },
        {
            nameHeader: 'Mã TS',
            dataRow: (element) => {
                return element.commodityCode;
            },
        },
        {
            nameHeader: 'Tên tài sản',
            dataRow: (element) => {
                return element.contractAssetName;
            },
        },
        {
            nameHeader: 'Tiền cầm',
            dataRow: (element) => {
                return formatMoney(element.loan);
            },
        },
        {
            nameHeader: 'Ngày Cầm',
            dataRow: (element) => {
                return formatDate(element.contractStartDate);
            },
        },
        {
            nameHeader: 'Đến Hạn',
            dataRow: (element) => {
                return formatDate(element.contractEndDate);
            },
        },
        {
            nameHeader: 'Kho',
            dataRow: (element) => {
                return element.warehouseName;
            },
        },
        {
            nameHeader: 'Tình Trạng',
            dataRow: (element) => {
                return element.status === 1 ? (
                    <div className="statusDangCam">Đang Cầm</div>
                ) : element.status === 2 ? (
                    <div className="statusTreHen">Trễ Hẹn</div>
                ) : element.status === 3 ? (
                    <div className="statusThanhLy">Thanh Lý</div>
                ) : element.status === 4 ? (
                    <div className="statusDaDong">Đã Đóng</div>
                ) : (
                    ''
                );
            },
            dataRowExport: (element) => {
                return element.status === 1
                    ? 'Đang Cầm'
                    : element.status === 2
                    ? 'Trễ Hẹn'
                    : element.status === 3
                    ? 'Thanh Lý'
                    : element.status === 4
                    ? 'Đã Đóng'
                    : '';
            },
        },
        {
            nameHeader: 'Chức năng',
            dataRow: (i) => {
                return (
                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <Tooltip title="Đóng tiền lãi">
                                <img
                                    onClick={(e) => {
                                        handleShowDetailContract(i.contractId);
                                    }}
                                    src={cash}
                                    alt="..."
                                />
                            </Tooltip>
                        </Grid>

                        <Grid item xs={4}>
                            <Tooltip title="Chi tiết">
                                <img onClick={(e) => handleShow(i.contractId)} src={wallet} alt="Edit" />
                            </Tooltip>
                        </Grid>
                        {i.status === 4 ? (
                            ''
                        ) : (
                            <Grid item xs={4}>
                                <Tooltip title="Đáo hạn">
                                    <img
                                        onClick={(e) => {
                                            hanleShowExpiration(i.contractId);
                                        }}
                                        src={subwallet}
                                        alt="Đáo hạn"
                                    />
                                </Tooltip>
                            </Grid>
                        )}
                    </Grid>
                );
            },
            dataUnExport: true,
        },
    ];

    const prepareExportData = (list, config) => {
        return list.map((item) => {
            const resultItem = {};
            config.forEach((col) => {
                if (col.dataUnExport) {
                    return;
                }
                const colName = col.nameHeader;
                resultItem[colName] = (() => {
                    if (col.dataRowExport) {
                        return col.dataRowExport(item);
                    }
                    if (col.dataRow) {
                        return col.dataRow(item);
                    }
                    return '';
                })();
            });
            return resultItem;
        });
    };

    const exportDataTable = () => {
        const list = [...filteredContracts]; //coppy mảng
        const config = dataTable;
        const data = prepareExportData(list, config);
        return data;
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <BtnDetails
                    prepareExportData={prepareExportData}
                    exportDataTable={exportDataTable}
                    filters={filters}
                    setFilters={setFilters}
                    setShowAddContract={setShowAddContract}
                    contracts={contracts}
                />
            </Grid>
            <Grid item xs={12}>
                <Box
                    padding="20px"
                    boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
                    borderRadius="8px"
                    bgcolor="#fff"
                    fontSize="14px"
                >
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
                </Box>
            </Grid>
        </Grid>
    );
};

export default TablePawn;
