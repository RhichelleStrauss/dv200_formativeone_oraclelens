import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { ButtonGroup, Button, Row } from 'react-bootstrap';
import axios from 'axios';
import LeaguepediaSearchBar from '../components/LeaguepediaSearchBar';
import { TimelineChart } from '../components/TimelineChart';

import Modal from 'react-bootstrap/Modal';
import TimelineDataModal from '../components/TimelineDataModal';
import Card from 'react-bootstrap/Card';


export const Timeline = () => {

  const [searchMode, setSearchMode] = useState('team'); //set search for team or player - default is team

  const [searchInput, setSearchInput] = useState('');
  const [matchHistory, setMatchHistory] = useState([]); //20 games fetched from api
  const [selectedMetric, setSelectedMetric] = useState('kpm'); //default on dropdown is kills per min

  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Search to view timeline');
  const [modalShow, setModalShow] = useState(false);

  //toggles between player and team
  //if the mode is on team, the dropdown defaults to kills per minute, if not the dropdown defaults to kda(playermetric)
  const handleModeToggle = (mode) => {
    setSearchMode(mode);
    setChartData(null);
    setMatchHistory([]);
    setSearchInput('');
    setSelectedMetric(mode === 'team' ? 'kpm' : 'kda');
    setStatusMessage(`Switched to ${mode} search.`);
  };

  const handleTeamSelect = async (selectedTeam) => {
    if (!selectedTeam || !selectedTeam.name) return;

    const searchName = selectedTeam.name.trim();
    setSearchInput(searchName);
    setLoading(true);
    setChartData(null);

    const cargoTable = searchMode === 'player' ? 'ScoreboardPlayers' : 'ScoreboardGames';
    const cargoFields = searchMode === 'player'
      ? 'DateTime_UTC, Champion, Kills, Deaths, Assists, CS, Gold, DamageToChampions'
      : 'DateTime_UTC, Team1, Team2, WinTeam, Gamelength_Number, Team1Kills, Team2Kills, Team1Dragons, Team2Dragons, Team1Gold, Team2Gold, Team1Towers, Team2Towers';

    const cargoWhere = searchMode === 'player'
      ? `Link = '${searchName}'`
      : `Team1 LIKE '%${searchName}%' OR Team2 LIKE '%${searchName}%'`;

    try {
      const response = await axios.get(`http://localhost:5000/api/cargo`, {
        params: {
          action: 'cargoquery',
          format: 'json',
          tables: cargoTable,
          fields: cargoFields,
          where: cargoWhere,
          limit: 20,
          order_by: 'DateTime_UTC DESC'
        }
      });

      const rawData = (response.data.cargoquery || []).map(item => item.title);
      if (rawData.length === 0) {
        setStatusMessage(`No matches found for "${searchName}".`);
        setLoading(false);
        return;
      }

      setMatchHistory(rawData.reverse());
      setLoading(false);
    } catch (error) {
      setStatusMessage(`Error: ${error.message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (matchHistory.length === 0) return;

    let yAxisData = [];
    let currentLabel = '';
    const xLabels = matchHistory.map((_, index) => `Game ${index + 1}`);

    //if toggle is on player switch the drop down
    //switch statement - switch if on player - changes to player dropdown
    //when something is clicked, all cases are skipped until reaching the selected one.
    if (searchMode === 'player') {
      switch (selectedMetric) {

        case 'kda':
          //kda - kills deaths assists
          currentLabel = 'KDA Ratio';
          yAxisData = matchHistory.map(game => {
            const k = parseFloat(game.Kills || 0), a = parseFloat(game.Assists || 0), d = parseFloat(game.Deaths || 0);
            return d === 0 ? (k + a) : ((k + a) / d).toFixed(2);
            //if player had no deaths(damn hes good), itll just add kills and assists together 
            //if player had death, kda ratio is calculated by adding kills and assists then dividing by deaths
            //rounds to 2
          });

          break;

        case 'kills': currentLabel = 'Kills'; yAxisData = matchHistory.map(g => g.Kills); break;
        case 'cs': currentLabel = 'CS'; yAxisData = matchHistory.map(g => g.CS); break;
        //grabs raw numbers from database

        case 'gold': currentLabel = 'Gold (k)'; yAxisData = matchHistory.map(g => (g.Gold / 1000).toFixed(1)); break;
        //divides gold by1000 

        case 'damage':
          currentLabel = 'Damage to Champions (k)';
          yAxisData = matchHistory.map(game => (parseFloat(game.DamageToChampions || 0) / 1000).toFixed(1));
          //divides cs by 1000
          break; //stop

        default: yAxisData = matchHistory.map(() => 0);
      }
    } else {
      const isOurT1 = (game) => game.Team1.toLowerCase().includes(searchInput.toLowerCase());

      switch (selectedMetric) {

        case 'kpm':
          currentLabel = 'Kills Per Minute';
          yAxisData = matchHistory.map(game => {
            const k = isOurT1(game) ? game.Team1Kills : game.Team2Kills; //if team 1, inserts kills
            //if not team1, take team2 kills and divide by the gamelength
            return (parseFloat(k) / parseFloat(game.Gamelength_Number || 1)).toFixed(2);
          });

          break;
        case 'dragonControl':
          currentLabel = 'Dragon Control Rate (%)';
          yAxisData = matchHistory.map(game => {
            const our = isOurT1(game) ? parseFloat(game.Team1Dragons) : parseFloat(game.Team2Dragons);
            const enemy = isOurT1(game) ? parseFloat(game.Team2Dragons) : parseFloat(game.Team1Dragons);
            return (our + enemy === 0) ? 0 : ((our / (our + enemy)) * 100).toFixed(1);
            //takes searched teams dragons(our/team1), as well as enemy, adds the dragons together, then check what percentage was team 1
          });
          break;

        case 'goldDiff':
          currentLabel = 'Gold Diff Per Minute (k)';
          yAxisData = matchHistory.map(game => {
            const t1Gold = parseFloat(String(game.Team1Gold || '0').replace(/,/g, ''));
            const t2Gold = parseFloat(String(game.Team2Gold || '0').replace(/,/g, ''));
            const gameLength = parseFloat(game.Gamelength_Number || 1);
            const diff = isOurT1(game) ? (t1Gold - t2Gold) : (t2Gold - t1Gold);
            return ((diff / 1000) / gameLength).toFixed(2);
          });
          break;

        case 'towerDiff':
          currentLabel = 'Tower Difference';
          yAxisData = matchHistory.map(game => {
            const t1 = parseFloat(game.Team1Towers || 0), t2 = parseFloat(game.Team2Towers || 0);
            return isOurT1(game) ? (t1 - t2) : (t2 - t1);
          });
          break;
        //gold diff and tower diff just adds both these datas together, then subtracts enemy to find difference

        case 'side':
          currentLabel = 'Side Performance (Blue +1, Red -1)';
          yAxisData = matchHistory.map(game => {
            const isT1 = isOurT1(game);
            const winner = game.WinTeam.toLowerCase().includes(searchInput.toLowerCase());
            if (isT1 && winner) return 1; if (!isT1 && winner) return 0.5;
            if (!isT1 && !winner) return -0.5; if (isT1 && !winner) return -1;
            return 0;
          });
          //win on blue = +1, win on red = +0.5
          //lose on blue = -1, lose on red = -0.5

          break;
        default: yAxisData = matchHistory.map(() => 0);
      }
    }

    setChartData({
      labels: xLabels,
      datasets: [{
        label: currentLabel,
        data: yAxisData,
        borderColor: '#04D9D9',
        backgroundColor: 'rgba(4, 217, 217, 0.2)',
        fill: true,
        tension: 0.3,
        borderWidth: 3,
        pointBackgroundColor: '#69021E',
      }]
    });
  }, [matchHistory, selectedMetric, searchInput, searchMode]);

  return (
    <div className="container mt-5">
      <div className="mb-2 d-flex align-items-center gap-4">
        <h4 className='timelineHead m-0'>Timeline</h4>

        <div className="mb-2 d-flex  gap-4">
          <Row>
            <ButtonGroup>
              <Button onClick={() => handleModeToggle('team')} style={{ backgroundColor: searchMode === 'team' ? 'rgba(187, 4, 52, 0.656)' : 'transparent', color: searchMode === 'team' ? '#E2D9CB' : 'rgba(187, 4, 52, 0.656)', borderColor: 'rgb(219, 30, 81)' }}>Teams</Button>
              <Button onClick={() => handleModeToggle('player')} style={{ backgroundColor: searchMode === 'player' ? 'rgba(187, 4, 52, 0.656)' : 'transparent', color: searchMode === 'player' ? '#E2D9CB' : 'rgba(187, 4, 52, 0.656)', borderColor: 'rgb(219, 30, 81)' }}>Players</Button>
            </ButtonGroup>
          </Row>
        </div>



      </div>

      <div className="mb-4">
        <TimelineDataModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>



      <Card className="shadow-lg p-3" style={{
        backgroundColor: '#0302069c',
        border: '1px solid #fb9dc79d',
        borderRadius: '0.4rem',
        fontFamily: 'beaufort-pro',
        width: '100%',
        marginTop: '20px'
      }}>


        <div className="d-flex justify-content-between align-items-center mb-4">
          <div style={{ width: '50%' }}>
            <LeaguepediaSearchBar label={searchMode === 'player' ? "Player:" : "Team:"} onTeamSelect={handleTeamSelect} searchMode={searchMode} />
          </div>

          <div style={{ width: '30%' }}
            className='d-flex justify-content-end'>
            <Form.Select className="leagueDropdown mt-4 mb-4 w-auto" value={selectedMetric} onChange={(e) => setSelectedMetric(e.target.value)}>
              {searchMode === 'team' ? (
                <>
                  <option value="kpm">Kills Per Minute</option>
                  <option value="dragonControl">Dragon Control Rate (%)</option>
                  <option value="goldDiff">Gold Difference Per Min (k)</option>
                  <option value="towerDiff">Tower Difference</option>
                  <option value="side">Side Performance (Blue +1, Red -1)</option>
                </>
              ) : (
                <>
                  <option value="kda">KDA Ratio</option>
                  <option value="kills">Total Kills</option>
                  <option value="cs">Creep Score (CS)</option>
                  <option value="gold">Gold Earned</option>
                  <option value="damage">Total Damage to Champions</option>
                </>
              )}
            </Form.Select>
          </div>
        </div>

        {loading ? <p style={{ color: '#fb9dc7' }}>Loading...</p> : chartData && <TimelineChart chartData={chartData} metricName={selectedMetric} />}
      </Card>
    </div>

  );
};

export default Timeline;