import { Button } from '@mui/material';
import React from 'react';

const CustomizeButton = ({ title, handleClick }) => {
    return (
        <Button
            sx={{
                border: 'none',
                fontFamily: 'Frank Ruhl Libre',
                fontStyle: 'normal',
                fontSize: '24px',
                borderRadius: '10px',
                backgroundColor: 'orange',
                padding: '0px 20px',
                color: 'white',
                '&:hover': {
                    backgroundColor: 'orange',
                    opacity: 0.8,
                },
            }}
            onClick={handleClick}
        >
            {title}
        </Button>
    );
};

export default CustomizeButton;
