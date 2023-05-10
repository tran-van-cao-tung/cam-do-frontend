import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';

import AccountCircle from '@mui/icons-material/AccountCircle';

import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import ReportIcon from '@mui/icons-material/Report';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import API from '../../API';
import { AppBar, Badge, Box, IconButton, MenuItem, Toolbar } from '@mui/material';
import { AuthContext } from '../../helpers/AuthContext';
import CustomizePopper from '../../helpers/CustomizePopper';
import NotiDropdown from './NotiDropdown';
import StoreOption from './StoreOption';
import { isAvailableArray } from '../../helpers/utils';

const NavBar = ({ onClickMenuIcon }) => {
    const { userInfo, authState, currentBranchId, setCurrentBranchId, handleSignOut } = useContext(AuthContext);

    const navigate = useNavigate();

    const [notiNum] = useState(null);

    const [branches, setBranches] = useState([]);

    useEffect(() => {
        API({
            method: 'get',
            url: `/branch/getAll/0`,
        }).then((res) => {
            setBranches(res.data);
        });
    }, [userInfo]);

    const branchOptions = useMemo(() => {
        const ids = authState?.branchIds;
        if (isAvailableArray(ids)) {
            return branches.filter((item) => ids.includes(item.branchId));
        }
        return [];
    }, [authState?.branchIds, branches]);

    const handleChangePage = () => {
        navigate('/report-customer');
    };

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = useCallback(() => {
        setMobileMoreAnchorEl(null);
    }, []);

    const handleLogout = () => {
        handleSignOut();
        navigate('/auth/login');
    };

    const renderMobileMenu = (
        <CustomizePopper anchorEl={mobileMoreAnchorEl} onClose={handleMobileMenuClose}>
            <MenuItem>
                <IconButton size="large" onClick={handleChangePage}>
                    <ReportIcon />
                </IconButton>
                <p>Cấm</p>
            </MenuItem>

            <MenuItem>
                <IconButton size="large">
                    <Badge badgeContent={notiNum} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Thông Báo</p>
            </MenuItem>

            <MenuItem>
                <IconButton size="large">
                    <AccountCircle />
                </IconButton>
                <p>Người Dùng</p>
            </MenuItem>
        </CustomizePopper>
    );

    // dropdown user
    const [profileAnchor, setProfileAnchor] = useState(null);
    const goToProfile = () => {
        navigate('/profile');
    };
    const handleDropdowUserClose = useCallback(() => {
        setProfileAnchor(null);
    }, []);
    const handleDropdowUser = (e) => {
        setProfileAnchor((prev) => {
            if (prev != null) {
                return null;
            }
            return e.currentTarget;
        });
    };
    const dropdownProfile = (
        <CustomizePopper anchorEl={profileAnchor} onClose={handleDropdowUserClose}>
            <MenuItem onClick={goToProfile}>
                <Box padding="0.5rem">
                    <AccountCircleIcon />
                </Box>
                <p>Tài Khoản</p>
            </MenuItem>

            <MenuItem onClick={handleLogout}>
                <Box padding="0.5rem">
                    <LogoutIcon />
                </Box>
                <p>Đăng Xuất</p>
            </MenuItem>
        </CustomizePopper>
    );

    //dropdown Noti
    const [notiAnchorEl, setNotiAnchorEl] = useState(null);

    const handleToggleNoti = (e) => {
        setNotiAnchorEl((prev) => {
            if (prev != null) {
                return null;
            }
            return e.currentTarget;
        });
    };

    const handleCloseNoti = useCallback((event) => {
        setNotiAnchorEl(null);
    }, []);

    return (
        <>
            <AppBar
                id="hai"
                position="absolute"
                sx={{
                    background: '#fff',
                    top: 0,
                    left: 0,
                    boxShadow: 'none',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                }}
            >
                <Toolbar>
                    <IconButton size="large" edge="start" sx={{ mr: 2 }} onClick={onClickMenuIcon}>
                        <MenuIcon />
                    </IconButton>
                    <StoreOption
                        value={currentBranchId}
                        onChange={setCurrentBranchId}
                        options={branchOptions}
                        branches={branches}
                    />

                    <Box sx={{ flexGrow: 1 }} />
                    <Box position="relative" sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" onClick={handleChangePage}>
                            <ReportIcon />
                        </IconButton>
                        <IconButton size="large" onClick={handleToggleNoti}>
                            <Badge badgeContent={notiNum} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton size="large" edge="end" onClick={handleDropdowUser}>
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton size="large" onClick={handleMobileMenuOpen}>
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {profileAnchor ? dropdownProfile : null}
            {mobileMoreAnchorEl ? renderMobileMenu : null}
            {notiAnchorEl ? (
                <CustomizePopper anchorEl={notiAnchorEl} onClose={handleCloseNoti}>
                    <NotiDropdown />
                </CustomizePopper>
            ) : null}
        </>
    );
};

export default NavBar;
