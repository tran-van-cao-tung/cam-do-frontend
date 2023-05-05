import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import React from 'react';
import './CustomerManager.css';
import ListCustomer from './ListCustomer';
// import Grid from "@mui/material/Grid";
const HeaderCustomer = () => {
    return (
        <div className="headerCustomer">
            <h1 id="heading">Quản Lý Khách Hàng</h1>
            <div>
                {/* <Grid container spacing={2}>
          <Grid item xs={12}> */}

                <ListCustomer />

                {/* </Grid>
        </Grid> */}
            </div>
        </div>
    );
};

export default HeaderCustomer;
