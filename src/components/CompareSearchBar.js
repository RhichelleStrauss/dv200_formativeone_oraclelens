// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import '../css/CompareSearchBar.css';

// export default function CompareSearchBar() {
//   return (
//     <Box
//       component="form"
//       sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
//       noValidate
//       autoComplete="off"
//     >
//       <TextField className='searchBar' id="outlined-basic" label="Team 1" variant="outlined" />
      
//     </Box>
    
//   );
// }
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { color } from 'three/src/nodes/tsl/TSLCore.js';
import Typography from '@mui/material/Typography';
import '../css/CompareSearchBar.css';

import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Autocomplete, CircularProgress } from '@mui/material';

//env hidden token
//environment var manage my secrets aka API key
//.env is not in src, and is put in .gitignore(i think, google & AI helped(by explaining it to me like im stupid) and i implemented)
//these comments are simply for my understanding otherwise i dont know whats going on :D
const PANDASCORE_TOKEN = process.env.REACT_APP_PANDASCORE_TOKEN;



const CssTextField = styled(TextField)({
    '& label': {
        color: '#e2d9cbd5',
        fontFamily: '"helvetica-neue-lt-pro", sans-serif',
        
    },
  '& label.Mui-focused': {
    color: '#fb9dc7',
  },
  '& .MuiInputBase-input':{
    color: '#E2D9CB',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#fb9dc7',
  },
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#0f0a1fd7', 

    '& fieldset': {
      borderColor: '#fb9dc7',
    },
    '&:hover fieldset': {
      borderColor: '#fb9dc7',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#fb9dc7',
    },
    
  },
});

function CompareSearchBar({ label, onTeamSelect }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTeam, setSearchTeam] = useState(''); // State is named searchTeam

  useEffect(() => {
    if (searchTeam === '') {
      setOptions([]);
      return;
    }

    setLoading(true);

    const timeout = setTimeout(() => {
      axios.get(`https://api.pandascore.co/lol/teams?search[name]=${searchTeam}&per_page=100`, {
        headers: { Authorization: `Bearer ${PANDASCORE_TOKEN}`}
      })
      .then(response => {
        setOptions(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("cannot get teams (っ °Д °;)っ", err);
        setLoading(false);
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchTeam]);
    
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
        getOptionLabel={(option) => option.name || ""}
        options={options}
        loading={loading}
        onChange={(event, newValue) => onTeamSelect(newValue)}
        
        onInputChange={(event, newInputValue) => setSearchTeam(newInputValue)}
        renderInput={(params) => (
          <CssTextField 
            {...params} 
            label="Search Team" 
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
export default CompareSearchBar;

// export default function CompareSearchBar() {
//   return (
//     <Box
//       component="form"
//       noValidate
//       sx={{ display: 'flex', 
//         alignItems: 'center',
        
//         gap: 2 }}
//     >
//         <Typography
//         className='searchBarTitle'
//         sx={{
//             margin: 0,
//             fontFamily: 'beaufort-pro',
//             lineHeight: 1,
//             whiteSpace: 'nowrap'
//         }}
//         >
//           Team 1   
//         </Typography>
        
//       <CssTextField label="Search Team" 
//       id="custom-css-outlined-input"
//       size="small"
//       sx={{ width: '300px'}} />
      
//     </Box>
//   );
// }


