import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CompareSearchBar from '../components/CompareSearchBar';
import TeamCard from '../components/TeamCard';
import TeamRosterCard from '../components/TeamRosterCard';
import React, { useState, useEffect } from "react";
import  WinRateChart  from '../components/WinRateChart';
import PlaystyleProfileChart from '../components/PlaystyleProfileChart';
import AverageGameDurationChart from '../components/AverageGameDurationChart';
import { ButtonGroup, Button } from 'react-bootstrap';



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
        </div>

    {team1Data && (
        <div style={{width: '100%'}}>
            <TeamRosterCard team={team1Data} />
            <WinRateChart team={team1Data}/>
            <PlaystyleProfileChart team={team1Data} />
        
        </div>
    )}
        </Col>
      
        {/* setting up layout for 2 teams */}
          <Col xs={12} md={5} className="teamTwo d-flex flex-column align-items-start">

        <div style={{ marginBottom: '20px'}}>
        <CompareSearchBar label="TEAM B:" onTeamSelect={setTeam2Data} />
        </div>

        <div style={{width: '100%'}}>
        <TeamCard team={team2Data} />
        </div>

{team2Data && (
        <div style={{width: '100%'}}>
            <TeamRosterCard team={team2Data} />
            <WinRateChart team={team2Data}/>
            <PlaystyleProfileChart team={team2Data} />
           
        </div>
)}
        </Col>
      
      </Row>
      
      {team1Data && team2Data && (
     <Row className="justify-content-center" style={{ marginTop: '40px', marginBottom: '60px' }}>
        <Col xs={12} md={12} className="d-flex justify-content-center">
          <AverageGameDurationChart team1={team1Data} team2={team2Data} />
        </Col>
      </Row>
      )}
      
    </Container>
  );
}

export default Comparison;


