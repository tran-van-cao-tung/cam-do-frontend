// import { Grid } from "@mui/material";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
const BtnForReportYear = () => {
  return (
    <div>
      <div className="reportYearContainer">
        {/* </Grid>
        <Grid item xs={3}> */}
        <div className="yearOption">
          <select className="lts">
            <option>2023</option>
            <option>2022</option>
            <option>2021</option>
          </select>
        </div>
        {/* <Grid container spacing={2}>
        <Grid item xs={3}> */}
        <div className="search-hd">
          <button className="btn__click-search">
            <AiOutlineSearch className="icon-search posi__none" />
          </button>
        </div>
        {/* </Grid>
      </Grid> */}
      </div>
    </div>
  );
};

export default BtnForReportYear;
