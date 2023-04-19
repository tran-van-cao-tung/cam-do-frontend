import React, { useEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

import moment from 'moment';
import './popup.css';
import callAPI from '../../../API';

function History({ showContractId }) {
    //Ép kiểu dữ liệu date
    const formatDate = (value) => {
        return moment(value).format('MM/DD/YYYY');
    };

    //Ép kiểu dữ liệu vnd
    const formatVND = (value) => {
        return Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };
    const columns = [
        {
            field: 'STT',
            headerName: 'STT',
            width: 10,
            textAlign: 'center',
            valueGetter: (params) => {
                for (let i = 0; i < rows.length; i++) {
                    if (params.row.logContractId === rows[i].logContractId) {
                        return i + 1;
                    }
                }
            },
            sortable: false,
        },
        {
            field: 'logTime',
            headerName: 'Ngày trả lãi',
            with: 120,
            valueFormatter: (params) => formatDate(params.value),
        },

        { field: 'customerName', headerName: 'Giao dịch viên', width: 200 },
        {
            field: 'debt',
            headerName: ' Số tiền ghi nợ',
            with: 180,
            valueFormatter: (params) => formatVND(params.value),
        },
        {
            field: 'paid',
            headerName: 'Số tiền ghi có',
            width: 180,
            valueFormatter: (params) => formatVND(params.value),
        },
        {
            field: 'eventType',
            headerName: 'Nội dung',
            width: 150,
            valueGetter: (params) =>
                `${params.row.eventType === 1
                    ? 'Tạo hợp đồng'
                    : params.row.eventType === 2
                        ? 'Chưa đóng lãi'
                        : params.row.eventType === 3
                            ? 'Đã đóng lãi'
                            : params.row.eventType === 4
                                ? 'Đóng hợp đồng'
                                : params.row.eventType === 5 ?
                                    'Còn nợ lãi' : ""
                }`,
        },
        {
            field: 'description',
            headerName: 'Ghi chú',
            width: 500,
            valueGetter: (params) =>
                `${params.row.eventType === 1
                    ? `Tạo hợp đồng: ${params.row.description ? params.row.description : ''}`
                    : params.row.eventType === 2
                        ? `Kỳ hạn: ${params.row.description ? params.row.description : ''}`
                        : params.row.eventType === 3
                            ? `Kỳ hạn: ${params.row.description ? params.row.description : ''}`
                            : params.row.eventType === 4
                                ? `Đóng hợp đồng: ${params.row.description ? params.row.description : ''}`
                                : params.row.eventType === 5
                                    ? `Còn nợ lãi: ${params.row.description ? params.row.description : ''}`
                                    : ""
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
