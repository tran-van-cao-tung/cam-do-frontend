import { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler,
    ScriptableContext,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

import DetailsReport from '../DetailsReport/DetailsReport';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler);

function ChartLine({ value, setYear }) {
    const currentYear = new Date().getFullYear();
    const [dateYearReport, setDateYearReport] = useState([]);
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: '',
                data: [],
                // backgroundColor: () => {},
                borderColor: '',
                tension: 0.6,
                fill: true,
                pointStyle: 'star',
                pointBorderColor: 'blue',
                pointBackgroundColor: '#fff',
            },
        ],
    });
    useEffect(() => {
        const arrRevenue = [];
        const arrProfit = [];
        const arrLoan = [];
        const dateMonth = [];
        const dateYear = [];

        const headers = {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        };
        fetch(
            `https://tranvancaotung1-001-site1.htempurl.com/api/v1/ledger/getbyBranchId/1/${
                value == null ? currentYear : value
            }`,
            { headers },
        )
            .then((response) => response.json())
            .then((json) => {
                console.log('json', json);
                json.map((item, index) => {
                    arrRevenue.push(item.revenue);
                    arrProfit.push(item.profit);
                    arrLoan.push(item.loan);
                    // date.push(item.toDate);
                    const month = new Date(item.toDate).toLocaleString('default', { month: 'long' });
                    const year = new Date(item.toDate).getFullYear(); // extract month from date string
                    dateMonth.push(month);

                    dateYear.push(year);
                    console.log('date year', dateYear);
                });
                setYear(dateYear);
                setData({
                    labels: dateMonth,
                    datasets: [
                        {
                            label: 'Doanh Thu',
                            data: arrRevenue,
                            borderColor: 'orange',
                            backgroundColor: 'rgba(250, 160, 95, 0)',
                            tension: 0.6,
                            fill: true,
                            pointStyle: 'star',
                            pointBorderColor: 'blue',
                            pointBackgroundColor: '#fff',
                            showLine: true,
                            drawBorder: false,
                        },
                        {
                            label: 'Lợi Nhuận',
                            data: arrProfit,
                            backgroundColor: 'rgba(250, 160, 95, 0)',

                            borderColor: 'green',
                            tension: 0.6,
                            fill: true,
                            pointStyle: 'star',
                            pointBorderColor: 'blue',
                            pointBackgroundColor: '#fff',
                        },
                        {
                            label: 'Tiền Cho Vay',
                            data: arrLoan,
                            backgroundColor: 'rgba(250, 160, 95, 0)',
                            borderColor: 'blue',
                            tension: 0.6,
                            fill: true,
                            pointStyle: 'star',
                            pointBorderColor: 'blue',
                            pointBackgroundColor: '#fff',
                        },
                    ],
                });
            });
        // console.log('arr', arr);
    }, [value]);
    console.log('year', dateYearReport);
    const options = {
        plugins: {
            legend: {
                // textAlign: 'left',
                display: true,
                // labels: {
                //     color: 'rgb(255, 99, 132)',
                // },
            },
        },
        scales: {
            x: {
                grid: { display: true },
                width: '1488px',
            },
            y: {
                ticks: {
                    stepSize: 200000000,
                    callback: (value) =>
                        //     if (value == 0) {
                        //         value = 0;
                        //     } else if (value > 1000000000) {
                        //        value / 10000000 + 'Tỷ'
                        //     } else {
                        //     value / 1000000 + 'Tr';
                        //     }
                        value === 0 ? 0 : value > 1000000000 ? value / 1000000000 + 'Tỷ' : value / 1000000 + 'Tr',
                },
                grid: {},
            },
        },
    };

    return (
        <>
            <div className="chartLine" style={{ margin: '30px 0 80px 0' }}>
                <Line data={data} options={options} width={'1200px'} height={'320px'}></Line>
            </div>
            <DetailsReport value={value} />
        </>
    );
}

export default ChartLine;
