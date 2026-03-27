import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
ChartJS.defaults.font.family = "'Datatype', monospace";
ChartJS.defaults.font.size = 14;

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);


export const options = {
  scales: {
    r: {
      angleLines: {
        display: false
      },
      
      min: 40000,
      max: 110000,
      ticks: {
        
        stepSize: 20000 
      }
    }
  }
};

export const data = {

  labels: ['Match 1', 'Match 2', 'Match 3', 'Match 4', 'Match 5', 'Match 6'],
  datasets: [
    {
      label: 'Rhis team Total Gold in GOLD',
      data: [46829, 60198, 62177, 108371, 75999, 80097],
      backgroundColor: 'rgba(64, 0, 255, 0.2)',
      borderColor: 'rgba(99, 104, 255, 0.78)',
      borderWidth: 1,
    }, {
    label: 'Enemy team Total Gold in GOLD',
      data: [36246, 68388, 77191, 105852, 75999, 77001],
      backgroundColor: 'rgba(255, 0, 102, 0.52)',
      borderColor: 'rgba(255, 27, 69, 0.86)',
      borderWidth: 1,
    }
  ],
};

const RadarChart = () => {
 return (
   <div style={{ width: '60%', margin: '0 auto', padding: '20px' }}>
     <h2 style={{fontFamily: "'Datatype', monospace", color: 'rgba(64, 0, 255, 0.44)', textAlign: 'center'}}>Total Gold per game in Rhi's 6 most recent League games </h2>
     <p style={{fontFamily: "'Datatype', monospace", color: '#4E0D60', textAlign: 'center'}}>It was a jungle diff each game...I'm the jungler</p>
     <Radar data={data} />
   </div>
 );
};

export default RadarChart;