import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>

        <Modal.Title id="contained-modal-title-vcenter">
          Explain Data
        </Modal.Title>

      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal
        </h4>

        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function PlaystyleDataModal() {
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
      />
    </>
  );
}

export default PlaystyleDataModal;