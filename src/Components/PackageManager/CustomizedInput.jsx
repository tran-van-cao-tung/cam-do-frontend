import { TextField } from '@mui/material'
import React from 'react'

function CustomizedInput({
    label,
    value,
    onChange,
    type,
    ...props
}) {

    return (
        <TextField
            label={label}
            value={value}
            onChange={onChange}
            type={type}
            variant='outlined'
            color='primary'
            size='medium'
            fullWidth
            {...props}
        />
    )
}

export default CustomizedInput