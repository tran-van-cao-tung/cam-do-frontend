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
import Asset from './Asset';

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

export default function BasicTabs({ contract, showContractId, showdetailContract, setshowdetailContract }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', textAlign: 'center', alignItems: 'center' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', textAlign: 'center', alignItems: 'center' }}>
                <Tabs
                    sx={{ textAlign: 'center', alignItems: 'center' }}
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab sx={{ width: '20%' }} label="Đóng tiền lãi" {...a11yProps(0)} />
                    <Tab sx={{ width: '20%' }} label="Chứng từ" {...a11yProps(1)} />
                    <Tab sx={{ width: '20%' }} label="Chuộc đồ" {...a11yProps(2)} />
                    <Tab sx={{ width: '20%' }} label="Tài sản" {...a11yProps(3)} />
                    <Tab sx={{ width: '20%' }} label="Lịch sử" {...a11yProps(4)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <PayInterest showContractId={showContractId} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Certificate showContractId={showContractId} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Ransom
                    showdetailContract={showdetailContract}
                    setshowdetailContract={setshowdetailContract}
                    contract={contract}
                    showContractId={showContractId}
                />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Asset showContractId={showContractId} />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <History showContractId={showContractId} />
            </TabPanel>
        </Box>
    );
}
