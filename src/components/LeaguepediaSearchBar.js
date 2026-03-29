


import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import '../css/CompareSearchBar.css';

import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Autocomplete, CircularProgress } from '@mui/material';

const CssTextField = styled(TextField)({
  '& label': { color: '#e2d9cbd5', fontFamily: '"helvetica-neue-lt-pro", sans-serif' },
  '& label.Mui-focused': { color: '#fb9dc7' },
  '& .MuiInputBase-input': { color: '#E2D9CB' },
  '& .MuiInput-underline:after': { borderBottomColor: '#fb9dc7' },
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#0f0a1fd7', 
    '& fieldset': { borderColor: '#fb9dc7' },
    '&:hover fieldset': { borderColor: '#fb9dc7' },
    '&.Mui-focused fieldset': { borderColor: '#fb9dc7' },
  },
});

function LeaguepediaSearchBar({ label, onTeamSelect, searchMode = 'team' }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTeam, setSearchTeam] = useState(''); 

  useEffect(() => {
    setSearchTeam('');
    setOptions([]);
  }, [searchMode]);

  useEffect(() => {
    if (searchTeam === '') {
      setOptions([]);
      return;
    }

   
    if (searchMode === 'player' && searchTeam.length < 3) {
      setOptions([]);
      return;
    }
    
    setLoading(true);
    
    const timeout = setTimeout(() => {
      // 1. Define the dynamic variables
      const targetTable = searchMode === 'player' ? 'Players' : 'Teams';
      const targetFields = searchMode === 'player' ? 'ID, Team' : 'Name, Short';
      const targetWhere = searchMode === 'player' 
        ? `ID LIKE '%${searchTeam}%'`
        : `LOWER(Name) LIKE LOWER('%${searchTeam}%') OR LOWER(Short) LIKE LOWER('%${searchTeam}%')`;

      
      axios.get(`http://localhost:5000/api/cargo`, {
        params: {
          format: 'json',
          tables: targetTable, 
          fields: targetFields, 
          where: targetWhere,
          limit: 15
        }
      })
      .then(response => {
        if (response.data.error) {
          console.error("Leaguepedia API complained:", response.data.error.info);
          setLoading(false);
          return;
        }

        const cargoData = response.data.cargoquery || [];
        
        const results = cargoData.map(item => {
          if (searchMode === 'player') {
            return {
              name: item.title.ID || item.title.id,
              short: item.title.Team || item.title.team, 
              id: item.title.ID || item.title.id 
            };
          } else {
            return {
              name: item.title.Name || item.title.name,
              short: item.title.Short || item.title.short,
              id: item.title.Name || item.title.name 
            };
          }
        });
        
        const validResults = results.filter(res => res.name);
        const uniqueResults = Array.from(new Set(validResults.map(a => a.name)))
          .map(name => validResults.find(a => a.name === name));

        setOptions(uniqueResults);
        setLoading(false);
      })
      .catch(err => {
        console.error("Leaguepedia Search Error:", err);
        setLoading(false);
      });
    }, 500); 

    return () => clearTimeout(timeout);
  }, [searchTeam, searchMode]);
    
  return(
    <div className="d-flex align-items-center">
      <Typography sx={{ margin: 0, fontFamily: 'beaufort-pro', color: '#04D9D9', fontSize: '1.1rem', marginRight: '10px' }}>
        {label}
      </Typography>

      <Autocomplete
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option.short ? `${option.name} (${option.short})` : option.name || ""}
        options={options}
        loading={loading}
        onChange={(event, newValue) => {
          if (typeof onTeamSelect === 'function') {
            onTeamSelect(newValue);
          }
        }}
        onInputChange={(event, newInputValue) => setSearchTeam(newInputValue)}
        renderInput={(params) => (
          <CssTextField 
            {...params} 
            label={searchMode === 'player' ? "Search Player" : "Search Team"} 
            size="small"
            sx={{ width: '280px' }} 
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }} 
          /> 
        )}
      />
    </div>
  )
}

export default LeaguepediaSearchBar;