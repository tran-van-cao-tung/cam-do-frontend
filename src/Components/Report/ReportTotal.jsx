// import React from 'react';
// import './ReportComponent.css';
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
// import BtnDetails from './BtnDetails';
// import DetailContract from './PopUp/DetailContract';
// import TableReport from './TableReport';

// import { useState } from 'react';

// const ReportTotal = () => {
//     const Item = styled(Paper)(({ theme }) => ({
//         backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//         ...theme.typography.body2,
//         padding: '22px 0 22px 27px',
//         borderRadius: '10px',
//         color: theme.palette.text.secondary,
//         height: 700,
//     }));
//     const [showUpdateContract, setShowUpdateContract] = useState(false);
//     const [searchAPIData, setSearchAPIData] = useState([]);
//     const [report, setReport] = useState([]);
//     const [onFilter, setOnFilter] = useState();

//     const onFilterChangeReport = (e) => {
//         if (e.target.value == '') {
//             setReport(searchAPIData);
//         } else {
//             const filterResult = searchAPIData.filter((item) =>
//                 item.contractCode.toLowerCase().includes(e.target.value.toLowerCase()),
//             );
//             setReport(filterResult);
//         }
//         setOnFilter(e.target.value);
//     };
//     return (
//         <div className="report">
//             <h1 className="reportTitle">Tổng Giao Dịch Đã Đóng</h1>x
//             <div>
//                 <Item className="parperCustomer">
//                     <BtnDetails onFilterChangeReport={onFilterChangeReport} onFilter={onFilter} />
//                     <TableReport setShowUpdateContract={setShowUpdateContract} report={report} setReport={setReport} setSearchAPIData={setSearchAPIData} />

//                     {showUpdateContract && <DetailContract setShowUpdateContract={setShowUpdateContract} />}
//                 </Item>
//             </div>
//         </div>
//     );
// };

// export default ReportTotal;

import React from 'react';
import './ReportComponent.css';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import DetailContract from './PopUp/DetailContract';
import TableReport from './TableReport';

import { useState } from 'react';

const ReportTotal = () => {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: '22px 0 22px 27px',
        borderRadius: '10px',
        color: theme.palette.text.secondary,
        height: 700,
    }));
    const [showUpdateContract, setShowUpdateContract] = useState(false);
    return (
        <div className="report">
            <h1 className="reportTitle">Tổng Giao Dịch Đã Đóng</h1>
            <div>
                <Item className="parperCustomer">
                    <TableReport setShowUpdateContract={setShowUpdateContract} />

                    {showUpdateContract && <DetailContract setShowUpdateContract={setShowUpdateContract} />}
                </Item>
            </div>
        </div>
    );
};

export default ReportTotal;
