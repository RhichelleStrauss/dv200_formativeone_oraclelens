import React, { useRef, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import {
  Chart as ChartJS,
  CategoryScale,
  LineController,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

import { faker } from '@faker-js/faker'; 

ChartJS.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
    },
  ],
};


function createGradient(ctx, area) {
  const colorStart = faker.helpers.arrayElement(colors);
  const colorMid = faker.helpers.arrayElement(
    colors.filter(color => color !== colorStart)
  );
  const colorEnd = faker.helpers.arrayElement(
    colors.filter(color => color !== colorStart && color !== colorMid)
  );

  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(0.5, colorMid);
  gradient.addColorStop(1, colorEnd);

  return gradient;
}

export function AverageGameDurationChart() {

  const chartRef = useRef(null);
  
  
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    const newChartData = {
      ...data,
      datasets: data.datasets.map(dataset => ({
        ...dataset,
        borderColor: createGradient(chart.ctx, chart.chartArea),
      })),
    };

    setChartData(newChartData);
  }, []);

  return (
    <Card className="shadow-lg p-3" style={{ 
      backgroundColor: '#0302069c', 
      border: 'none', 
      borderRadius: '0.4rem', 
      fontFamily: 'beaufort-pro',
      width: '100%',
      border: '1px solid #fb9dc79d',
      marginTop: '20px'
    }}>
        <h4 style={{ color: '#E2D1F9', borderBottom: '2px solid #00D1FF', display: 'inline-block', paddingBottom: '2px', marginBottom: '15px' }}>
        Average Game Duration
      </h4>

      <div style={{ position: 'relative', height: '300px', width: '100%' }}>
        <Chart 
          ref={chartRef} 
          type='line' 
          data={chartData} 
          options={{ 
            responsive: true, 
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: { color: '#fb9dc7' } 
              }
            },
            scales: {
              x: { ticks: { color: '#fb9dc7' } },
              y: { ticks: { color: '#fb9dc7' } }
            }
          }} 
        />
      </div>

   
    </Card>
    
   );
}

export default AverageGameDurationChart;
