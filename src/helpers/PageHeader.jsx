import { Box } from '@mui/material';
import React from 'react';

const PageHeader = ({ title }) => {
    return (
        <Box
            sx={{
                fontWeight: '700',
                color: '#212B36',
                fontSize: '20px',
            }}
        >
            {title}
        </Box>
    );
};

export default PageHeader;
