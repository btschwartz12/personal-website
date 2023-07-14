import { useState, useEffect, } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Fade } from 'react-awesome-reveal';
import ProjectCard from './ProjectCard.jsx';
import FallbackSpinner from './FallbackSpinner.jsx';



import React from "react";
import PageTitle from './PageTitle.jsx';


const styles = {
    containerStyle: {
        marginBottom: 25,
    },
    showMoreStyle: {
        margin: 25,
    },
    filterButtonStyle: {
        marginRight: 10,
        marginTop: 10,
    },
    selectedFilterButtonStyle: {
        backgroundColor: '#00274C',
        color: "#fff",
        borderColor: '#00274C',
    }
};

const CardView = (props) => {

    const { pageTitle, cards, categories, page } = props;

    const [showMore, setShowMore] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [filteredData, setFilteredData] = useState([]);

    const [featuredFilteredData, setFeaturedFilteredData] = useState([]);
    const [nonFeaturedFilteredData, setNonFeaturedFilteredData] = useState([]);

    // append All to the beginning of categories
    const buttons = ['All', ...categories];
    useEffect(() => {
    let filtered;
    if (cards) {
        if (selectedCategory === "All") {
            filtered = cards;
        } else if (selectedCategory === "Featured") {
            filtered = cards.filter((card) => card.is_featured);
        } else {
            filtered = cards.filter((card) => card.category === selectedCategory);
        }
    } else {
        filtered = [];
    }
    if (page === 'projects') {
        const priorityLevels = {};
        // Group cards by priority level
        filtered.forEach((card) => {
            if (!priorityLevels[card.priority]) {
                priorityLevels[card.priority] = [];
            }
            priorityLevels[card.priority].push(card);
        });
        // Randomly sort each priority level and concatenate the results
        const randomized = Object.keys(priorityLevels).flatMap((priority) => {
            return priorityLevels[priority].sort(() => Math.random() - 0.5);
        });
        filtered = randomized;
        setFeaturedFilteredData(filtered.filter((card) => card.is_featured));
        setNonFeaturedFilteredData(filtered.filter((card) => !card.is_featured));
    }
    setFilteredData(filtered);
    
    }, [cards, selectedCategory, page]);


    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
    };

    
    const filterButtons = buttons.map((button) => (
        <Button
            key={button}
            variant={selectedCategory === button ? 'light' : "outline-secondary"}
            style={selectedCategory === button ? { ...styles.filterButtonStyle, ...styles.selectedFilterButtonStyle } : styles.filterButtonStyle}
            onClick={() => handleCategoryFilter(button)}
        >
            {button}
        </Button>
    ));

    const featuredCards = cards.filter((card) => card.is_featured);
    const moreLimit = featuredCards.length > 0 ? featuredCards.length : 6;
    const numberOfItems = showMore && filteredData ? filteredData.length : moreLimit;



    return (
        <Container className="About-header">
            <Row>
                <PageTitle title={pageTitle} subtitle={selectedCategory}/>
                {/* <PageTitle title={pageTitle + ' \u2192 ' + selectedCategory}/> */}
            </Row>
            {page === 'projects' && (
                <Row>
                    <div style={{backgroundColor: '#FFCB05', borderRadius: 10, padding: 10, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'black'}}>
                        <p style={{fontWeight: 'bold', color: 'black', margin: 0}}>
                            Check out my <a href="https://github.com/btschwartz12" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'blue'}}>GitHub</a> for more of my projects!
                        </p>
                    </div>
                </Row>
            
            )}

            <Row className="mb-5 mt-3 pt-md-3">
                <Col lg="6" className="text-right">
                    {filterButtons}
                </Col>
            </Row>
            
            
            {cards
                ? (
                <div className="section-content-container">
                    <Container style={styles.containerStyle}>
                    {page === 'projects' ? (
                        <>
                        {featuredFilteredData.length > 0 && (
                            <Row xs={1} sm={1} md={1} lg={1} className="g-4">
                                <Fade >
                                {featuredFilteredData.map((project) => (
                                    <ProjectCard key={project.title} project={project} />
                                ))}
                                </Fade>
                            </Row>
                        )}
                        <br/>
                        {nonFeaturedFilteredData.length > 0 && (
                            <Row xs={1} sm={1} md={2} lg={3} className="g-4">
                                <Fade >
                                {nonFeaturedFilteredData.slice(0, numberOfItems).map((project) => (
                                    <ProjectCard key={project.title} project={project} />
                                ))}
                                </Fade>
                            </Row>
                        )}
                        </>
                    ):
                    (
                        <>
                        <Row xs={1} sm={1} md={2} lg={3} className="g-4">
                        <Fade >
                        {filteredData.slice(0, numberOfItems).map((project) => (
                        
                            <ProjectCard key={project.title} project={project} 
                            />
                        
                        ))}
                        </Fade>
                        </Row>
                        </>
                    )}
                    

                    {!showMore
                        && 
                        filteredData.length > moreLimit
                        &&
                        (
                        <Button
                        style={styles.showMoreStyle}
                        variant={'light'}
                        onClick={() => setShowMore(true)}
                        >
                        show more
                        </Button>
                        )}
                    </Container>
                </div>
                ) : <FallbackSpinner /> 
            }
        </Container>
    );
};

export default CardView;

