import { useContext, useEffect, useState } from 'react';
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
} from 'chart.js';

import { Line } from 'react-chartjs-2';

import DetailsReport from '../DetailsReport/DetailsReport';
import { AuthContext } from '../../../helpers/AuthContext';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler);

function ChartLine({ value, setYear, year }) {
    const { authState, currentBranchId} = useContext(AuthContext);
    const currentYear = new Date().getFullYear();
    console.log('value in chart');
    const [dateYearReport] = useState([]);
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: '',
                data: [],
                borderColor: '',
                tension: 0.6,
                fill: true,
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
            `https://tranvancaotung2-001-site1.etempurl.com/api/v1/ledger/getbyBranchId/${currentBranchId}/${
                value == null ? currentYear : value
            }`,
            { headers },
        )
            .then((response) => response.json())
            .then((json) => {
                // eslint-disable-next-line array-callback-return
                json.map((item, index) => {
                    arrRevenue.push(item.revenue);
                    arrProfit.push(item.profit);
                    arrLoan.push(item.loan);

                    const month = new Date(item.toDate).toLocaleString('default', { month: 'long' });
                    const year = new Date(item.toDate).getFullYear(); // extract month from date string
                    dateMonth.push(month);

                    dateYear.push(year);
                    console.log('date year', dateYear);
                });
                setYear(dateYear);
                // eslint-disable-next-line no-lone-blocks
                {
                    dateMonth.length = 1
                        ? setData({
                              labels: ['', ...dateMonth],
                              datasets: [
                                  {
                                      label: 'Doanh Thu',
                                      data: [0, ...arrRevenue],
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
                                      data: [0, ...arrProfit],
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
                                      data: [0, ...arrLoan],
                                      backgroundColor: 'rgba(250, 160, 95, 0)',
                                      borderColor: 'blue',
                                      tension: 0.6,
                                      fill: true,
                                      pointStyle: 'star',
                                      pointBorderColor: 'blue',
                                      pointBackgroundColor: '#fff',
                                  },
                              ],
                          })
                        : setData({
                              labels: dateMonth,
                              datasets: [
                                  {
                                      label: 'Doanh Thu',
                                      data: [0, ...arrRevenue],
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
                }
            });
        // console.log('arr', arr);
    }, [currentBranchId, currentYear, setYear, value]);
    console.log('year', dateYearReport);
    const options = {
        plugins: {
            legend: {
                display: true,
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
            <DetailsReport value={value} year={year} />
        </>
    );
}

export default ChartLine;
