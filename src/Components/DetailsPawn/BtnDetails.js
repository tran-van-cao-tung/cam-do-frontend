import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";
import { AiOutlineSearch } from 'react-icons/ai';
const BtnDetails = () => {
    const [value, setValue] = React.useState();

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const [value1, setValue1] = React.useState();

  const handleChange1 = (newValue) => {
    setValue1(newValue);
  };
  return (
    <div className="btn-detail">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <div className="search-hd">
              <input placeholder="Tìm Kiếm HĐ" />
              <AiOutlineSearch className="icon-search" />
            </div>
          </Grid>
          <Grid item xs={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="Từ ngày"
                  inputFormat="DD/MM/YYYY"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                  className='since'
                />
              </Stack>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="Đến ngày"
                  inputFormat="MM/DD/YYYY"
                  value={value1}
                  onChange={handleChange1}
                  renderInput={(params) => <TextField {...params} />}
                  className='since'
                />
              </Stack>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={2}>
            <select className="lts">
              <option>--Loại TS--</option>
              <option>loại 1</option>
              <option>loại 2</option>
            </select>
          </Grid>
          <Grid item xs={2}>
            <select className="lts">
              <option>Tình Trạng</option>
              <option>loại 1</option>
              <option>loại 2</option>
            </select>
          </Grid>
          <Grid item xs={2}>
          <div className="search-hd">
              <input placeholder="Tìm Kiếm" />
              <AiOutlineSearch className="icon-search" />
            </div>
          </Grid>
        </Grid>
      </Box>
      
    </div>
  );
};

export default BtnDetails;
