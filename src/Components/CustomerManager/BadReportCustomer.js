import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import React from 'react';
import './CustomerManager.css';
import BadCustomerList from './BadCustomerList.js';

// import Grid from "@mui/material/Grid";
const BadReportCustomer = () => {
    return (
        <div className="headerCustomer">
            <h1 className="headerCustomerName">Khách Hàng Bị Báo Xấu</h1>
            <div>
                {/* <Grid container spacing={2}>
          <Grid item xs={12}> */}

                <BadCustomerList />

                {/* </Grid>
        </Grid> */}
            </div>
        </div>
    );
};

export default BadReportCustomer;
