import * as React from 'react';
import PropTypes from 'prop-types';
// import { IMaskInput } from 'react-imask';
import { NumericFormat } from 'react-number-format';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import callAPI from '../../API';
import { useEffect } from 'react';

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            valueIsNumericString
            prefix="VNĐ:"
        />
    );
});

NumericFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default function FormattedInputs({ item }) {
    const [values, setValues] = React.useState({});
    const formatMoney = (value) => {
        return value.toLocaleString('vi-VN') + ' VNĐ';
    };

    const id = item.interestDiaryId;
    console.log('interestDiaryId:', id);
    const [paidMoney, setPaidMoney] = useState(0);
    const [interestDiary, setInterestDiary] = useState([]);

    const handleInput = (e) => {
        e.persist();
        interestDiary({ ...setInterestDiary, [e.target.name]: e.target.value });
    };
    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
        console.log('value:', setPaidMoney);
    };

    useEffect(() => {
        const slug = item.interestDiaryId;
        callAPI({
            method: 'get',
            url: `interestDiary/getInterestDiariesByContractId/${slug}}`,
        }).then((res) => {
            setInterestDiary(res.data);
        });
    }, [item.interestDiaryId]);

    return (
        <Box
            sx={{
                '& > :not(style)': {
                    m: 1,
                },
            }}
        >
            <TextField
                label="Tiền khách trả"
                value={item.paidMoney}
                onChange={(e) => handleInput(e)}
                name="numberformat"
                id="formatted-numberformat-input"
                InputProps={{
                    inputComponent: NumericFormatCustom,
                }}
                variant="standard"
            />
        </Box>
    );
}
