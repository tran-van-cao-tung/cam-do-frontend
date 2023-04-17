import React, { useState, useEffect } from 'react';
import "./EditCommondity.css";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputBase from "@mui/material/InputBase";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Divider } from "@mui/material";

const EditCommondity = () => {
  const params = useParams();


  // Axios
  useEffect(() => {
    async function callAPI() {
      await axios({
        method: 'get',
        url: `https://tranvancaotung1-001-site1.htempurl.com/api/v1/pawnableProduct/getPawnAbleProductById/${params.id}`,
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem('accessToken')}`
      },
      }).then((res) => {
        setItem(res.data);
        // console.log(res.data);
      });
    }
    callAPI();
  }, []);

  const [item, setItem] = useState([]);

  const handleSubmitEdit = () => {
    axios({
      method: 'put',
      url: `https://tranvancaotung1-001-site1.htempurl.com/api/v1/pawnableProduct/updatePawnableProduct/${params.id}`,
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('accessToken')}`
    },
      data: {
        commodityCode: item.commodityCode,
        typeOfProduct: item.typeOfProduct,
        status: item.status,
      },
    })
      .then((res) => {
        console.log('Success Full');
        alert('Lưu Thành Công');
      })
      .catch((err) => console.log(err));
  };

  const handleOnChangeName = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
    // console.log(name);
  };


  return (
    <>
      <div className="Addcommondity">
        <h1>Cập nhật cấu hình hàng hóa</h1>
        <div className="wareh-content">
          <div className="add-content">
            {/* Left */}
            <div className="add-commodity-left">
              <h3>Nhập thông tin hàng hoá</h3>
              <Divider />
              <FormControl className="add-input-group">
                <FormLabel className="label">
                  Mã hàng&nbsp;<label style={{ color: "red" }}>*</label>:
                </FormLabel>
                <InputBase
                  placeholder="XM"
                  inputProps={{ "aria-label": "search" }}
                  className="add-input"
                  value={item.commodityCode}
                  name="commodityCode"
                  onChange={handleOnChangeName}
                />
              </FormControl>

              <FormControl className="add-input-group">
                <FormLabel className="label">
                  Tên hàng hoá&nbsp;<label style={{ color: "red" }}>*</label>:
                </FormLabel>
                <InputBase
                  placeholder="Xe máy SH"
                  inputProps={{ "aria-label": "search" }}
                  className="add-input"
                  value={item.typeOfProduct}
                  name="typeOfProduct"
                  onChange={handleOnChangeName}

                />
              </FormControl>
              <FormControl className="add-status-group">
                <FormLabel className="label">
                  Tình trạng&nbsp;<label style={{ color: "red" }}>*</label>:
                </FormLabel>
                <RadioGroup row name="status" defaultValue={0}>
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="Đang hoạt động"
                    className="radio-available"
                  />

                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Khoá"
                    className="radio-closed"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>

          <Divider />

          <div className="add-actions">
            <Button className="save-btn" variant="contained" onClick={handleSubmitEdit} >
              Lưu lại
            </Button>

            <Button className="back-btn" variant="contained" href="/commodity">
              Quay lại
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCommondity;

//Cập nhật API cấu hình hàng hoá
// API cấu hình hàng hoá : https://tranvancaotung1-001-site1.htempurl.com/api/v1/pawnableProduct/getAll/1