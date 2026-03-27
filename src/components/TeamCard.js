import Card from 'react-bootstrap/Card';
import axios from 'axios';
import React, { useState, useEffect } from "react";

//env hidden token
//environment var manage my secrets aka API key
//.env is not in src, and is put in .gitignore(i think, google & AI helped(by explaining it to me like im stupid) and i implemented)
//these comments are simply for my understanding otherwise i dont know whats going on :D
const PANDASCORE_TOKEN = process.env.REACT_APP_PANDASCORE_TOKEN;

function TeamCard({ team }) {

 if (!team){
  return (
      <Card className="shadow-lg" style={{ width: '100%', backgroundColor: '#0f0a1fd7', border: '1px solid #fb9dc7b2', borderRadius: '4px', marginTop: '60px', height: '180px' }}>
        <div className="text-white d-flex align-items-center justify-content-center h-100 opacity-50" style={{fontFamily: 'beaufort-pro'}}>
          Search for a team to begin...
        </div>
      </Card>
    );
  }
  
  return (
    <Card style={{
      width: '100%',
      backgroundColor: '#0f0a1fd7',
      border: '1px solid #fb9dc7b2',
      borderRadius: '0.4rem',
      marginTop: '60px',
      fontFamily: 'beaufort-pro'
    }}
      className="shadow-lg"
    >
      <div className="d-flex justify-content-center"
        style={{
          marginTop: '-40px'
        }}>

        <div
          style={{
            padding: '10px 20px',
            borderRadius: '0.4rem'
          }}
        >
          <img
            src={team.image_url || 'https://via.placeholder.com/100?text=No+Logo'}
            alt={`${team.name} Logo`}
            // placeholder
            style={{ width: '100px', height: 'auto', objectFit: 'contain', borderRadius: '0.4rem' }}
          />
        </div>
      </div>


      <Card.Body className= "p-4 pt-2" style={{marginBottom: '10px'}} >

        <div style={{
          display: 'grid',
          gridTemplateColumns: '120px 1fr',
          gap: '10px',
          fontSize: '16px'
        }}>

          <div style={{color: '#F20775', fontWeight: '400', fontFamily: "helvetica-neue-lt-pro" }}>Team Name: </div>
          <div className='teamText'style={{color: '#E2D9CB', fontWeight: '400', fontFamily: "helvetica-neue-lt-pro" }}>
            {team.name}</div>

          <div style={{color: '#F20775', fontWeight: '400', fontFamily: "helvetica-neue-lt-pro" }}>Acronym: </div>
          <div className='teamText'
          style={{color: '#E2D9CB', fontWeight: '400', fontFamily: "helvetica-neue-lt-pro" }}>
            {team.acronym || 'N/A'}</div>

          <div style={{color: '#F20775', fontWeight: '400', fontFamily: "helvetica-neue-lt-pro" }}>Region: </div>
          <div className='teamText'
          style={{color: '#E2D9CB', fontWeight: '400', fontFamily: "helvetica-neue-lt-pro" }}>
            {team.location || 'Unknown'}</div>

          <div style={{color: '#F20775', fontWeight: '400', fontFamily: "helvetica-neue-lt-pro" }}>League: </div>
          <div className='teamText' 
          style={{color: '#E2D9CB', fontWeight: '400', fontFamily: "helvetica-neue-lt-pro" }}>
          </div>

        
        </div>
      </Card.Body>
    </Card>
 
  );
}

export default TeamCard;