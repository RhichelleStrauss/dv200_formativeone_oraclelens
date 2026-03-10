import logo from './logo.svg';
import ColorBends from './components/ColorBends'; 
import './App.css';

function App() {
  return (
    
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <ColorBends
        rotation={255}
        speed={0.2}
        colors={["#f20775","#730220","#be5fd9", "#0367A6"]}
        transparent
        autoRotate={0}
        scale={1.9}
        frequency={1}
        warpStrength={0.9}
        mouseInfluence={1}
        parallax={0.5}
        noise={0.1}
      />
      
      {}
      
    </div>
  );
}

export default App;
