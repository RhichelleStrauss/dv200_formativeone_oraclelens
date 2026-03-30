import '../css/HeroSection.css'
import Card from 'react-bootstrap/Card';
import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';

function HeroSection() {

  const [activeTab, setActiveTab] = useState('basic');

  return (
    <Card className="text-start hero-card" style={{ border: 'none', backgroundColor: 'transparent' }}>

      <Card.Header className="hero-tabs-header" style={{ border: 'none', backgroundColor: 'transparent', padding: 0 }}>
        <Nav variant="tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="border-0">
          <Nav.Item>
            <Nav.Link
              eventKey="basic"
              className={activeTab === 'basic' ? 'active-tab' : 'inactive-tab'}
            >
              Overview
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="detailed"
              className={activeTab === 'detailed' ? 'active-tab' : 'inactive-tab'}
            >
              detailed overview
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>

      <Card.Body className="hero-content-body">

        {activeTab === 'basic' && (
          <Card.Text style={{ color: '#e2d9cb' }}>
            The story of the season isn't just told on the main stage; it’s written in the stats. Oracle Lens is your definitive archive for competitive league data. Dive deep into the post-match numbers to analyze past performances, compare historical team stats side-by-side, and see exactly how the top rosters stack up against each other. By breaking down past match data, tracking active player rosters, and keeping an eye on the upcoming schedule, you have everything you need to understand the meta and predict the next champions.
          </Card.Text>
        )}
        {activeTab === 'detailed' && (
          <Card.Text style={{ color: '#e2d9cb' }}>
            <strong style={{ color: '#F20775' }}>Detailed Overview</strong>
            <p>League of Legends Esports seems very daunting to those who both have never heard of it, nor play the game.
              This will explain a bit more regarding LoL esports to make the website make more sense to novices. LoL is a 5v5 battle
              on Summoners Rift. The two teams are on different sides of the map(red side and blue side). The end goal is to destroy
              the enemys nexus, in their base. You work together as a team to get gold, level up, and take down objectives.
            </p>

            <h3 style={{ color: '#F20775', fontSize: '22px', fontFamily: "beaufort-pro" }}>
              A series</h3>
            <p>A series in LoL esports is a game, whether it be a best of 1, 3 or 5</p>

            <h3 style={{ color: '#F20775', fontSize: '22px', fontFamily: "beaufort-pro" }}>
              How to get gold</h3>
            <p>To make more gold/get gold you kill enemies, take down neutral objectives and cs (creeperscore) which in lane is taking down
              minions, or jungle camps if you're a jungler.
            </p>

            <h3 style={{ color: '#F20775', fontSize: '22px', fontFamily: "beaufort-pro" }}>
              Roles</h3>
            <p>Each of the 5 players have a different role, and position on the map - each with their own skills needed.
            </p>

          </Card.Text>
        )}

      </Card.Body>
    </Card>
  );
}

export default HeroSection;