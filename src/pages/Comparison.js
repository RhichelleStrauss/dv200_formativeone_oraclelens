import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CompareSearchBar from '../components/CompareSearchBar';
import TeamCard from '../components/TeamCard';
import TeamRosterCard from '../components/TeamRosterCard';
import React, { useState, useEffect } from "react";
import  WinRateChart  from '../components/WinRateChart';
import AverageGameDurationChart from '../components/AverageGameDurationChart';

function Comparison() {
  const [team1Data, setTeam1Data] = useState(null);
  const [team2Data, setTeam2Data] = useState(null);
  return (
    <Container>
      <h2 className="comparePageHead">Compare Teams in LOL esports</h2>


      <Row className="compareLayout justify-content-center" style={{marginTop: '100px', gap: '40px'}}>

        {/* setting up layout for 2 teams */}
        <Col xs={12} md={5} className="teamOne d-flex flex-column align-items-start">

        <div style={{ marginBottom: '20px'}}>
        <CompareSearchBar label="TEAM A:" onTeamSelect={setTeam1Data} />
        </div>

        <div style={{width: '100%'}}>
        <TeamCard team={team1Data} />
            <TeamRosterCard team={team1Data} />
            <WinRateChart team={team1Data}/>
            <AverageGameDurationChart team={team1Data}/>
            
        </div>
        </Col>
      
        {/* setting up layout for 2 teams */}
          <Col xs={12} md={5} className="teamTwo d-flex flex-column align-items-start">

        <div style={{ marginBottom: '20px'}}>
        <CompareSearchBar label="TEAM B:" onTeamSelect={setTeam2Data} />
        </div>

        <div style={{width: '100%'}}>
        <TeamCard team={team2Data} />
            <TeamRosterCard team={team2Data} />
            <WinRateChart team={team1Data}/>
        </div>
        </Col>
        

      </Row>
     
      
    </Container>
  );
}

export default Comparison;


