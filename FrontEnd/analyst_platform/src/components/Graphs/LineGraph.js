// src/ChartComponent.js
import { BarElement, CategoryScale, Chart, Legend, LineController, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js';
import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';

Chart.register(
    LineController,
    PointElement,
    CategoryScale,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    Legend
)


const LineGraph = ({data,options}) => {
    
    return <Line  data={data} options={options}/>
}

export default LineGraph;
