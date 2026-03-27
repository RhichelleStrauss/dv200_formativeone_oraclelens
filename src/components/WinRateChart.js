import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Card from 'react-bootstrap/Card';

ChartJS.register(ArcElement, Tooltip, Legend);


const dropShadowPlugin = {
  id: 'dropShadow',
  beforeDraw: (chart) => {
    const { ctx } = chart;
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.61)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = 8;
    ctx.shadowOffsetY = 8;
  },
  afterDraw: (chart) => {
    chart.ctx.restore();
  }
};

export function WinRateChart() {
  
  
  const staticWins = 65;
  const staticLosses = 35;

  const data = {
    labels: ['Won', 'Lost'],
    datasets: [
      {
        data: [staticWins, staticLosses],
        borderWidth: 0, 
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          
          
          if (!chartArea) return null;

          
          const gradientWon = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradientWon.addColorStop(0, '#69021E');
          gradientWon.addColorStop(1, '#CF043B');

          // Blue Gradient for "Lost"
          const gradientLost = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradientLost.addColorStop(0, '#0367A6');
          gradientLost.addColorStop(1, '#012840');

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
        
        <div className="d-flex align-items-center gap-3" style={{ fontSize: '16px', color: '#69021E' }}>
          <div className="d-flex align-items-center gap-1">
            <span>{staticWins}% won</span>
            <div style={{ width: '40px', height: '14px', backgroundColor: '#69021E' }}></div>
          </div>
          
          <div className="d-flex align-items-center gap-1" style={{ color: '#0367A6' }}>
            <span>{staticLosses}% lost</span>
            <div style={{ width: '40px', height: '14px', backgroundColor: '#0367A6' }}></div>
          </div>
        </div>
      </div>

      
      <div style={{  height: '200px', width: '100%', marginBottom: '20px' }}>
        <Pie data={data} options={options} plugins={[dropShadowPlugin]} />
      </div>

    </Card>
  );
}

export default WinRateChart;