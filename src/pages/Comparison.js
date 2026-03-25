import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CompareSearchBar from '../components/CompareSearchBar';

import TeamCard from '../components/TeamCard';

function Comparison() {
  return (
    <Container>
      <h2 className="comparePageHead">Compare Teams in LOL esports</h2>


      <Row className="compareLayout justify-content-center" style={{marginTop: '100px', gap: '40px'}}>

        {/* setting up layout for 2 teams */}
        <Col xs={12} md={5} className="teamOne d-flex flex-column align-items-start">

        <div style={{ marginBottom: '20px'}}>
        <CompareSearchBar />
        </div>

        <div style={{width: '100%'}}>
        <TeamCard />
        </div>
        </Col>
      
        {/* setting up layout for 2 teams */}
          <Col xs={12} md={5} className="teamTwo d-flex flex-column align-items-start">

        <div style={{ marginBottom: '20px'}}>
        <CompareSearchBar />
        </div>

        <div style={{width: '100%'}}>
        <TeamCard />
        </div>
        </Col>
        

      </Row>
     
      
    </Container>
  );
}

export default Comparison;


