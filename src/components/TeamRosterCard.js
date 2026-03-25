import Card from 'react-bootstrap/Card';

function TeamCard() {
  
  return (
    <Card style={{
      width: '100%',
      backgroundColor: '#0f0a1fd7',
      border: '1px solid #fb9dc7b2',
      borderRadius: '4px',
      marginTop: '60px',
      fontFamily: 'beaufort-pro'
    }}
      className="shadow-lg"
    >
      <div className="d-flex justify-content-center"
        style={{
          marginTop: '-40px'
        }}>

        <div
          style={{
            padding: '10px 20px',
            borderRadius: '4px'
          }}
        >
          <img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKugIg0EWQJTK_DmBNCnif3QypizNVBouG1Q&s'
            // placeholder
            style={{ width: '100px', height: 'auto', objectFit: 'contain', borderRadius: '4px' }}
          />
        </div>
      </div>


      <Card.Body className= "p-2 pt-2" style={{marginBottom: '10px'}} >

        <div style={{
          display: 'grid',
          gridTemplateColumns: '120px 1fr',
          gap: '10px',
          fontSize: '16px'
        }}>

          <div style={{color: '#F20775', fontWeight: '400', fontFamily: "helvetica-neue-lt-pro" }}>Team Name: </div>
          <div className='teamText'></div>

          <div style={{color: '#F20775', fontWeight: '400', fontFamily: "helvetica-neue-lt-pro" }}>Acronym: </div>
          <div className='teamText'></div>

          <div style={{color: '#F20775', fontWeight: '400', fontFamily: "helvetica-neue-lt-pro" }}>Region: </div>
          <div className='teamText'></div>

          <div style={{color: '#F20775', fontWeight: '400', fontFamily: "helvetica-neue-lt-pro" }}>League: </div>
          <div className='teamText'></div>

        
        </div>
      </Card.Body>
    </Card>
  );
}

export default TeamCard;