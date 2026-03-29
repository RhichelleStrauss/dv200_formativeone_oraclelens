import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);



//env hidden token
//environment var manage my secrets aka API key
//.env is not in src, and is put in .gitignore(i think, google & AI helped(by explaining it to me like im stupid) and i implemented)
//these comments are simply for my understanding otherwise i dont know whats going on :D
const PANDASCORE_TOKEN = process.env.REACT_APP_PANDASCORE_TOKEN;

export function WinRateChart({team}) {
  
  const [winStats, setWinStats] = useState ({ winPercent: 0, lossPercent: 0, loading: true });
  
  useEffect (() => {
     if (!team || !team.id) return; 

     setWinStats (prev => ({...prev, loading: true }));
     axios.get(`https://api.pandascore.co/teams/${team.id}/matches?per_page=50`, {
      headers: {Authorization: `Bearer ${PANDASCORE_TOKEN}`}
     })

     .then(response => {
      const matches = response.data;
      let wins = 0;
      let finishedMatches = 0;

      matches.forEach(match => {
        if (match.winner_id !== null){
          finishedMatches ++;
          if (match.winner_id === team.id){
            wins++; 
          }
        }
        
      });

      if (finishedMatches > 0) {
        const winPercentage = Math.round( (wins / finishedMatches ) *100 );

        setWinStats({ winPercent: winPercentage, 
                      lossPercent: 100 - winPercentage, 
                      loading:false});
      }else {
        setWinStats({winPercent: 0, 
                    lossPercent: 0, 
                    loading:false });

      }

     })
     .catch (err => {
      console.error("no daaaaatttttttaaaaaaa",err);
      setWinStats({winPercent:0, lossPercent:0, loading:false});
     });

     
  }, [team]);

  if (!team) return null;

  if (winStats.loading) {
    return (
      <Card className="shadow-lg p-3" style={{ backgroundColor: '#0302069c', border: '1px solid #fb9dc79d', borderRadius: '0.4rem', marginTop: '20px' }}>
        <div style={{ color: '#F20775', fontFamily: 'beaufort-pro', textAlign: 'center' }}>Loadingggggg \^o^/</div>
      </Card>
    );
  }

  const data = {
    labels: ['Won', 'Lost'],
    datasets: [
      {
        data: [winStats.winPercent, winStats.lossPercent],
        borderWidth: 0, 
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          
          
          if (!chartArea) return null;

          
          const gradientWon = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradientWon.addColorStop(0, '#0367A6');
          gradientWon.addColorStop(1, '#012840');

         
          const gradientLost = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          

          gradientLost.addColorStop(0, '#69021E');
          gradientLost.addColorStop(1, '#CF043B');

          return context.dataIndex === 0 ? gradientWon : gradientLost;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, 
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.parsed}%`
        }
      }
    },
  };

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
      
    
      <div className="mb-3">
        <h4 style={{ color: '#F20775',  display: 'inline-block', paddingBottom: '2px', marginBottom: '15px' }}>
          Winrate
        </h4>
        
        <div className="d-flex align-items-center gap-3" style={{ fontSize: '16px', color: '#0367A6' }}>
          <div className="d-flex align-items-center gap-1">
            <span>{winStats.winPercent}% won</span>
            <div style={{ width: '40px', height: '14px', backgroundColor: '#0367A6' }}></div>
          </div>
          
      
               <div className="d-flex align-items-center gap-1" style={{ color: '#69021E' }}>
            <span>{winStats.lossPercent}% lost</span>
            <div style={{ width: '40px', height: '14px', backgroundColor: '#69021E' }}></div>
          </div>
        </div>
      </div>

      
      <div style={{  height: '200px', width: '100%', marginBottom: '20px' }}>
        <Pie data={data} options={options}  />
      </div>

    </Card>
  );
}

export default WinRateChart;