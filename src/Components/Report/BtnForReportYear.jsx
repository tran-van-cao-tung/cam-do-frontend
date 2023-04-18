// import { Grid } from "@mui/material";
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
const BtnForReportYear = () => {
    return (
        <div>
            <div className="reportYearContainer">
                <div className="yearOption">
                    <select className="ltsReport">
                        <option>2023</option>
                        <option>2022</option>
                        <option>2021</option>
                    </select>
                </div>

                <div className="searchReport">
                    <button className="btn__clickSearchReport">
                        <AiOutlineSearch className="posi__none" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BtnForReportYear;
