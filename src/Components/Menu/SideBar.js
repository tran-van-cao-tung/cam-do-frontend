import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import pawns from '../../asset/img/pawns.png';
import { AuthContext } from '../../helpers/AuthContext';
import { isArray, isAvailableArray, lowercaseText } from '../../helpers/utils';
import { PERMISSIONS } from '../../setting/permission';
import DashboardIcon from '@mui/icons-material/Dashboard';
//mui
import { styled } from '@mui/material/styles';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ReceiptIcon from '@mui/icons-material/Receipt';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SettingsIcon from '@mui/icons-material/Settings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Box, Collapse, Drawer } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const drawerWidth = 280;

const sidebarMenu = [
    {
        key: 'pawns',
        icon: <ReceiptIcon />,
        label: 'Cầm Đồ',
        to: '/detaipawn',
        permission: PERMISSIONS['Cầm Đồ'],
    },
    {
        key: 'storeManager',
        icon: <StoreMallDirectoryIcon />,
        label: 'Quản Lý Cửa Hàng',
        to: '/liststore',
    },
    {
        key: 'assetManager',
        icon: <MonetizationOnIcon />,
        label: 'Quản Lý Tài Sản',
        permission: PERMISSIONS['Quản Lý Tài Sản'],
        children: [
            {
                key: 'storeManager_stores',
                icon: <FormatListBulletedIcon />,
                label: 'Danh Sách Kho',
                to: '/warehouse',
            },
            {
                key: 'storeManager_assetCategory',
                icon: <SettingsIcon />,
                label: 'Cấu Hình Loại Tài Sản',
                to: '/commodity',
            },
        ],
    },
    {
        key: 'emloyeeManager',
        icon: <SupervisedUserCircleIcon />,
        label: 'Quản Lý Nhân Viên',
        permission: PERMISSIONS['Quản Lý Nhân Viên'],
        children: [
            {
                key: 'emloyeeManager_emloyees',
                icon: <FormatListBulletedIcon />,
                label: 'Danh Sách Nhân Viên',
                to: '/listemployees',
            },
            {
                key: 'emloyeeManager_permission',
                icon: <AdminPanelSettingsIcon />,
                label: 'Phân Quyền Nhân Viên',
                to: '/authorization',
            },
        ],
    },
    {
        key: 'customerManager',
        icon: <PeopleAltIcon />,
        label: 'Quản Lý Khách Hàng',
        to: '/customer-manager',
        permission: PERMISSIONS['Quản Lý Khách Hàng'],
    },
    {
        key: 'packageManager',
        icon: <PeopleAltIcon />,
        label: 'Quản Lý Gói Vay',
        to: '/package',
        permission: PERMISSIONS['Quản Lý Gói Vay'],
    },
    {
        key: 'report',
        icon: <AssessmentIcon />,
        label: 'Báo Cáo',
        to: '/report-years',
        permission: PERMISSIONS['Báo cáo'],
    },
];

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const SideBar = ({ open }) => {
    const { authState, permissions, userInfo } = useContext(AuthContext);
    const navigate = useNavigate();

    const [collapsMap, setCollapsMap] = useState(() => {
        const map = {};
        sidebarMenu.forEach((item) => {
            if (isAvailableArray(item.children)) {
                map[item.key] = false;
            }
        });
        return map;
    });

    const handleToggerMenu = (key) => {
        setCollapsMap((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const hasPermission = (id) => {
        if (userInfo?.roleId === 1) {
            return true;
        }
        const permission = permissions.find((item) => item.permissionId === id);
        return permission?.status === true;
    };

    const renderExpandIcon = (item) => (collapsMap[item.key] ? <ExpandLess /> : <ExpandMore />);

    const location = useLocation();

    const isActive = (menuItem) => {
        return menuItem.to === location.pathname;
    };

    const handleOpenMenu = (key) => {
        setCollapsMap((prev) => ({
            ...prev,
            [key]: true,
        }));
    };

    useEffect(() => {
        sidebarMenu.forEach((item) => {
            if (isArray(item.children)) {
                item.children.forEach((child) => {
                    if (isActive(child)) {
                        handleOpenMenu(item.key);
                    }
                });
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);
    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={open}
            sx={{
                width: open ? drawerWidth : 0,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: open ? drawerWidth : 0,
                    boxSizing: 'border-box',
                },
            }}
        >
            <DrawerHeader>
                <Box component="div" display="flex" justifyContent="center" alignItems="center" width="100%">
                    {/* <Box className="logos" margin="0 auto"> */}
                    <img src={pawns} alt="logo" width="50%" />
                    {/* <p className="logo">
                        P<span style={{ color: 'orange' }}>awnS</span>
                    </p> */}
                </Box>
                {/* </Box> */}
            </DrawerHeader>
            <Divider />
            <List>
                <ListItem
                    key={1}
                    disablePadding
                    sx={{
                        display: 'block',
                        backgroundColor: isActive({ to: '/' }) ? '#FFBC40' : 'initial',
                    }}
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: 1 ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: 1 ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Tổng quan'} sx={{ opacity: 1 ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
                {sidebarMenu.map((item, index) =>
                    !hasPermission(item.permission) ? null : (
                        <Fragment key={item.key}>
                            <ListItem
                                key={item.key}
                                disablePadding
                                sx={{
                                    display: 'block',
                                    backgroundColor: isActive(item) ? '#FFBC40' : 'initial',
                                }}
                                onClick={() => {
                                    if (item.to) {
                                        navigate(item.to);
                                        return;
                                    }

                                    handleToggerMenu(item.key);
                                }}
                            >
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: 1 ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: 1 ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.label} sx={{ opacity: 1 ? 1 : 0 }} />
                                    {isAvailableArray(item.children) ? renderExpandIcon(item) : null}
                                </ListItemButton>
                            </ListItem>
                            {isAvailableArray(item.children) ? (
                                <Collapse in={collapsMap[item.key]} timeout="auto" unmountOnExit>
                                    <List
                                        component="div"
                                        disablePadding
                                        sx={{
                                            paddingLeft: '20px',
                                        }}
                                    >
                                        {item.children.map((item) => (
                                            <ListItem
                                                key={item.key}
                                                disablePadding
                                                sx={{
                                                    display: 'block',
                                                    backgroundColor: isActive(item) ? '#FFBC40' : 'initial',
                                                }}
                                                onClick={() => navigate(item.to)}
                                            >
                                                <ListItemButton
                                                    sx={{
                                                        minHeight: 48,
                                                        justifyContent: 1 ? 'initial' : 'center',
                                                        px: 2.5,
                                                    }}
                                                >
                                                    <ListItemIcon
                                                        sx={{
                                                            minWidth: 0,
                                                            mr: 1 ? 3 : 'auto',
                                                            justifyContent: 'center',
                                                        }}
                                                    >
                                                        {item.icon}
                                                    </ListItemIcon>
                                                    <ListItemText primary={item.label} sx={{ opacity: 1 ? 1 : 0 }} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            ) : null}
                        </Fragment>
                    ),
                )}
            </List>
        </Drawer>
    );
};

export default SideBar;
