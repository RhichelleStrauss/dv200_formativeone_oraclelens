import logo from './logo.svg';
import ColorBends from './components/ColorBends'; 
import GrainientBackground from './components/GrainientBackground';
import './App.css';

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from './pages/Dashboard'
import Comparison from './pages/Comparison'
import Timeline from './pages/Timeline'
import Box from '@mui/material/Box';

import NavSidebar from './components/NavSidebar'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
    
    <Box sx={{ position: 'relative', width: '100vw', height: '100vh', display: 'flex', overflow: 'hidden' }}>
    <Box sx={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <ColorBends
            rotation={255}
            speed={0.2}
            colors={["#f20775", "#730220", "#be5fd9", "#0367A6"]}
            transparent={true}
            autoRotate={0}
            scale={1.9}
            frequency={1}
            warpStrength={0.9}
            mouseInfluence={1}
            parallax={0.5}
            noise={0.1}
          />
        </Box>
    <NavSidebar />
    <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: 3, 
            position: 'relative', 
            zIndex: 1, 
            overflowY: 'auto' //pushes tje content next to sidebar when opened/closed - just how i want to push myself off a bridge
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Comparison" element={<Comparison />} />
            <Route path="/Timeline" element={<Timeline />} />
          </Routes>
        </Box>
    </Box>

    </BrowserRouter>
    //color bends background component with react bits
    //website colors added + shap, width etc modified within react bits then code exported 
    //the js for this is in its own file, and needed to import "npm install three"
    
    
    
    
  );
}

export default App;
