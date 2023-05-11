import { Box } from '@mui/material';
import React from 'react';

const StatisticCard = ({ Icon, label, value, iconColor, bgColor }) => {
    return (
        <Box
            display="flex"
            alignItems="center"
            padding="20px"
            boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
            borderRadius="8px"
            bgcolor="#fff"
            fontSize="14px"
        >
            <Box borderRadius="100%" padding="0.5rem" bgcolor={bgColor}>
                <Icon sx={{ color: iconColor }} />
            </Box>
            <Box marginLeft="20px">
                <Box
                    marginBottom="5px"
                    fontSize="14px"
                    fontWeight="400"
                    lineHeight="21px"
                    color="#212B36"
                    textTransform="capitalize"
                >
                    {label}
                </Box>
                <Box fontSize="16px" fontWeight="700" lineHeight="27px" color="#212B36">
                    {value}
                </Box>
            </Box>
        </Box>
    );
};

export default StatisticCard;
