import React from 'react';
import Menu from '../Menu/Menu';
import NavMenu from './../Menu/NavMenu';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './layoutDefault.css';
const LayoutDefault = ({ children }) => {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        height: '100%',
        color: theme.palette.text.secondary,
        borderRadius: 0,
        boxShadow: 'none',
    }));
    return (
        <div className="containerLayout">
            <div className="leftContainer">
                <div className="layout">
                    <NavMenu />
                </div>
            </div>
            <div className="rightContainer">
                <Menu />
                <div className="containers">{children}</div>
            </div>
        </div>
    );
};

export default LayoutDefault;
