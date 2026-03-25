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

const CssTextField = styled(TextField)({
    '& label': {
        color: '#fb9dc7',
        fontFamily: '"beaufort-pro", serif',
    },
  '& label.Mui-focused': {
    color: '#fb9dc7',
  },
  '& .MuiInputBase-input':{
    color: '#fb9dc7',
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


export default function CompareSearchBar() {
  return (
    <Box
      component="form"
      noValidate
      sx={{ display: 'flex', 
        alignItems: 'center',
        
        gap: 2 }}
    >
        <Typography
        className='searchBarTitle'
        sx={{
            margin: 0,
            fontFamily: 'beaufort-pro',
            lineHeight: 1,
            whiteSpace: 'nowrap'
        }}
        >
          Team 1   
        </Typography>
        
      <CssTextField label="Search Team" id="custom-css-outlined-input" />
      
    </Box>
  );
}


