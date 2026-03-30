import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import '../css/PlaystyleDataModal.css';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal className='modalStyle'
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>

        <Modal.Title id="contained-modal-title-vcenter" 
        style={{color: '#F20775', fontSize: '22px', fontFamily: "beaufort-pro" }}>
          Explain Timeline data
        </Modal.Title>

      </Modal.Header>
      <Modal.Body>
        <h4 style={{color: '#F20775', fontSize: '22px', fontFamily: "beaufort-pro" }}>
            Kills per minute
        </h4>

        <p>
         The number of kills
        </p>

         <h4 style={{color: '#F20775', fontSize: '22px', fontFamily: "beaufort-pro" }}>Game 1 Winrate
        </h4>

        <p>
          The winrate of the team when they win the entire series after winning the first game in the series.
        </p>

         <h4 style={{color: '#F20775', fontSize: '22px', fontFamily: "beaufort-pro" }}>Comeback Rate
        </h4>

        <p>
          The winrate of the team when they win the entire series after losing the first game in the series.
          (making a comeback after losing)
        </p>


         <h4 style={{color: '#F20775', fontSize: '22px', fontFamily: "beaufort-pro" }}>SilverScrapes Winrate
        </h4>

        <p>
          SilverScrapes is a league esports term for when a series reaches the tie-breaker game. SilverScrapes
          winrate is the winrate of the team, after reaching silverscrapes and winning the series 
        </p>

         <h4 style={{color: '#F20775', fontSize: '22px', fontFamily: "beaufort-pro" }}>Recent matches volume
        </h4>

        <p>
          Recent matches played volume percent. This percent represents the rate of volume of matches played by the team
          in the past 30 days. This is calculated using the LEC (european league) where they play for 7 weeks, with best of 3
          format, 21 games maximum per team. This then means that the teams percent is the percentage of those maximum games possible.
        </p>


      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function TimelineDataModal() {
  const [modalShow, setModalShow] = React.useState(false);

  return (

    <>
     <p className='playstyleDataModal'
          onClick={() => setModalShow(true)} 
          style={{ 
            color: '#0367A6', 
            paddingBottom: '2px', 
            marginBottom: '15px',
            cursor: 'pointer', 
            textDecoration: 'underline' 
          }}
        >
          ? explain data
        </p>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        dialogClassName="custom-modal-width"
      />
    </>
  );
}

export default TimelineDataModal;