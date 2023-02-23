import React from "react";
import Menuh from "../Menu/Menu";
import NavMenu from "./../Menu/NavMenu";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./layoutDefault.css";
const LayoutDefault = ({ children }) => {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        height: "100%",
        color: theme.palette.text.secondary,
        borderRadius: 0,
        boxShadow: "none",
    }));
    return (
        <div>
            <Menuh />
            <div className="layout">
                <Box sx={{ flexGrow: 1 }} style={{ height: "100%" }}>
                    <Grid container spacing={1} style={{ height: "100%" }}>
                        <Grid item xs={4} md={2.8} className="grid-content">
                            <Item>
                                <NavMenu />
                            </Item>
                        </Grid>
                        <Grid item xs={8} md={9.2} className="grid-content">
                            <Item>
                                <div className="containers">{children}</div>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    );
};

export default LayoutDefault;
