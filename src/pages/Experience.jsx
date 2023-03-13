import React, { useState, useEffect } from "react"
import { Container, Row } from "react-bootstrap";
import { Chrono } from "react-chrono";
import FallbackSpinner from "../components/FallbackSpinner.jsx";
import endpoints from "../app/endpoints.jsx";

import PageTitle from "../components/PageTitle.jsx";

// https://github.com/prabhuignoto/react-chrono#theme


const Experience = () => {

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(endpoints.experiences, {
            method: 'GET',
        }).then((res) => res.json()).then((res) => setData(res))
            .catch((err) => err);
    }, []);
    

    return (
        <>
        <style type="text/css">
            {`
            .my-card {
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
                margin-bottom: 24px;
                padding: 24px;
            }
            
            .my-card-media {
                display: none;
            }
            
            .my-card-subtitle {
                color: #FFCB05;
                font-size: 16px;
                margin-bottom: 8px;
                margin-left: 5px;
            }
            .my-card-text {
                font-size: 18px;
                line-height: 1.5;
                margin-bottom: 16px;
            }
            .my-card-title {
                color: white;
                font-size: 24px;
                margin-bottom: 8px;
                margin-left: 0;
            }
            .my-controls {
            display: none;
            }
            .my-title {
            color: white;
            font-size: 15px;
            font-weight: bold;
            margin-bottom: 24px;
            text-align: center;
            }
            `}
        </style>
        <Container>
            <Row>
                <PageTitle title="Experience" />
            </Row>
            {data ? (
                <Row>
                <Chrono 
                    items={data.experiences} 
                    mode="VERTICAL" 
                    theme={{
                        primary:  '#00274C',
                        secondary: '#1E1E1E',
                        cardBgColor: '#1E1E1E',
                        cardForeColor: 'white',
                        titleColor: 'black',
                        titleColorActive: 'white',
                    }}
                    classNames={{
                        card: 'my-card',
                        cardMedia: 'my-card-media',
                        cardSubTitle: 'my-card-subtitle',
                        cardText: 'my-card-text',
                        cardTitle: 'my-card-title',
                        controls: 'my-controls',
                        title: 'my-title',
                    }}
                    
                />
            </Row>
            ) : <FallbackSpinner />}
        </Container>
        </>
    )
};

export default Experience;


