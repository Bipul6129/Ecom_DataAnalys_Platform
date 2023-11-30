// src/ChartComponent.js
import { BarElement, CategoryScale, Chart, Legend, LinearScale, Tooltip } from 'chart.js';
import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';

Chart.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)


const BarGraph = ({data,options}) => {
    
    return <Bar  data={data} options={options}/>
}

export default BarGraph;
