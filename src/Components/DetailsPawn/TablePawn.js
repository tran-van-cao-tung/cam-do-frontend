import React, { useContext, useEffect, useState, useMemo } from 'react';
import cash from '../../asset/img/cash.png';
import wallet from '../../asset/img/wallet.png';
import API from '../../API.js';
import subwallet from '../../asset/img/subwallet.png';
import thanhly from '../../asset/img/thanhly.png';

import { AuthContext } from '../../helpers/AuthContext';

import { formatDate, formatMoney } from '../../helpers/dateTimeUtils';
import Tooltip from '@mui/material/Tooltip';
import CustomizedTables from '../../helpers/CustomizeTable';
import { isAvailableArray } from '../../helpers/utils';
import { Grid, Box, Stack, Pagination } from '@mui/material';

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
    setContract,
    rowsContract,
}) => {
    const { currentBranchId } = useContext(AuthContext);
    const handleShow = (id) => {
        setShowUpdateContract(true);
        localStorage.setItem('PawnDetailID', id);
        console.log('Update', id);
    };

    const handleShowLiquidation = (id) => {
        setShowliquidation(true);
        localStorage.setItem('PawnDetailID', id);
        console.log('Liquid', id);
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

    const [logContract, setLogContract] = useState([]);
    useEffect(() => {
        if (currentBranchId) {
            API({
                method: 'get',
                url: `contract/getAll/0/${currentBranchId}`,
            }).then((res) => {
                console.log(res.data);
                setLogContract(res.data);
            });
        }
    }, [currentBranchId, setContract]);

    /////////////////////////////////////////////////
    const [page, setPage] = useState(DEFAULT.pageNumber);
    const [pageSize] = useState(DEFAULT.pageSize);
    const handlePagination = (e, value) => {
        setPage(value);
    };
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
                return element.cccd;
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
            nameHeader: 'Ngày Đến Hạn',
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
        },
        {
            nameHeader: 'Chức năng',
            dataRow: (i) => {
                return (
                    <Box display="flex" justifyContent="start ">
                        <Tooltip title="Đóng tiền lãi">
                            <img
                                onClick={(e) => {
                                    handleShowDetailContract(i.contractId);
                                }}
                                src={cash}
                                alt="..."
                                style={{}}
                            />
                        </Tooltip>

                        <Tooltip title="Chi tiết">
                            <img onClick={(e) => handleShow(i.contractId)} src={wallet} alt="Edit" />
                        </Tooltip>

                        {i.status === 4 ? (
                            ''
                        ) : (
                            <Tooltip title="Đáo hạn">
                                <img
                                    onClick={(e) => {
                                        hanleShowExpiration(i.contractId);
                                    }}
                                    src={subwallet}
                                    alt="Đáo hạn"
                                />
                            </Tooltip>
                        )}

                            <Tooltip title="Thanh lý">
                                <img
                                    onClick={(e) => {
                                        handleShowLiquidation(i.contractId);
                                    }}
                                    src={thanhly}
                                    alt="TL"
                                />
                            </Tooltip>
                    </Box>
                );
            },
        },
    ];

    return (
        <Grid container spacing={2}>
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
