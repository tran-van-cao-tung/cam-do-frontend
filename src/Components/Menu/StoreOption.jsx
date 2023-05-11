import { Box, FormControl, MenuItem, OutlinedInput, Select } from '@mui/material';
import React from 'react';

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const StoreOption = ({ value, options, onChange, branches }) => {
    const handleChange = (e) => {
        onChange(e.target.value);
    };
    return (
        <Box>
            <FormControl sx={{ width: 200 }}>
                <Select
                    size="small"
                    value={value}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    renderValue={(branchId) => {
                        const result = branches.find((item) => item.branchId === branchId);
                        return result?.branchName != null ? result.branchName : '';
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    {options.map((branch) => (
                        <MenuItem key={branch.branchId} value={branch.branchId}>
                            {branch.branchName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default StoreOption;
