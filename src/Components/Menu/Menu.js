import React, { useEffect, useState } from 'react';
import homemenu from '../../asset/img/homemenu.png';
import warning from '../../asset/img/warning.png';
import clock from '../../asset/img/clock.jpg';
import usera from '../../asset/img/userAccount.png';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './menu.css';
import { Link, useNavigate } from 'react-router-dom';

import API from '../../API';

const Menuh = () => {
    const history = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    // const [showMenuUser, setShowMenuUser] = useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const deleteToken = () => {
        localStorage.clear();
        sessionStorage.clear();
        history('/login');
        window.location.reload(false);
    };

    const [itemUser, setItemUser] = useState();

    //get dữ liệu Lấy userId
    useEffect(() => {
        API({
            method: 'get',
            url: '/user/getAll/0',
        })
            .then((res) => {
                setItemUser(
                    res.data.filter((item, index) => {
                        return item.userId === localStorage.getItem('userId');
                    })[0],
                );
            })
            .catch((err) => console.log(err));
    }, []);

    const [branch, setBranch] = useState([]);
    const [branchUser, setBranchUser] = useState([]);
    const branchID = localStorage.getItem('branchId');
    useEffect(() => {
        API({
            method: 'get',
            url: `/branch/getAll/0`,
        }).then((res) => {
            setBranch(res.data);
            setBranchUser(
                res.data.filter((item, index) => {
                    return item.branchId == localStorage.getItem('branchId');
                })[0],
            );
        });
    }, [branchID]);

    console.log(branchUser);

    /* const [selectedOption, setSelectedOption] = useState(); */
    const [showValue, setShowValue] = useState();
    const handleBranch = (e) => {
        setShowValue(e.target.value);
        window.location.reload(false);
    };

    return (
        <div className="menu">
            <div className="content1">
                <div className="content1Container">
                    <div className="select_option">
                        <img src={homemenu} alt="Home" />
                        {localStorage.getItem('userName') === 'Admin' ? (
                            <select onChange={handleBranch} value={showValue}>
                                <option style={{ textAlign: 'center' }}>--Cửa hàng--</option>
                                {branch
                                    ? branch.map((item, index) => {
                                          return (
                                              <option key={index} value={item.branchId}>
                                                  {item.branchName}
                                              </option>
                                          );
                                      })
                                    : ''}
                            </select>
                        ) : (
                            <span
                                style={{
                                    fontSize: '33px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                {branchUser ? branchUser.branchName : ''}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className="content2">
                <div className="icon1 ">
                    <Link to={`/report-customer`}>
                        <img src={warning} alt="" />
                    </Link>
                    <span>1</span>
                </div>
                <div className="icon2">
                    <Link to={`/noti`}>
                        <img src={clock} alt="" />
                        <span>1</span>
                    </Link>
                </div>
                <div className="account">
                    <div className="setting">
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
                        >
                            <img src={usera} alt="user" className="avata" />
                            {itemUser
                                ? itemUser.fullName
                                : localStorage.getItem('userName')
                                ? localStorage.getItem('userName')
                                : ''}{' '}
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
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
