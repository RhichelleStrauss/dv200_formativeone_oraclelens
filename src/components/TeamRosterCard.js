import Card from 'react-bootstrap/Card';
import axios from 'axios';
import React, { useState, useEffect } from "react";

//env hidden token
//environment var manage my secrets aka API key
//.env is not in src, and is put in .gitignore(i think, google & AI helped(by explaining it to me like im stupid) and i implemented)
//these comments are simply for my understanding otherwise i dont know whats going on :D
const PANDASCORE_TOKEN = process.env.REACT_APP_PANDASCORE_TOKEN;

function TeamRosterCard({ team }) {
    if (!team || !team.players || team.players.length === 0) return null;

    const formatRole = (role) => {
    if (!role) return 'N/A';
    const cleanRole = role.toLowerCase();
    if (cleanRole === 'jun') return 'Jgl';
    if (cleanRole === 'sup') return 'Sup';
    if (cleanRole === 'adc') return 'ADC';
    return cleanRole.charAt(0).toUpperCase() + cleanRole.slice(1); 
  };
  
  return (
    <Card style={{
      width: '100%',
      backgroundColor: '#0f0a1fd7',
      border: '1px solid #fb9dc7b2',
      borderRadius: '8px',
      marginTop: '20px',
      fontFamily: 'beaufort-pro'
    }}
      className="shadow-lg"
    >

      <Card.Body className= "p-4" style={{marginBottom: '10px'}} >

        <div style={{color: '#F20775', fontSize: '22px', marginBottom: '20px', fontFamily: "beaufort-pro" }}>
            Team’s Current Roster:
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '6px 5px',
          fontSize: '16px',
          textAlign: 'center'
        }}>

          <div style={{color: '#F20775', fontWeight: '400', fontFamily: "helvetica-neue-lt-pro", marginBottom: '20px' }}>Name: </div>
          <div style={{color: '#F20775', fontWeight: '400', fontFamily: "helvetica-neue-lt-pro" }}>Age: </div>
          <div style={{color: '#F20775', fontWeight: '400', fontFamily: "helvetica-neue-lt-pro" }}>Role: </div>
          <div style={{color: '#F20775', fontWeight: '400', fontFamily: "helvetica-neue-lt-pro" }}>Nation: </div>


{team.players.map((player) => (
            <React.Fragment key={player.id}>
            
              <div style={{color: '#E2D9CB', fontWeight: '400', fontFamily: "helvetica-neue-lt-pro" }}>
                {player.name}</div>
            
              <div style={{color: '#E2D9CB', fontWeight: '400', fontFamily: "helvetica-neue-lt-pro" }}>
                {player.age || 'N/A'}</div>
              
              <div style={{color: '#E2D9CB', fontWeight: '400', fontFamily: "helvetica-neue-lt-pro", textTransform: 'capitalize' }} >
                
                {formatRole(player.role)}</div>


              <div style={{color: '#E2D9CB', fontWeight: '400', fontFamily: "helvetica-neue-lt-pro" }}>
                {player.nationality || 'N/A'}</div>

                
            </React.Fragment>
          ))}


         
          
        </div>
      </Card.Body>
    </Card>
  );
}

export default TeamRosterCard;