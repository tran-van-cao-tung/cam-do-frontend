import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import API from '../../API';

import { AuthContext } from '../../helpers/AuthContext';
import { isAvailableArray, lowercaseText } from '../../helpers/utils';
import { PERMISSIONS } from '../../setting/permission';
import DashboardIcon from '@mui/icons-material/Dashboard';
//mui
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const drawerWidth = 300;
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const sidebarMenu = [
    {
        key: 'overview',
        icon: <DashboardIcon />,
        label: 'Tổng quan',
        to: '/',
    },
    {
        key: 'pawns',
        icon: <DashboardIcon />,
        label: 'Cầm Đồ',
        to: '/detaipawn',
        permission: PERMISSIONS['Cầm Đồ'],
    },
    {
        key: 'storeManager',
        icon: <DashboardIcon />,
        label: 'Quản lý cửa hàng',

        permission: PERMISSIONS['Quản Lý Cửa Hàng'],
        children: [
            {
                key: 'storeManager_stores',
                icon: <DashboardIcon />,
                label: 'Danh sách cửa hàng',
                to: '/chainstores',
            },
            {
                key: 'storeManager_assetCategory',
                icon: <DashboardIcon />,
                label: 'Cấu hình loại tài sản',
                to: '/liststore',
            },
        ],
    },
    {
        key: 'assetManager',
        icon: <DashboardIcon />,
        label: 'Quản lý tài sản',
        to: '/commodity',
        // to: '/warehouse',
        permission: PERMISSIONS['Quản Lý Kho'],
    },
    {
        key: 'emloyeeManager',
        icon: <DashboardIcon />,
        label: 'Quản lý nhân viên',
        permission: PERMISSIONS['Quản Lý Nhân Viên'],
        children: [
            {
                key: 'emloyeeManager_emloyees',
                icon: <DashboardIcon />,
                label: 'Danh sách nhân viên',
                to: '/listemployees',
            },
            {
                key: 'emloyeeManager_permission',
                icon: <DashboardIcon />,
                label: 'Phân quyền nhân viên',
                to: '/authorization',
            },
        ],
    },
    {
        key: 'customerManager',
        icon: <DashboardIcon />,
        label: 'Quản lý khách hàng',
        // to: '/package',
        to: '/customer-manager',
        permission: PERMISSIONS['Quản Lý Khách Hàng'],
    },
    {
        key: 'report',
        icon: <DashboardIcon />,
        label: 'Báo cáo',
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
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

const NavMenu = () => {
    const { authState, setPermissions, permissions } = useContext(AuthContext);
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

    useEffect(() => {
        console.log('check permission after login');
        if (authState?.userId) {
            API({
                method: 'post',
                url: '/permission/showpermission',
                data: {
                    userId: authState.userId,
                    nameUser: 'string',
                },
            }).then((res) => {
                const permissions = isAvailableArray(res.data) ? res.data : [];
                setPermissions(permissions);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authState?.userId]);

    const hasPermission = (id) => {
        if (lowercaseText(authState.userName) === 'admin') {
            return true;
        }

        const permission = permissions.find((item) => item.permissionId === id);
        return permission?.status === true;
    };

    const renderExpandIcon = (item) => (collapsMap[item.key] ? <ExpandLess /> : <ExpandMore />);

    return (
        <div>
            <Drawer variant="permanent" open={true}>
                <DrawerHeader>
                    <div className="logos">
                        <p className="logo">
                            P<span style={{ color: 'orange' }}>awnS</span>
                        </p>
                    </div>
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
                                                paddingLeft: '24px',
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
                                                        <ListItemText
                                                            primary={item.label}
                                                            sx={{ opacity: 1 ? 1 : 0 }}
                                                        />
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
        </div>
    );
};

export default NavMenu;
