import React, { useState } from 'react';
import {
    Button, Card, Badge, Col
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import TextBody from './TextBody';
import CardModal from './CardModal';

const styles = {

    badgeStyle: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        margin: 5,
    },
    cardStyle: {
        borderRadius: 10,
        backgroundColor: '#060606',
        borderColor: '#ffffff20',
    },
    cardTitleStyle: {
        marginTop: 20,
        fontSize: 24,
        fontWeight: 700,
        color: 'white',
    },
    cardTextStyle: {
        textAlign: 'left',
        color: 'gray',
    },
    linkStyle: {
        textDecoration: 'none',
        padding: 10,
    },
    buttonStyle: {
        margin: 5,
    },
    bubbleStyle: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: '5px 10px',
        borderRadius: '0 10px 0 10px',
        fontSize: 14,
        fontWeight: 'bold',
    },
    closeButton: {
        marginLeft: 'auto',
    },
    cardFooter: {
        backgroundColor: '#181818',
    },
    
};

const badgeColors = {
    white: 'light',
    yellow: 'warning',
    green: 'success',
    blue: 'primary',
    cyan: 'info',
    red: 'danger',
    gray: 'secondary'
};


const ProjectCard = (props) => {

    const [show, setShow] = useState(false); // for modal
    const [gifShow, setGifShow] = useState(false); // for gif modal

    const onLinkClick = (linkData) => {
        if (!linkData.is_modal) {
            window.open(linkData.data, '_blank');
        }
        else {
            setShow(true);
        }
    };

    const { project } = props;

    return (
        <Col>
            <Card
                style={{
                    ...styles.cardStyle,
                }}
                text='light'
            >
                {project.bubble?.exists ? (
                    <div
                        style={{
                        ...styles.bubbleStyle,
                        color: project.bubble.text_color,
                        backgroundColor: project.bubble.background_color,
                        }}
                    >
                        {project.bubble.text}
                    </div>
                    ) : project?.gif ? (
                    <div
                        style={{
                        ...styles.bubbleStyle,
                        borderRadius: '0 0 0 10px',
                        color: '#FFFFFF',
                        backgroundColor: 'maroon',
                        }}
                    >
                        Click Me!
                    </div>
                ) : null}
                <Card.Img 
                    variant="top" 
                    src={project?.image} 
                    onClick={() => setGifShow(true)}
                />
                <Card.Body>
                    <Card.Title style={styles.cardTitleStyle}>{project.title}</Card.Title>
                    <Card.Text style={styles.cardTextStyle}>
                        <TextBody text={project.bodyText} />
                    </Card.Text>
                </Card.Body>

                <Card.Body>
                    {project?.links?.map((link) => (
                        <>
                        <Button
                            key={link.data}
                            style={styles.buttonStyle}
                            variant={'outline-light'}
                            onClick={() => onLinkClick(link)}
                        >
                            {link.text}
                        </Button>
                        {link.is_modal && (
                            <CardModal
                                show={show}
                                handleClose={() => setShow(false)}
                                data={link.data}
                                isGif={false}
                            />
                        )}
                        </>
                    ))}
                    {(project?.gif && project.gif !== "") && (
                        <>
                        <Button
                            key={project.gif}
                            style={styles.buttonStyle}
                            variant={'outline-light'}
                            onClick={() => setGifShow(true)}
                        >
                            GIF
                        </Button>
                        <CardModal
                            show={gifShow}
                            handleClose={() => setGifShow(false)}
                            data={{gif: project.gif, title: project.title}}
                            isGif={true}
                        />
                        </>
                    )}
                </Card.Body>
                {project.tags && (
                    <Card.Footer style={styles.cardFooter}>
                        {project.tags.map((tag) => (
                    <Badge
                        key={tag.text}
                        pill
                        bg={badgeColors[tag.color]}
                        text='dark'
                        style={styles.badgeStyle}
                    >
                        {tag.text}
                    </Badge>
                ))}
                        
                    </Card.Footer>
                )}
            </Card>
        </Col>
    );
};
    ProjectCard.propTypes = {
    project: PropTypes.shape({
        title: PropTypes.string.isRequired,
        bodyText: PropTypes.string.isRequired,
        image: PropTypes.string,
        links: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string.isRequired,
            is_modal: PropTypes.bool,
            data: PropTypes.any.isRequired,
        })),
        tags: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string.isRequired,
            color: PropTypes.string.isRequired,
        })),
    }).isRequired,
    };

export default ProjectCard;
