import React, { useContext, useEffect, useState } from 'react';
import homemenu from '../../asset/img/homemenu.png';
import warning from '../../asset/img/warning.png';
import bell from '../../asset/img/bell.jpg'
import usera from '../../asset/img/userAccount.png';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './menu.css';
import { Link, useNavigate } from 'react-router-dom';

import API from '../../API';
import { Divider } from '@mui/material';
import { AuthContext } from '../../helpers/AuthContext';

const Menuh = () => {
    const { authState, setAuthState } = useContext(AuthContext);
    const history = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [showNoti, setShowNoti] = useState(null);
    // const [showMenuUser, setShowMenuUser] = useState(false);
    const open = Boolean(anchorEl);
    const NotiOpen = Boolean(showNoti);
    const [notiNum, setNotiNum] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleNoti = (event) => {
        console.log(event.currentTarget);
        setShowNoti(event.currentTarget);
    };

    const handleCloseNoti = () => {
        setShowNoti(null);
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
                        return item.userId === authState.userId;
                    })[0],
                );
            })
            .catch((err) => console.log(err));
    }, []);

    const [branch, setBranch] = useState([]);
    const [branchUser, setBranchUser] = useState([]);
    const branchID = authState.branchId;
    useEffect(() => {
        API({
            method: 'get',
            url: `/branch/getAll/0`,
        }).then((res) => {
            setBranch(res.data);
            setBranchUser(
                res.data.filter((item, index) => {
                    return item.branchId == authState.branchId;
                })[0],
            );
        });


    }, [branchID]);

    useEffect(() => {
        API({
            method: 'get',
            url: '/notification/notificationList/' + authState.branchId,
        }).then((res) => {
            setNotiNum(res.data.length);
            // console.log('aaaaa', res.data);
        });
    }, []);

    /* const [selectedOption, setSelectedOption] = useState(); */
    const handleBranch = (e) => {
        setAuthState({
            userName: authState.userName,
            userId: authState.userId,
            branchId: e.target.value,
            status: true,
        });
    };

    return (
        <div className="menu">
            <div className="content1">
                <div className="content1Container">
                    <div className="select_option">
                        <img src={homemenu} alt="Home" />
                        {authState.userName === 'Admin' ? (
                            <select onChange={handleBranch} value={authState.branchId}>
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
                    {/* <span>1</span> Hiện số  */}
                </div>
                <div className="icon2">
                    {/* <Link to={`/noti`}>
                        <img src={clock} alt="" />
                        <span>{notiNum}</span>
                    </Link> */}
                    <Button
                        id="basic-button"
                        aria-controls={NotiOpen ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={NotiOpen ? 'true' : undefined}
                        onClick={handleNoti}
                        style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
                    >
                        <img src={bell} alt="" />
                        <span>{notiNum}</span>
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={showNoti}
                        open={NotiOpen}
                        onClose={handleCloseNoti}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem>CĐ-1 Lãi cần trả 1,500,000 VND</MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem>CĐ-2 Lãi cần trả 3,500,000 VND</MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                    </Menu>
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
                                : authState.userName
                                    ? authState.userName
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
                            <MenuItem onClick={() => { history('/profile') }}>Profile</MenuItem>
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
