import React, { useState } from 'react';
import NavBar from '../Menu/NavBar';
import SideBar from './../Menu/SideBar';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import './layoutDefault.css';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const LayoutDefault = ({ children }) => {
    const [openSideBar, setOpenSideBar] = useState(true);

    const handleToggleSideBar = () => {
        setOpenSideBar((prev) => !prev);
    };

    return (
        <Box sx={{ display: 'flex', position: 'relative' }}>
            <SideBar open={openSideBar} />

            <Box
                className="childrenContent"
                sx={{ display: 'flex', position: 'relative', flexGrow: 1, overflow: 'hidden' }}
            >
                <NavBar onClickMenuIcon={handleToggleSideBar} />
                <Box component="main" sx={{ flexGrow: 1 }}>
                    <DrawerHeader />
                    <Box
                        component="div"
                        sx={{
                            overflow: 'auto',
                            padding: '20px',
                            backgroundColor: '#FAFBFE',
                            color: '#637381',
                            fontSize: '14px',
                        }}
                    >
                        {children}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default LayoutDefault;
