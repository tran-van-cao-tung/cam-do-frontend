import React, { useState } from 'react';
import ErrorBoundary from '../../ErrorBoundary';
import './ReportComponent.css';
import BtnForReportYear from './BtnForReportYear';
import ChartLine from './LineChart/ChartLine';

const ReportYear = () => {
    const [value, setValue] = useState();
    const [year, setYear] = useState([]);
    console.log('value', value);
    console.log('valueYear', year);
    console.log('valuevalue', setValue);
    return (
        <div className="report">
            <div className="headerReport">
                <h1 className="reportTitle">Báo Cáo</h1>
                <BtnForReportYear setValue={setValue} year={year} />
            </div>
            <div className="parperCustomer">
                <ErrorBoundary>
                    <ChartLine value={value} setYear={setYear} />
                </ErrorBoundary>
            </div>
        </div>
    );
};

export default ReportYear;
