// import { Grid } from "@mui/material";
import React, { useEffect, useState } from 'react';
import API from '../../API';
const BtnForReportYear = ({ setValue }) => {
    const [listYear, setListYear] = useState([]);
    // const currentYear = new Date().getFullYear();
    // setValue(currentYear);
    useEffect(() => {
        API({
            method: 'get',
            url: '/ledger/yearsOfLeger',
        }).then((res) => {
            setListYear(res.data);
        });
    }, []);
    const handleChange = (e) => {
        setValue(e.target.value);
    };
    return (
        <div>
            <div className="reportYearContainer">
                <div className="yearOption">
                    <select className="ltsReport" onChange={handleChange}>
                        {listYear.map((value, i) => (
                            <option key={i}>{value}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default BtnForReportYear;
