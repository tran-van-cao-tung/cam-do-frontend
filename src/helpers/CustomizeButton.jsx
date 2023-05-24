import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';

const CustomizeButton = ({ title, handleClick }) => {
    return (
        <Button
            sx={{
                backgroundColor: 'orange',
                color: 'white',
                '&:hover': {
                    backgroundColor: 'orange',
                    opacity: 0.8,
                },
            }}
            size="medium"
            startIcon={<Add fontSize="medium" />}
            onClick={handleClick}
        >
            {title}
        </Button>
    );
};

export default CustomizeButton;
