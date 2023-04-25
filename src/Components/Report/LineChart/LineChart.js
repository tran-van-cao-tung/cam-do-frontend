import React from 'react';
// import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
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

ChartJS.register(Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler);
const LineChart = ({ data, options }) => {
    return (
        <div className="lineChart">
            <Line
                data={data}
                options={options}
                width={'1200px'}
                height={'220px'}
                // options={options} width={'1200px'} height={'320px'}
            ></Line>
        </div>
    );
};

export default LineChart;
