import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';


import SpotlightEffect from './SpotlightEffect'; 

import myLogo from '../images/logo maybe@8x-8.png'; 

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: '#1a1a1a', 
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
  backgroundColor: '#1a1a1a',
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
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const [open, setOpen] = React.useState(false);

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <Drawer variant="permanent" open={open}>
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
        
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />
        
        <List>
          {['Dashboard', 'Comparison', 'Timeline'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block', mb: 0.5 }}>
              
              {}
              <SpotlightEffect 
                spotlightColor="rgba(255, 255, 255, 0.2)" 
                style={{ 
                  padding: 0, 
                  border: 'none', 
                  background: 'transparent'
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    backgroundColor: 'transparent', 
                    '&:hover': { backgroundColor: 'transparent' } 
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: '#fff'
                    }}
                  >
                    {index === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </SpotlightEffect> 
              {}

            </ListItem>
          ))}
        </List>
      </Drawer>

      {}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {}
      </Box>
    </Box>
  );
}