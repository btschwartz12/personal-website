import React from 'react';
import {
    Button, Modal
} from 'react-bootstrap';
import TextBody from './TextBody';

const styles = {
    modalHeader: {
        backgroundColor: '#00274C',
        color: 'white',
    },
    modalBody: {
        backgroundColor: '#00274C',
        color: 'white',
    },
    modalFooter: {
        backgroundColor: '#00274C',
        color: 'white',
        borderTop: 'none',
    },
};

const CardModal = (props) => {
    const { show, handleClose, data, isGif } = props;
    return (
        <Modal 
            show={show} 
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
        >
            {isGif ? (
                <>
                <Modal.Header style={styles.modalHeader} closeButton>
                    <Modal.Title>{data.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={styles.modalBody}>
                    <img src={data.gif} alt={data.title} style={{width: '100%'}} />
                </Modal.Body>
                <Modal.Footer style={styles.modalFooter}>
                <Button
                        variant="secondary"
                        style={styles.closeButton}
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                </Modal.Footer>
                </>
            ) : (
                <>
                <Modal.Header style={styles.modalHeader} closeButton>
                    <Modal.Title>{data.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={styles.modalBody}>
                    <TextBody text={data.body} />
                    {/* {data.body} */}
                </Modal.Body>
                <Modal.Footer style={styles.modalFooter}>
                <Button
                        variant="secondary"
                        style={styles.closeButton}
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                </Modal.Footer>
                </>
            )}
            
        </Modal>
    );
};


export default CardModal;