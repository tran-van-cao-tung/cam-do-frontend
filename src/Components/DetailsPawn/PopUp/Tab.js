import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Ransom from './Ransom';
import History from './History';
import Certificate from './Certificate';
import PayInterest from './PayInterest';
import axios from 'axios';

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
        const id = showContractId;
        axios.get(`http://tranvancaotung-001-site1.atempurl.com/api/v1/contract/getAll/0`, { headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} }).then(res => {
            setContractDetail(res.data.filter((item) => {
                return item.contractId === id;
            })[0])
            console.log(res.data)
        })
    }, [showContractId])

    console.log(contractDetail)
    const [interestDiary, setInterestDiary] = React.useState([])
    React.useEffect(() => {
        const id = contractDetail.contractId;
        axios.get(`http://tranvancaotung-001-site1.atempurl.com/api/v1/interestDiary/getInterestDiariesByContractId${id}`, { headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} }).then(res => {
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
        axios.put(`http://tranvancaotung-001-site1.atempurl.com/api/v1/interestDiary/updateInterestDiary/${id}?paidMoney=${paidMoney}`, { headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} }).then(res => {
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
                <PayInterest showContractId={showContractId} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Certificate showContractId={showContractId}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Ransom setshowdetailContract = {showContractId}/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <History showContractId={showContractId} />
            </TabPanel>
        </Box>
    );
}
