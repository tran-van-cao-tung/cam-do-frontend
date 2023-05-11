import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';

import ReceiptIcon from '@mui/icons-material/Receipt';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SettingsIcon from '@mui/icons-material/Settings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { Dashboard } from '@mui/icons-material';

const notifications = [
    {
        key: 'overview',
        icon: <Dashboard />,
        label: 'Tổng quan',
        to: '/',
    },
    {
        key: 'pawns',
        icon: <ReceiptIcon />,
        label: 'Cầm Đồ',
        to: '/detaipawn',
    },
    {
        key: 'storeManager',
        icon: <StoreMallDirectoryIcon />,
        label: 'Quản lý cửa hàng',

        children: [
            {
                key: 'storeManager_stores',
                icon: <FormatListBulletedIcon />,
                label: 'Danh sách cửa hàng',
                to: '/chainstores',
            },
            {
                key: 'storeManager_assetCategory',
                icon: <SettingsIcon />,
                label: 'Cấu hình loại tài sản',
                to: '/liststore',
            },
        ],
    },
    {
        key: 'assetManager',
        icon: <MonetizationOnIcon />,
        label: 'Quản lý tài sản',
        to: '/commodity',
        // to: '/warehouse',
    },
    {
        key: 'emloyeeManager',
        icon: <SupervisedUserCircleIcon />,
        label: 'Quản lý nhân viên',

        children: [
            {
                key: 'emloyeeManager_emloyees',
                icon: <FormatListBulletedIcon />,
                label: 'Danh sách nhân viên',
                to: '/listemployees',
            },
            {
                key: 'emloyeeManager_permission',
                icon: <AdminPanelSettingsIcon />,
                label: 'Phân quyền nhân viên',
                to: '/authorization',
            },
        ],
    },
    {
        key: 'customerManager',
        icon: <PeopleAltIcon />,
        label: 'Quản lý khách hàng',
        // to: '/package',
        to: '/customer-manager',
    },
    {
        key: 'report',
        icon: <AssessmentIcon />,
        label: 'Báo cáo',
        to: '/report-years',
    },
];

const NotiDropdown = () => {
    return (
        <Box>
            <Box sx={{ padding: '20px' }}>
                <h3>Thông Báo</h3>
            </Box>
            <Box>
                <List component="div" disablePadding>
                    {notifications.map((item) => (
                        <ListItem key={item.key} disablePadding sx={{ display: 'block' }}>
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
            </Box>
        </Box>
    );
};

export default NotiDropdown;
