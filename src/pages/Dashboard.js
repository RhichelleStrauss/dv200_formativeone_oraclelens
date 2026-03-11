import React from 'react';
import HeroSection from '../components/HeroSection';
import '../css/Dashboard.css';
import UpcomingMatches from '../components/UpcomingMatches';

function Dashboard() {
  return (
    
    <div className="p-4 w-100"> 
      <h2 className="mb-4 DashboardHead">
        Welcome to Oracle lens!
      </h2>
      
      <HeroSection />

       <h2 className="mb-4 UpcomingHead">
        Upcoming Matches
      </h2>

    <UpcomingMatches/>

    </div>
  );
}

export default Dashboard;
