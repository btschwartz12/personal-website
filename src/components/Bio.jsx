import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Slide from 'react-reveal/Slide';
import TextBody from './TextBody';



const styles = {
    introTextContainer: {
        margin: 15,
        flexDirection: 'column',
        whiteSpace: 'pre-wrap',
        textAlign: 'left',
        fontSize: '1.05em',
        fontWeight: 500,
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
        overflowWrap: 'break-all',
    },
    introImageContainer: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        maxWidth: '90%',
    },
    image: {
        maxWidth: '90%',
        // make rounded edges
        borderRadius: '7%',
    },
    
};



const Bio = ({ data, matches }) => {

    if (matches) {
        return (
            <Row>
                <Col style={styles.introTextContainer}>
                    <Slide left>
                        <TextBody text={data?.about} />
                    </Slide>
                </Col>
                <Col style={styles.introImageContainer}>
                    <Slide right>
                        <img style={styles.image} src={data?.imageSource} alt="profile" />
                    </Slide>
                </Col>
            </Row>
        );
    }
    else {
        return (
            <>
            <Slide left>
                <img style={styles.image} src={data?.imageSource} alt="profile" />
            </Slide>
            <Slide right>
                <div style={styles.introTextContainer}>
                    <TextBody text={data?.about} />
                </div>
            </Slide>
            </>
        );
    }
};

export default Bio;