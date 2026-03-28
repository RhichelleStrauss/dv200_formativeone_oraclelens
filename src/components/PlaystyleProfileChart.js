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

import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PlaystyleDataModal from './PlaystyleDataModal';



ChartJS.defaults.font.family = "'helvetica-neue-lt-pro', sans-serif";
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
      min: 0,
      max: 100,
      ticks: {
        color: '#e2d9cb91',
        backdropColor: 'transparent',
        font: { family: "helvetica-neue-lt-pro" },
        stepSize: 20
      },
      grid: {
        color: '#e2d9cb7c',
        lineWidth: 1
      },

      pointLabels: {
        color: '#e2d9cb91',
        font: { family: "helvetica-neue-lt-pro", size: 12 }
      }
    }
  },

  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {

        label: (context) => ` ${context.label}: ${context.raw}%`
      }
    }
  }
};



//mind dump to myself of how i believe i will retrieve data

//sweep rate: percent of flawless series by team (if they won 2-0,3-0 etc)
//sweep rate how to get: look at opposing teams score in results - should be 0
//game1 winrate: calculate the wr % for games where the team has won the 1st game in the series (position 1 in results array)
//comeback rate: calculate the wr% for team where they were not postion 1 after game1, but won the whole series
//silverscrapes winrate: silver scrapes is a lolesports term for when teams go to a tiebreaker game - so when a series goes to
//game 5 of best of 5 or game3 of best of3. so wr% of a team when going to silver scrapes.
//calculate? wr% when in game 3 of 3 or 5of5
//recent match volume: no of series/games total played in 30 days (games played divided by days?)
//have yet to add this, but most people will not understand these terms - hence i will create a modal popup which a user can click
//and the user can see brief explanations - or even a tab on dashboard explaining some simple terms

const PANDASCORE_TOKEN = process.env.REACT_APP_PANDASCORE_TOKEN;

export const PlaystyleProfileChart = ({ team }) => {

  const [modalShow, setModalShow] = useState(false);

  const [radarLoading, setRadarLoading] = useState(false);
  const [playstyleProfile, setPlaystyleProfile] = useState({

    labels: ['Sweep rate', 'Game1 winrate', 'Comeback rate', 'Silverscrapes winrate', 'recent matches'],
    datasets: [
      {
        label: 'Team playstyle',
        data: [0, 0, 0, 0, 0],
        backgroundColor: 'rgba(105, 2, 29, 0.66)',
        borderColor: 'rgba(105, 2, 30, 0.72)',
        borderWidth: 1,
      },
    ],
  });


  useEffect(() => {

    if (!team || !team.id) return;
    setRadarLoading(true);

    axios.get(`https://api.pandascore.co/teams/${team.id}/matches?per_page=50`, {
      headers: { Authorization: `Bearer ${PANDASCORE_TOKEN}` }
    })

      .then(response => {
        const matches = response.data;

        let sweepOppose = 0, sweepTeam = 0;
        let gameOnePlayed = 0, gameOneWin = 0;
        let comebackLost = 0, comebackWin = 0;
        let silverScrapesOppose = 0, silverScrapesWin = 0;


        matches.forEach(match => {
          if (match.number_of_games <= 1) return;

          if (match.winner_id !== null) {
            sweepOppose++;
            const enemyResult = match.results.find(response => response.team_id !== team.id);
            if (match.winner_id === team.id && enemyResult && enemyResult.score === 0) {
              sweepTeam++;
            }
          }

          const firstGame = match.games.find(g => g.position === 1);

          if (firstGame && firstGame.winner_id) {
            gameOnePlayed++;
          }

          if (firstGame.winner_id === team.id) {
            gameOneWin++;
          } else {
            comebackLost++;
            if (match.winner_id === team.id) {
              comebackWin++;

            }
          }
          const gamesPlayedIn = match.games.filter(g => g.winner_id !== null).length;
          if (gamesPlayedIn === match.number_of_games) {
            silverScrapesOppose++;


            if (match.winner_id === team.id) {
              silverScrapesWin++;
            }
          }

        });

        const sweepRate = sweepOppose > 0 ? Math.round((sweepTeam / sweepOppose) * 100) : 0;
        const gameOneWR = gameOnePlayed > 0 ? Math.round((gameOneWin / gameOnePlayed) * 100) : 0;

        const comebackRate = comebackLost > 0 ? Math.round((comebackWin / comebackLost) * 100) : 0;
        const silverScrapesWR = silverScrapesOppose > 0 ? Math.round((silverScrapesWin / silverScrapesOppose) * 100) : 0;

        const recentMatches = Math.min(Math.round((matches.length / 30) * 100), 100);

        setPlaystyleProfile(prev => ({
          ...prev,
          datasets: [{
            ...prev.datasets[0],
            data: [sweepRate, gameOneWR, comebackRate, silverScrapesWR, recentMatches]
          }]
        }));

        setRadarLoading(false);
      })
      .catch(err => {
        console.error("errroooooorrrrr", err);
        setRadarLoading(false);
      });

  }, [team]);

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
        <h4 style={{ color: '#F20775', display: 'inline-block', paddingBottom: '2px', marginBottom: '6px' }}>
          Playstyle Profile
        </h4>
        

<PlaystyleDataModal 
          show={modalShow} 
          onHide={() => setModalShow(false)} 
        />
      </div>

      <div style={{
        height: '500px',
        width: '100%',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>

        <Radar data={playstyleProfile} options={options} />
      </div>


    </Card>


  );
};

export default PlaystyleProfileChart;