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
              This will explain a bit more regarding LoL esports to make the website make more sense to novices.
            </p>
          </Card.Text>
        )}
        
      </Card.Body>
    </Card>
  );
}

export default HeroSection;