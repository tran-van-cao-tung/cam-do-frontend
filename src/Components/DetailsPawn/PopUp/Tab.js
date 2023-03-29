import * as React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, imageListItemBarClasses, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Ransom from './Ransom';
import axios from 'axios';
import moment from 'moment';
import History from './History';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}




export default function BasicTabs({ showContractId }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    const [check, setCheck] = React.useState();
    const [show, setShow] = React.useState([]);
    const [paidMoney, setPaidMoney] = React.useState();
    const [contractDetail, setContractDetail] = React.useState([]);

    React.useEffect(() => {
        axios.get(`http://tranvancaotung-001-site1.ftempurl.com/api/v1/contract/getAll/0`).then(res => {
            setContractDetail(res.data.filter((item, index) => {
                return item.contractCode == showContractId;
            })[0])
            console.log(res.data)
        })
    }, [showContractId])


    /* 
        const [detailPawn, setDetailPawn] = React.useState([]);
        React.useEffect(() => {
            const id = contractDetail.contractId;
            console.log(id);
            axios.get(`http://tranvancaotung-001-site1.ftempurl.com/api/v1/contract/getContractDetail/${id}`).then(res => {
                setDetailPawn(res.data)
            })
        }, [contractDetail.contractId]) */


    console.log(contractDetail)
    const [interestDiary, setInterestDiary] = React.useState([])
    React.useEffect(() => {
        const id = contractDetail.contractId;
        axios.get(`http://tranvancaotung-001-site1.ftempurl.com/api/v1/interestDiary/getInterestDiariesByContractId${id}`).then(res => {
            setInterestDiary(res.data);
        });
    }, [contractDetail.contractId])
    console.log(interestDiary)

    const [dis, setDis] = React.useState(false);
    const handleCheckbox = (e, id) => {
        if (e.target.checked) {
            setCheck(id);
            setShow({ ...show, [id]: id });
            setDis(true);
        }
        else {
            setShow({ ...show, [id]: 0 });
            setDis(false);
        }

    }
    const [values, setValues] = React.useState([]);
    React.useEffect(() => {
        const id = check;
        axios.put(`http://tranvancaotung-001-site1.ftempurl.com/api/v1/interestDiary/updateInterestDiary/${id}?paidMoney=${paidMoney}`).then(res => {
            if (res.data) {
                setValues({ ...values, [id]: paidMoney })
            }
        })
    }, [dis, check])

    return (
        <Box sx={{ width: '100%', textAlign: 'center', alignItems: 'center' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', textAlign: 'center', alignItems: 'center' }}>
                <Tabs
                    sx={{ textAlign: 'center', alignItems: 'center' }}
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab sx={{ width: '25%' }} label="Đóng tiền lãi" {...a11yProps(0)} />
                    <Tab sx={{ width: '25%' }} label="Chứng từ" {...a11yProps(1)} />
                    <Tab sx={{ width: '25%' }} label="Chuộc đồ" {...a11yProps(2)} />
                    <Tab sx={{ width: '25%' }} label="Lịch sử" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {/* Lịch sử đóng tiền lãi */}
                <div className="contents">
                    <h2> Lịch sử đóng tiền lãi</h2>
                    <Table className="table-detailContract">
                        <TableHead>
                            <TableRow>
                                <TableCell>STT</TableCell>
                                <TableCell>Ngày</TableCell>
                                <TableCell>Tiền lãi</TableCell>
                                <TableCell>Tiền khác</TableCell>
                                <TableCell>Tổng tiền</TableCell>
                                <TableCell>Tiền khách trả</TableCell>
                                <TableCell></TableCell>
                                <TableCell>Ghi Chú</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                interestDiary.map((item, index) => {
                                    return (
                                        <TableRow>
                                            <TableCell>{index}</TableCell>
                                            <TableCell>{moment(item.dueDate).format('MM/DD/YYYY')} - {moment(item.nextDueDate).format('MM/DD/YYYY')}</TableCell>
                                            <TableCell>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.interestDebt)}</TableCell>
                                            <TableCell>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.penalty)}</TableCell>
                                            <TableCell>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.totalPay)}</TableCell>
                                            <TableCell>{
                                                show[item.interestDiaryId] === item.interestDiaryId ?
                                                    <span>{values[item.interestDiaryId] ? Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(values[item.interestDiaryId]) : Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.paidMoney)}</span>
                                                    :
                                                    <input
                                                        type="text"
                                                        placeholder="0"
                                                        style={{ padding: "5px" }}
                                                        onChange={(e) => { setPaidMoney(e.target.value) }} />
                                            }</TableCell>
                                            <TableCell>
                                                <FormGroup onClick={(e) => handleCheckbox(e, item.interestDiaryId)}>
                                                    <FormControlLabel control={<Checkbox />} />
                                                </FormGroup></TableCell>
                                            <TableCell><Button ><CreateIcon /></Button ></TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>

            </TabPanel>
            <TabPanel value={value} index={2}>
                <Ransom />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <History />
            </TabPanel>
        </Box>
    );
}
