import logo from './logo.svg';
import ColorBends from './components/ColorBends'; 
import './App.css';

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from './pages/Dashboard'
import Comparison from './pages/Comparison'
import Timeline from './pages/Timeline'

import NavSidebar from './components/NavSidebar'

function App() {
  return (
    
    //color bends background component with react bits
    //website colors added + shap, width etc modified within react bits then code exported 
    //the js for this is in its own file, and needed to import "npm install three"
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>

    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
      <ColorBends
        rotation={255}
        speed={0.2}
        colors={["#f20775","#730220","#be5fd9", "#0367A6"]}
        transparent={true}
        autoRotate={0}
        scale={1.9}
        frequency={1}
        warpStrength={0.9}
        mouseInfluence={1}
        parallax={0.5}
        noise={0.1}
      />
      </div>
      
      {}
       {/* <BrowserRouter>
      <nav>
        <Link to="/">Dashboard</Link>  |
        <Link to="/Comparison">About</Link>
        <Link to="/Timeline">Contact</Link>  |
        
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Comparison" element={<Comparison />} />
        <Route path='/Timeline' element={<Timeline/>}/>
      </Routes>
    </BrowserRouter> */}
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 999, display: 'flex' }}></div>
<NavSidebar />
    </div>
    
  );
}

export default App;
