import Card from 'react-bootstrap/Card';

function TeamCard() {
  return (
    <Card style={{ 
      width: '18rem',
      backgroundColor: '#0f0a1fd7',
      border: '1px solid #fb9dc7b2',
      borderRadius: '4px',
      marginTop: '60px',
      fontFamily: 'beaufort-pro' }}>


      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default TeamCard;