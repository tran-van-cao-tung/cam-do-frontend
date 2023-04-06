import React from "react";
import homemenu from "../../asset/img/homemenu.png";
import user from "../../asset/img/user.png";
import bike from "../../asset/img/bike.png";
import usera from "../../asset/img/usera.png";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import './menu.css'
import { AiOutlineDown, AiOutlineAlignRight } from "react-icons/ai";
import { Link } from "react-router-dom";
const Menuh = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const deleteToken = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
    window.location.reload(false);
  };

  return (
    <div className="menu">
      <div className="content1">
        <div className="logos">
          <p className="logo">PawnS</p>
          <AiOutlineAlignRight className="ouline" />
        </div>
        <div className="select_option">
          <img src={homemenu} alt="Home" />
          <select>
            <option>S1</option>
            <option>S2</option>
            <option>S3</option>
          </select>
        </div>
      </div>
      <div className="content2">
        <div className="icon">
          <Link to={`/report-customer`}>
            <img src={user} alt='' />
          </Link>
          <span>1</span>
          <img src={bike} alt='' />
          <span>123</span>
        </div>
        <div className="account">
          <img src={usera} alt="user" className="avata" />
          <div className="setting">
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              Võ Văn Bưởi <AiOutlineDown/>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={deleteToken}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menuh;
