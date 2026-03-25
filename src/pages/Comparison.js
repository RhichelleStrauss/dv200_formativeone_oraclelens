import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CompareSearchBar from '../components/CompareSearchBar';
import CompareCards from '../components/TeamCard';

function Comparison() {
  return (
    <Container>
      <h2 className="comparePageHead">Compare Teams in LOL esports</h2>
      <Row className='compareLayout' style={{marginTop: '100px'}}>

        {/* setting up layout for 2 teams */}
        <Col className='teamOne'>
        <CompareSearchBar />
        </Col>
      
        {/* setting up layout for 2 teams */}
        <Col className='teamTwo'>
        <CompareSearchBar />
        </Col>
        

      </Row>
      <CompareCards />
      
    </Container>
  );
}

export default Comparison;


