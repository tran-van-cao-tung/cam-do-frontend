import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import React from 'react';
import './CustomerManager.css';
import ListCustomer from './ListCustomer';
import PageHeader from '../../helpers/PageHeader';
// import Grid from "@mui/material/Grid";
const HeaderCustomer = () => {
    return (
        <div className="headerCustomer">
            <PageHeader title="Quản Lý Khách Hàng" />

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
