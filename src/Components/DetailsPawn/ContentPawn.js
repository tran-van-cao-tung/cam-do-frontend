import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TablePawn from './TablePawn';

const ContentPawn = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "#D9D9D9",
    borderRadius: "15px",
  }));
  
  return (
    <div className="content-details">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={5.7}>
            <Item>
              <p className="details-content">Quỹ tiền mặt</p>
              <span className="details-content">0</span>
            </Item>
          </Grid>
          <Grid item xs={0.6}></Grid>
          <Grid item xs={5.7}>
            <Item>
              <p className="details-content">Tiền cho vay</p>
              <span className="details-content">0</span>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <p className="details-content">Tiền nợ</p>
              <span className="details-content">0</span>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <p className="details-content">Lãi dự kiến</p>
              <span className="details-content">0</span>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <p className="details-content">Lãi đã thu</p>
              <span className="details-content">0</span>
            </Item>
          </Grid>
          
          
        </Grid>
      </Box>
      
    </div>
  );
};

export default ContentPawn;
