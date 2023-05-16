import API from '../../../API';
import * as React from 'react';
import { useEffect, useState } from 'react';
import './chainstores.css';

import { formatMoney } from '../../../helpers/dateTimeUtils';
import { isAvailableArray } from '../../../helpers/utils';
import CustomizedTables from '../../../helpers/CustomizeTable';
import { Box, Pagination, Stack } from '@mui/material';
import { useMemo } from 'react';

const DEFAULT = {
    pageNumber: 1,
    pageSize: 6,
    totalPage: 1,
};
const ChainStores = () => {
    // Axios

    // Axios
    useEffect(() => {
        API({
            method: 'get',
            url: '/branch/getAll/0',
        }).then((res) => {
            setLogContract(res.data);
        });
    }, []);
    // ==================================
    // |            Phân Trang        |
    // ==================================
    const [logContract, setLogContract] = useState([]);
    const [page, setPage] = useState(DEFAULT.pageNumber);
    const [pageSize] = useState(DEFAULT.pageSize);

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
            nameHeader: 'Tên cửa hàng',
            dataRow: (element) => {
                return element.branchName;
            },
        },
        {
            nameHeader: 'Vốn hiện tại',
            dataRow: (element) => {
                return formatMoney(element.currentFund);
            },
        },
        {
            nameHeader: 'Địa chỉ',
            dataRow: (element) => {
                return element.address;
            },
        },
        {
            nameHeader: 'Số Điện Thoại',
            dataRow: (element) => {
                return element.phoneNumber;
            },
        },

        {
            nameHeader: 'Hợp đồng thanh lý',
            dataRow: (element) => {
                return element.liquidationContracts;
            },
        },
    ];

    return (
        <>
            <div className="tableChainStores">
                {/* <TableContainer> */}
                <h1 id="heading">Tổng quát các cửa hàng</h1>
                <div className="transaction"></div>
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

export default ChainStores;
