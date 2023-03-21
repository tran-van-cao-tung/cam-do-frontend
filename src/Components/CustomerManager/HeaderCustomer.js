import React from "react";
import { styled } from "@mui/material/styles";
import "./CustomerManager.css";
import Paper from "@mui/material/Paper";
import SearchBar from "./SearchBar";
import ListCustomer from "./ListCustomer";
// import Grid from "@mui/material/Grid";
const HeaderCustomer = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: "22px 0 22px 27px",
    borderRadius: "10px",
    color: theme.palette.text.secondary,
    height: 700,
  }));
  return (
    <div className="headerCustomer">
      <h1 className="headerCustomerName">Quản Lý Khách Hàng</h1>
      <div>
        {/* <Grid container spacing={2}>
          <Grid item xs={12}> */}
        <Item className="parperCustomer">
          <SearchBar />
          <ListCustomer />
        </Item>
        {/* </Grid>
        </Grid> */}
      </div>
    </div>
  );
};

export default HeaderCustomer;
