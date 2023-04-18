import React from 'react';
import './ReportComponent.css';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import BtnForReportYear from './BtnForReportYear';
import TableReportYear from './TableReportYear';

const ReportYear = () => {
    return (
        <div className="report">
            <h1 className="reportTitle">Báo Cáo</h1>
            <div className="parperCustomer">
                <BtnForReportYear />
                <TableReportYear />
            </div>
        </div>
    );
};

export default ReportYear;
