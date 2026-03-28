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
import axios from 'axios';
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

const PANDASCORE_TOKEN = process.env.REACT_APP_PANDASCORE_TOKEN;

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const colors = [
  '#69021E', 
  '#0367A6', 
  '#fb9dc7', 
  '#04D9D9', 
  '#A21038', 
  '#BE5FD9'  
];

export const data = {
  labels,
  datasets: [
    {
      label: 'team 1',
      data: labels.map(() => faker.number.int({ min: 0, max: 500 })),
    },
    {
      label: 'team 2',
      data: labels.map(() => faker.number.int({ min: 0, max: 500 })),
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

export function TimelineChart({team1, team2}) {

  const chartRef = useRef(null);

  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  

  useEffect(() => {
    if (!team || !team.id) return;

        setLoading(true);

        axios.get(`https://api.pandascore.co/teams/${team.id}/matches/past?per_page=10`, {
        headers: { Authorization: `Bearer ${PANDASCORE_TOKEN}` }
        })

        .then(response => {

            const matches = response.data.reverse(); 
      
      const xLabels = []; 
      const yDurations = []; 

      matches.forEach(match => {
        
        if (match.games && match.games.length > 0 && match.games[0].length) {
          const durationInMinutes = Math.round(match.games[0].length / 60);
          
          
          const date = new Date(match.begin_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

          xLabels.push(date);
          yDurations.push(durationInMinutes);
        }
      });

      const chart = chartRef.current;
      let lineGradient = '#00D1FF';

      if (chart && chart.chartArea) {
        lineGradient = createGradient(chart.ctx, chart.chartArea);
      }

      setChartData({
        labels: xLabels,
        datasets: [
          {
            label: 'Game Duration (Mins)',
            data: yDurations,
            borderColor: lineGradient,
            borderWidth: 3,
            tension: 0.3,
            pointBackgroundColor: '#1E122E', 
            pointBorderColor: '#00D1FF'
          }
        ]
      });

      setLoading(false);
    })
    .catch(err => {
      console.error("Could not fetch duration data", err);
      setLoading(false);
    });

  }, [team]);

  if (!team) return null;

  if (loading || !chartData) {
    return (
      <Card className="shadow-lg p-3" style={{ backgroundColor: '#0302069c', border: '1px solid #fb9dc79d', borderRadius: '0.4rem', marginTop: '20px' }}>
        <div style={{ color: '#00D1FF', fontFamily: 'beaufort-pro', textAlign: 'center' }}>Analyzing match durations...</div>
      </Card>
    );
  }

    

  return (
    <Card className="shadow-lg p-3" style={{ 
      backgroundColor: '#0302069c', 
      border: 'none', 
      borderRadius: '0.4rem', 
      fontFamily: 'beaufort-pro',
      width: '85%',
      border: '1px solid #fb9dc79d',
      marginTop: '20px'
    }}>
        <h4 style={{ color: '#F20775', display: 'inline-block', paddingBottom: '2px', marginBottom: '15px' }}>
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

export default TimelineChart;
