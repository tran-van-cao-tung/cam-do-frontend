import React, { useState } from 'react';
import ErrorBoundary from '../../ErrorBoundary';
import './ReportComponent.css';
import BtnForReportYear from './BtnForReportYear';
import ChartLine from './LineChart/ChartLine';
import PageHeader from '../../helpers/PageHeader';

const ReportYear = () => {
    const [value, setValue] = useState();
    const [year, setYear] = useState([]);
    console.log('value in Repỏt', value);
    console.log('valueYear', year);
    console.log('valuevalue', setValue);
    return (
        <div className="report">
            <div className="headerReport">
                <PageHeader title="Báo Cáo" />

                <BtnForReportYear setValue={setValue} year={year} />
            </div>
            <div className="parperCustomer">
                <ErrorBoundary>
                    <ChartLine value={value} setYear={setYear} year={year} />
                </ErrorBoundary>
            </div>
        </div>
    );
};

export default ReportYear;
