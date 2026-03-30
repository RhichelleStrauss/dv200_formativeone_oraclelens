import React, { useRef, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import {
  Chart as ChartJS,
  CategoryScale,
  BarController,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import axios from 'axios';
import { faker } from '@faker-js/faker'; 

ChartJS.register(
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Filler
);

const PANDASCORE_TOKEN = process.env.REACT_APP_PANDASCORE_TOKEN;

function createGradient(ctx, area, colorStart, colorMid, colorEnd) {
  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(0.3, colorMid);
  gradient.addColorStop(1, colorEnd);
  return gradient;
}




export const AverageGameDurationChart = ({team1, team2}) => {

  const chartRef = useRef(null);
  const [loading, setLoading] = useState(true);
  
  
  
  const [chartData, setChartData] = useState({
    labels: ['game10', 'game9', 'game8', 'game7', 'game6', 'game5', 'game4', 'game3', 'game2', 'game1'],

    datasets: [{
      label: 'Team 1',
      data: Array(10).fill(null),
      borderColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return '#04D9D9';
          return createGradient(ctx, chartArea, '#04D9D9', '#69021E','#BE5FD9' );
      },
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return 'rgba(4, 217, 217, 0.2)'; 
          return createGradient(ctx, chartArea, 'rgba(4, 217, 217, 0.1)', 'rgba(105, 2, 29, 0.3)', 'rgba(190, 95, 217, 0.5)');
        },
        fill: true,
        borderWidth: 3,
        tension: 0,
       
        spanGaps: true,
  },
 {
      label: 'Team 2',
      data: Array(10).fill(null),
      borderColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return '#0367A6'; 
          return createGradient(ctx, chartArea, '#0367A6', '#012840', '#F8F4E3'); 
        },
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return 'rgba(3, 103, 166, 0.2)'; 
          return createGradient(ctx, chartArea, 'rgba(3, 103, 166, 0.1)', 'rgba(0, 22, 41, 0.3)', 'rgba(248, 244, 227, 0.5)');
        },
        fill: true,
        borderWidth: 3,
        tension: 0,
        pointBackgroundColor: '#0367A6',
        pointBorderColor: '#0367A6',
        spanGaps: true,
 },
]
  });


  useEffect(() => {
    if (!team1 && !team2) return;

        setLoading(true);

        const fetchTeamData = (team) => {
          if (!team || !team.id) return Promise.resolve([]);
        

        return axios.get(`https://api.pandascore.co/matches/past?filter[opponent_id]=${team.id}&per_page=10`, {
        headers: { Authorization: `Bearer ${PANDASCORE_TOKEN}` }
        })

        .then(response => {
            const matches = response.data.reverse(); 

            return matches.map((match) => {
              if (!match.games || match.games.length === 0) return null;

              const validGames = match.games.filter((g) => g.length && g.length > 0);
              if (validGames.length > 0){
                const totalSeconds = validGames.reduce((acc, curr) => acc + curr.length, 0);
                return Math.round((totalSeconds / validGames.length) / 60);
              }
              return null;
            });
          });
        };

        Promise.all([fetchTeamData(team1), fetchTeamData(team2)])
        .then(([team1Durations, team2Durations]) => {

          const maxMatch = Math.max(team1Durations.length, team2Durations.length) || 10;
          const xLabels = Array.from({length: maxMatch}, (_, i) => {
            const matchNum = maxMatch - i;
            return matchNum === 1 ? 'Recent' : `Game${matchNum}`;
          });


          setChartData( (prev) => ({
            labels: xLabels,
            datasets: [
              {
              ...prev.datasets[0],
              label: team1 ? team1.name : 'Team 1',
              data: team1Durations
            },
            {
              ...prev.datasets[1],
              label: team2 ? team2.name : 'Team 2',
              data: team2Durations
            },
          ],

          }));

          setLoading(false);

        })
        .catch(err => {
          console.error("errrrrrprrrrrrrr", err);
          setLoading(false);
        });
      },[team1, team2]);

       return (
    <Card className="shadow-lg p-3" style={{ 
      backgroundColor: '#0302069c', 
      border: 'none', 
      borderRadius: '0.4rem', 
      fontFamily: 'beaufort-pro',
      width: '86%',
      border: '1px solid #fb9dc79d',
      marginTop: '20px'
    }}>
        <h4 style={{ color: '#F20775', display: 'inline-block', paddingBottom: '2px', marginBottom: '15px' }}>
        Average Game Duration
      </h4>

      <div style={{ position: 'relative', height: '300px', width: '100%' }}>
        <Chart 
          ref={chartRef} 
          type='bar' 
          data={chartData} 
          options={{ 
            responsive: true, 
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: { color: '#F8F4E3' } 
              }
            },
            scales: {
              x: { 
                  ticks: {color: '#F8F4E3'},
                  grid: {
                      color: '#e2d9cb3e',
              }
            },
                 
              y: { 
                  ticks: {color: '#F8F4E3'},
                  grid: {
                      color: '#e2d9cb3e',
              }
            },
            },
          }} 
        />
      </div>

   
    </Card>
    
   );
      

     
}

export default AverageGameDurationChart;
