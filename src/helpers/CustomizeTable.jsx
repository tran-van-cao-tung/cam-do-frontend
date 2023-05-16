import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#ffbc40',
        color: '#cccccv',
        border: 'none',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function CustomizedTables({ renderedData, dataTable }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ border: 'none' }}>
                <TableHead>
                    <TableRow>
                        {dataTable.map((item, index) => (
                            <StyledTableCell key={index} align="center">
                                {item.nameHeader}
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderedData.map((item, index) => (
                        <StyledTableRow key={index + 1}>
                            {dataTable.map((i, index) => (
                                <StyledTableCell key={index} align="center">
                                    {i.dataRow(item)}
                                </StyledTableCell>
                            ))}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
