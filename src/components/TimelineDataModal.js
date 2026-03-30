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
                    style={{ color: '#F20775', fontSize: '22px', fontFamily: "beaufort-pro" }}>
                    Explain Timeline data
                </Modal.Title>

            </Modal.Header>
            <Modal.Body>
                <h4 style={{ color: '#F20775', fontSize: '22px', fontFamily: "beaufort-pro" }}>
                    Kills per minute/KDA ratio
                </h4>

                <p>
                    The number of kills divided by the length of game is equal to the kills per minute for the team.
                    <br />KDA is kills, deaths
                    assists and the ratio is calculated by adding kills and assists then dividing by deaths.
                </p>

                <h4 style={{ color: '#F20775', fontSize: '22px', fontFamily: "beaufort-pro" }}>Dragon Control Rate (%)/total kilss
                </h4>

                <p>
                    The teams dragon control rate adds the team selecteds number of dragons to the enemys, then calculating what percentage team 1
                    got.
                    <br />
                    The total kills by 1 player across 20 games, in each game.
                </p>

                <h4 style={{ color: '#F20775', fontSize: '22px', fontFamily: "beaufort-pro" }}>Gold Diff Per Minute (k)/CreepScore
                </h4>

                <p>
                    Teams gold diff adds team and enemy gold together, then subtracts the enemy to find the difference, which then is divided by 1000.
                    <br />
                    CreepScore is what players get when killing minions, the higher the CS the better, and the more money.
                </p>


                <h4 style={{ color: '#F20775', fontSize: '22px', fontFamily: "beaufort-pro" }}>Tower Difference/Gold Earned
                </h4>

                <p>
                    The towers in each lane between enemy and team are added, then enemy team gets subtracted to find the difference.
                    <br />
                    The gold earned by a single player across 20 games.
                </p>

                <h4 style={{ color: '#F20775', fontSize: '22px', fontFamily: "beaufort-pro" }}>Side Performance (Blue +1, Red -1)/Total Damage to champions
                </h4>

                <p>
                    The Side performance of the team, in LoL it is said red side is more difficult to win on so this sees if they're dominant on which side
                    <br />
                    win on blue = +1, win on red = +0.5
                    <br />
                    lose on blue = -1, lose on red = -0.5
                    <br />
                    The total damage a player did to the enemy team across 20 games.
                </p>


            </Modal.Body>
            <Modal.Footer>
                <Button className='timelineButton' onClick={props.onHide}

                >Close
                </Button>


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