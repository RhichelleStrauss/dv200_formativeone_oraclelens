
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import SpotlightEffect from "./SpotlightEffect";
import '../css/UpcomingMatches.css';
import {Form, Spinner, Modal, Button} from 'react-bootstrap';

//env hidden token
//environment var manage my secrets aka API key
//.env is not in src, and is put in .gitignore(i think, google & AI helped(by explaining it to me like im stupid) and i implemented)
//these comments are simply for my understanding otherwise i dont know whats going on :D
const PANDASCORE_TOKEN = process.env.REACT_APP_PANDASCORE_TOKEN;

//const [state, setState] = useState(initialValue);
//setState - method to count(edit/update) || state - can replace with actual control var you want to work with
//([]); - empty array
//when state is changed the component re renders and page doesn't relaod 
//minddump of class notes ^^ ☆*: .｡. o(≧▽≦)o .｡.:*☆
function UpcomingMatches() {
  const navigate = useNavigate();
    const [leagues, setLeagues] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState('');
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);


    //setting up modal states for when clicking on a team
    const [showModal, setShowModal] = useState(false);
    const [clickedTeam, setClickedTeam] = useState(null);

    const [recentForm, setRecentForm] = useState([]);
    const [loadingForm, setLoadingForm] = useState(false);
    
    const handleTeamClick = (team) => {
    if (team.name !== 'TBD') {
      setClickedTeam(team);
      setShowModal(true);

      //if a team is clicked, itll set the clicked team on the modal
      //if in a case where a team isnt there (such as TBD) it will not set the modal
      //team name and TBD arent the same therefore only on teamname will modal click
    }
  };


   // ᓚᘏᗢ mind dump from class notes
   //useeffect hook works with fetch function
   //use effect has 2 parameters, and callback
   //1st arg - function that contains code needing to run (below case is the fetching of API)
   //2nd arg - dependency lsit, vars we need to lsiten to, if changed needs to re render.

 useEffect(() => {
        axios.get('https://api.pandascore.co/lol/leagues?per_page=100', {
            headers: { Authorization: `Bearer ${PANDASCORE_TOKEN}` }
        })

.then(response => {
    setLeagues(response.data);
    if (response.data.length > 0) setSelectedLeague (response.data[0].id);

})
.catch(err => console.error ("Unable to fetch leagues :(", err));
 }, []);
 //only run when page laods []

 useEffect (() => {
    if (!selectedLeague) return;

    setLoading(true);

    axios.get(`https://api.pandascore.co/lol/matches/upcoming?filter[league_id]=${selectedLeague}&sort=begin_at&per_page=10`, {
        headers: {Authorization: `Bearer ${PANDASCORE_TOKEN}`}
    })

    .then(response => {
        setMatches(response.data);
        setLoading(false);
    })

    .catch(err => {
        console.error("error fetching matchings :(", err);
        setLoading(false);
    });
    
 }, [selectedLeague]);

 useEffect(() => {
    if (!clickedTeam) return;
    
    setLoadingForm(true);

    axios.get(`https://api.pandascore.co/lol/matches/past?filter[opponent_id]=${clickedTeam.id}&per_page=5`, {
      headers: { Authorization: `Bearer ${PANDASCORE_TOKEN}` }
    })
    .then(response => {
      const form = response.data.map(match => {
        return match.winner_id === clickedTeam.id ? 'W' : 'L';
      });
      setRecentForm(form.reverse());
      setLoadingForm(false);
    })
    .catch(err => {
      console.error("Error fetching recent form:", err);
      setLoadingForm(false);
    });
  }, [clickedTeam]);

 console.log(leagues);

 return(

  <div className="matchContainer w-100 mt-5">

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <Form.Select 
          className="leagueDropdown border-secondary shadow-none w-auto"
          value={selectedLeague}
          onChange={(e) => setSelectedLeague(e.target.value)}
          style={{ cursor: 'pointer', fontFamily: 'beaufort-pro' }}
        >
          {leagues.map(league => (
            <option key={league.id} value={league.id}>
              {league.name}
            </option>
          ))}
        </Form.Select>

      
        
  
        </div>

{loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="danger" />
        </div>

      ) : matches.length === 0 ? (
        <div className="errorMessage text-white opacity-50 text-center py-4">
          This league currently has no upcoming matches, there is internationals ocurring \^o^/
        </div>
      ) : (

        matches.map((match) => {
          const matchDate = new Date(match.begin_at);
          const dateString = matchDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
          const timeString = matchDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) + ' CET';

          const team1 = match.opponents[0]?.opponent || { name: 'TBD', image_url: '' };
          const team2 = match.opponents[1]?.opponent || { name: 'TBD', image_url: '' };

          return (
            <SpotlightEffect
              key={match.id} 
              className="matchCardWrapper mb-3" 
              spotlightColor="rgba(4, 217, 217, 0.5)"
            >
              <div className="matchCard d-flex flex-column flex-lg-row justify-content-between align-items-center text-center text-lg-start p-3 p-md-4 w-100">
                
                <div className="mb-3 mb-lg-0" style={{ minWidth: '150px' }}>
                  <div className="meta-text">{dateString}</div>
                  <div className="meta-text opacity-75">{match.league.name}</div>
                </div>

                <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center flex-grow-1 my-3 my-lg-0 gap-3">
                 {/* team1 */}
               <button 
                    className="teamInfo d-flex flex-row-reverse flex-sm-row align-items-center gap-2 clickable-team"
                    onClick={() => handleTeamClick(team1)}
                    style={{ background: 'none', border: 'none', padding: 0 }}
                  >
                    <span className="text-white">{team1.name}</span>
                    {team1.image_url && <img src={team1.image_url} alt={team1.name} className="teamLogo" />}
                  </button>
                  
                  <div className="vsText mx-2 mx-sm-4">V.S</div>
                  
                  {/* team2 */}
                  <button 
                    className="teamInfo d-flex align-items-center gap-2 clickable-team"
                    onClick={() => handleTeamClick(team2)}
                    style={{ background: 'none', border: 'none', padding: 0 }}
                  >
                    {team2.image_url && <img src={team2.image_url} alt={team2.name} className="teamLogo" />}
                    <span className="text-white">{team2.name}</span>
                  </button>
                </div>

                <div className="mt-3 mt-lg-0 text-center text-lg-end" style={{ minWidth: '150px' }}>
                  <div className="meta-text">{timeString}</div>
                  <div className="meta-text mt-1 ">BEST OF {match.number_of_games}</div>
                </div>

              </div>
            </SpotlightEffect>
          );
        })
      )}
      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        centered
      
      >
        <Modal.Header closeButton style={{ borderBottom: '1px solid #fb9dc7b2' }}>
          <Modal.Title style={{ color: '#F20775', fontSize: '22px', fontFamily: "beaufort-pro" }}>
            Team Overview
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body className="text-center">
          {clickedTeam?.image_url ? (
            <img 
              src={clickedTeam.image_url} 
              alt={clickedTeam.name} 
              style={{ width: '120px', marginBottom: '20px' }} 
            />
          ) : (
            <div style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span>No Logo Available</span>
            </div>
          )}
          
          <h3 style={{ color: '#F20775', fontFamily: "beaufort-pro", textTransform: 'uppercase' }}>
            {clickedTeam?.name} {clickedTeam?.acronym ? `(${clickedTeam.acronym})` : ''}
          </h3>
          
          <div style={{ color: '#e2d9cb', marginTop: '15px' }}>
            <p>Location: {clickedTeam?.location || 'Unknown'}</p>
           
          </div>

          <div>
            <h5 style={{ color: '#F20775', fontFamily: 'beaufort-pro', borderBottom: '1px solid #F20775', paddingBottom: '5px', width: 'fit-content', margin: '0 auto 15px auto' }}>
              Recent Form
            </h5>

            {loadingForm ? (
              <Spinner animation="border" size="sm" style={{ color: '#04D9D9' }} />
            ) : recentForm.length > 0 ? (
              <div className="d-flex justify-content-center gap-2">
                {recentForm.map((result, idx) => (
                  <div key={idx} style={{
                    backgroundColor: result === 'W' ? 'rgba(4, 217, 217, 0.1)' : 'rgba(242, 7, 117, 0.1)',
                    color: result === 'W' ? '#04D9D9' : '#F20775',
                    border: `1px solid ${result === 'W' ? '#04D9D9' : '#F20775'}`,
                    borderRadius: '5px',
                    width: '35px',
                    height: '35px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontFamily: 'beaufort-pro'
                  }}>
                    {result}
                  </div>
                ))}
              </div>
            ) : (
              <p className="opacity-50" style={{ fontSize: '0.9rem' }}>No recent matches found.</p>
            )}
            </div>
        </Modal.Body>

        <Modal.Footer style={{ borderTop: '1px solid #fb9dc7b2' }}>
      
          <Button 
            className="modalUpcomingButton"
            variant="outline-light" 
            onClick={() => setShowModal(false)}
            style={{ borderColor: 'rgb(219, 30, 81)', backgroundColor: 'rgba(187, 4, 52, 0.656)', color: '#F8F4E3' }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
 )
}

export default UpcomingMatches;