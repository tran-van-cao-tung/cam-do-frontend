import { styled } from "@mui/material/styles";
import { Grid, Paper } from '@mui/material'
import React from 'react'

function AuthEmployee() {


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: "22px 19px 22px 27px",
        borderRadius: "10px",
        color: theme.palette.text.secondary,
      }));

    return (
        <div className="box_employee">
            <h1 className="employee_heading-add">Phân quyền nhân viên</h1>
            <Grid container spacing={2} >
                <Grid item xs={12}>
                    <Item>
                    </Item>
                </Grid>
            </Grid>
        </div>
    )
}

export default AuthEmployee