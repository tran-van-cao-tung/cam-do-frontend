import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import './popup.css';
import callAPI from '../../../API';
import { formatDate } from '../../../helpers/dateTimeUtils';

function History({ showContractId }) {
    const columns = [
        {
            field: 'logTime',
            headerName: 'Ngày thực hiện',
            width: 120,
            valueFormatter: (params) => formatDate(params.value),
        },

        { field: 'userName', headerName: 'Giao dịch viên', width: 150 },

        {
            field: 'eventType',
            headerName: 'Loại hoạt động',
            width: 150,
            valueGetter: (params) =>
                `${
                    params.row.eventType === 1
                        ? 'Tạo hợp đồng'
                        : params.row.eventType === 2
                        ? 'Trễ hạn đóng lãi'
                        : params.row.eventType === 3
                        ? 'Đã đóng đủ lãi'
                        : params.row.eventType === 4
                        ? 'Đóng hợp đồng'
                        : params.row.eventType === 5
                        ? 'Còn nợ lãi'
                        : ''
                }`,
        },
        {
            field: 'description',
            headerName: 'Ghi chú',
            width: 500,
            valueGetter: (params) =>
                `${
                    params.row.eventType === 1
                        ? `${params.row.description ? params.row.description : ''}`
                        : params.row.eventType === 2
                        ? `${params.row.description ? params.row.description : ''}`
                        : params.row.eventType === 3
                        ? `${params.row.description ? params.row.description : ''}`
                        : params.row.eventType === 4
                        ? `${params.row.description ? params.row.description : ''}`
                        : params.row.eventType === 5
                        ? `${params.row.description ? params.row.description : ''}`
                        : ''
                }`,
        },
    ];

    const [rows, setRowws] = useState([]);
    useEffect(() => {
        const id = showContractId;
        callAPI({
            method: 'get',
            url: `logContract/logContractById/${id}`,
        }).then((res) => {
            setRowws(res.data);
        });
    }, [showContractId]);
    console.log(rows);
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                getRowId={(row) => row.logContractId}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                style={{ textAlign: 'center' }}
                className="custom-grid"
            />
        </div>
    );
}

export default History;
