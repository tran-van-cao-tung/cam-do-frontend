import React, { Fragment, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../helpers/AuthContext';
import { isAvailableArray, lowercaseText } from '../../helpers/utils';
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
        key: 'overview',
        icon: <DashboardIcon />,
        label: 'Tổng Quan',
        to: '/',
    },
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

        permission: PERMISSIONS['Quản Lý Cửa Hàng'],
        children: [
            {
                key: 'storeManager_stores',
                icon: <FormatListBulletedIcon />,
                label: 'Danh Sách Cửa Hàng',
                to: '/chainstores',
            },
            {
                key: 'storeManager_assetCategory',
                icon: <SettingsIcon />,
                label: 'Cấu Hình Loại Tài Sản',
                to: '/liststore',
            },
        ],
    },
    {
        key: 'assetManager',
        icon: <MonetizationOnIcon />,
        label: 'Quản Lý Tài Sản',
        to: '/commodity',
        // to: '/warehouse',
        permission: PERMISSIONS['Quản Lý Kho'],
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
    const { authState, permissions } = useContext(AuthContext);
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
        if (lowercaseText(authState?.user?.userName) === 'admin') {
            return true;
        }

        const permission = permissions.find((item) => item.perId === id);
        return permission?.status === true;
    };

    const renderExpandIcon = (item) => (collapsMap[item.key] ? <ExpandLess /> : <ExpandMore />);

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
                <Box
                    component="div"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                    padding="1rem 0"
                >
                    <Box className="logos" margin="0">
                        <p className="logo">
                            P<span style={{ color: 'orange' }}>awnS</span>
                        </p>
                    </Box>
                </Box>
            </DrawerHeader>
            <Divider />
            <List>
                {sidebarMenu.map((item, index) =>
                    !hasPermission(item.permission) ? null : (
                        <Fragment key={item.key}>
                            <ListItem
                                key={item.key}
                                disablePadding
                                sx={{ display: 'block' }}
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
                                                sx={{ display: 'block' }}
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
