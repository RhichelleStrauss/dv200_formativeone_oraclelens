
import React, { useState, useEffect } from "react";
import axios from "axios";

import SpotlightEffect from "./SpotlightEffect";
import '../css/UpcomingMatches.css';
import {Form, Spinner} from 'react-bootstrap';

//env hidden token
//environment var manage my secrets aka API key
//.env is not in src, and is put in .gitignore(i think, google & AI helped and i implemented)
//these comments are simply for my understanding otherwise i dont know whats going on :D
const PANDASCORE_TOKEN = process.env.REACT_APP_PANDASCORE_TOKEN;

//const [state, setState] = useState(initialValue);
//setState - method to count(edit/update) || state - can replace with actual control var you want to work with
//([]); - empty array
//when state is changed the component re renders and page doesn't relaod 
//minddump of class notes ^^ ☆*: .｡. o(≧▽≦)o .｡.:*☆
function UpcomingMatches() {
    const [leagues, setLeagues] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState('');
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);


   // ᓚᘏᗢ mind dump from class notes
   //useeffect hook works with fetch function
   //use effect has 2 parameters, and callback
   //1st arg - function that contains code needing to run (below case is the fetching of API)
   //2nd arg - dependency lsit, vars we need to lsiten to, if changed needs to re render.
 useEffect(() => {
        axios.get('https://api.pandascore.co/lol/leagues?per_page=20', {
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

    axios.get(`https://api.pandascore.co/lol/matches/upcoming?filter[league_id]=${selectedLeague}&sort=begin_at&per_page=5`, {
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
                  <div className="teamInfo d-flex flex-row-reverse flex-sm-row align-items-center gap-2">
                    <span className="text-white">{team1.name}</span>
                    {team1.image_url && <img src={team1.image_url} alt={team1.name} className="teamLogo" />}
                  </div>
                  
                  <div className="vsText mx-2 mx-sm-4">V.S</div>
                  
                  <div className="teamInfo d-flex align-items-center gap-2">
                    {team2.image_url && <img src={team2.image_url} alt={team2.name} className="teamLogo" />}
                    <span className="text-white">{team2.name}</span>
                  </div>
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
    </div>
 )
}

export default UpcomingMatches;