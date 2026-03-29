import * as React from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

//specific MUI icons import
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import TimelineIcon from '@mui/icons-material/Timeline';
import DashboardIcon from '@mui/icons-material/Dashboard';

//hover effect & background gradient from react bits
import SpotlightEffect from './SpotlightEffect'; 
import GrainientBackground from './GrainientBackground';

import myLogo from '../images/OracleLens_logo@8x-8.png'; 
import { Path } from 'ogl';

const theme = createTheme ({
  typography: {
    fontFamily: [
      '"beaufort-pro"',
      'serif',
    ].join(','),

    fontWeightMedium: 500, 
  }
})

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: 'transparent !important',
  
  boxShadow: 'none', 
  backgroundImage: 'none',

  color: '#fff'
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  
  backgroundColor: 'transparent !important', 
  boxShadow: 'none', 
  backgroundImage: 'none',
  color: '#fff'
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center', 
  padding: theme.spacing(2, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',

    backgroundColor: 'transparent !important',
    ...(open && {
      ...openedMixin(theme),
      backgroundColor: 'transparent !important',
      
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      backgroundColor: 'transparent !important',

      '& .MuiDrawer-paper': closedMixin(theme),
      position: 'relative',
    }),
  }),
);

export default function MiniDrawer() {
  const [open, setOpen] = React.useState(false);

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon/>, Path: '/' },
    { text: 'Comparison', icon: <CompareArrowsIcon/>, Path: '/Comparison' },
    { text: 'Timeline', icon: <TimelineIcon/>, Path: '/Timeline' }
  ];

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <Drawer variant="permanent" open={open}>
        <Box sx={{ position: 'absolute', 
          inset: 0, 
          zIndex: -1, 
          overflow: 'hidden', 
          pointerEvents: 'none', 
          width: '100vh',
          opacity: 0.85, }}>


            <GrainientBackground
             color1="#b20636"
    color2="#69021e"
    color3="#69021e"
    timeSpeed={0}
    colorBalance={-0.38}
    warpStrength={1.5}
    warpFrequency={2}
    warpSpeed={0}
    warpAmplitude={80}
    blendAngle={-14}
    blendSoftness={1}
    rotationAmount={840}
    noiseScale={1.75}
    grainAmount={0.1}
    grainScale={1.9}
    grainAnimated={false}
    contrast={1.55}
    gamma={1.2}
    saturation={0.85}
    centerX={-0.78}
    centerY={-0.88}
    zoom={0.9}
            />
           
          </Box>
        <DrawerHeader>
          <Box 
            component="img"
            src={myLogo} 
            alt="Logo"
            onClick={handleToggleDrawer}
            sx={{ 
              width: open ? 120 : 40, 
              cursor: 'pointer', 
              transition: 'width 0.3s ease',
            }}
          />
        </DrawerHeader>
        
        <Divider sx={{ borderColor: 'rgba(219, 30, 81, 0.55)' }} />
        
        <List>

          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block', mb: 3, mx: 'auto', width: '85%', mt: 3 }}>

          <SpotlightEffect 
            spotlightColor="rgba(255, 132, 187, 0.79)" 
            style={{ 
              padding: 0, 
              border: 'none', 
              background: 'transparent'
            }}
          >
          <ListItemButton
          component={Link}
          to={item.Path}
            sx={{
              minHeight: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: open ? 'flex-start' : 'center',
              px: open ? 2 : 0,
              backgroundColor: 'transparent', 
              '&:hover': { backgroundColor: 'transparent' } 
            }}
          >

          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 1 : 0,
              justifyContent: 'center',
              alignItems: 'center',
              color: '#F20775'
            }}
          >
            {item.icon}
          </ListItemIcon>

          <ListItemText primary={item.text} sx={{ 
            opacity: open ? 1 : 0,
            display: open ? 'block' : 'none',
            m: 0
          }}

          slotProps={{
            primary: {
            fontSize: '1.2rem', 
            color: '#F20775',   
            fontWeight: 600,    
            letterSpacing: '1px',
            textTransform: 'uppercase'
         }
         }}
          />

        </ListItemButton>

          </SpotlightEffect> 
          </ListItem>
          ))}
            </List>
          </Drawer>
          

      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        
      </Box>
    </Box>
    </ThemeProvider>
  );
}