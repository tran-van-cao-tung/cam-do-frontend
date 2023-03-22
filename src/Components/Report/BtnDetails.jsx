import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AiOutlineSearch } from "react-icons/ai";
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
          <Grid item xs={3}>
            <div className="search-hd">
              <input placeholder="Tìm Kiếm HĐ" />
              <AiOutlineSearch className="icon-search" />
            </div>
          </Grid>
          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="Từ ngày"
                  inputFormat="DD/MM/YYYY"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                  className="since"
                />
              </Stack>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="Đến ngày"
                  inputFormat="DD/MM/YYYY"
                  value={value1}
                  onChange={handleChange1}
                  renderInput={(params) => <TextField {...params} />}
                  className="since"
                />
              </Stack>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={2}>
            <select className="lts">
              <option>Tình Trạng</option>
              <option>loại 1</option>
              <option>loại 2</option>
            </select>
          </Grid>
          <Grid item xs={1}>
            <div className="search-hd">
              <button className="btn__click-search">
                <AiOutlineSearch className="icon-search posi__none" />
              </button>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default BtnDetails;
