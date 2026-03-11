import '../css/HeroSection.css'
import Card from 'react-bootstrap/Card';

function HeroSection() {
  return (
    <Card className="text-start HeroSectionCard">
      <Card.Body>
        <Card.Text>
          The story of the season isn't just told on the main stage; it’s written in the stats. Oracle Lens is your definitive archive for competitive league data. Dive deep into the post-match numbers to analyze past performances, compare historical team stats side-by-side, and see exactly how the top rosters stack up against each other. By breaking down past match data, tracking active player rosters, and keeping an eye on the upcoming schedule, you have everything you need to understand the meta and predict the next champions.
        </Card.Text>
      </Card.Body>
      
    </Card>
  );
}

export default HeroSection;