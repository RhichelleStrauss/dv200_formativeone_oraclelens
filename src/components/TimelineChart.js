
import React, { useRef } from 'react';
import Card from 'react-bootstrap/Card';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  LineController
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

function createGradient(ctx, area, colorStart, colorMid, colorEnd) {
  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(0.5, colorMid);
  gradient.addColorStop(1, colorEnd);
  return gradient;
}


export const TimelineChart = ({ chartData }) => {
  const chartRef = useRef(null);

  if (!chartData || !chartData.datasets) return null;

  const styledChartData = {
    ...chartData,
    datasets: chartData.datasets.map(dataset => ({
      ...dataset,
      fill: true,
      borderWidth: 3,
      tension: 0,
      pointBackgroundColor: '#69021E',
      pointBorderColor: '#69021E',
      spanGaps: true,
      borderColor: (context) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) return '#04D9D9'; 
        return createGradient(ctx, chartArea, '#04D9D9', '#BE5FD9', '#69021E');
      },
      backgroundColor: (context) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) return 'rgba(4, 217, 217, 0.2)'; 
        return createGradient(ctx, chartArea, 'rgba(4, 217, 217, 0.1)', 'rgba(190, 95, 217, 0.3)', 'rgba(105, 2, 29, 0.5)');
      }
    }))
  };

  return (
   
      <div>
      <h4 style={{ color: '#F20775', paddingBottom: '2px', marginBottom: '15px' }}>
        Team Timeline
      </h4>

      <div style={{ position: 'relative', height: '400px', width: '100%' }}>
        <Line 
        ref={chartRef} 
        data={styledChartData} 
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { color: '#F8F4E3', fontFamily: 'beaufort-pro' }
            }
          },
          scales: {
            x: {
              ticks: { color: '#F8F4E3' },
              grid: { color: '#e2d9cb3e' }
            },
            y: {
              ticks: { color: '#F8F4E3' },
              grid: { color: '#e2d9cb3e' }
            }
          }
        }} 
      />
    </div>
    </div>
    
  );
};