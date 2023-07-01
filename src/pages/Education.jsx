import { useState, useEffect } from 'react';
import getEndpoints from '../app/endpoints.jsx';
import FallbackSpinner from '../components/FallbackSpinner.jsx';



import React from "react";
import CardView from '../components/CardView.jsx';
import { HelmetProvider } from "react-helmet-async";
import MyHelmet from '../components/MyHelmet.jsx';




const Education = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        getEndpoints().then((endpoints) => {
            fetch(endpoints.education, {
                method: 'GET',
            })
                .then((res) => res.json())
                .then((res) => setData(res))
                .catch((err) => err);
        });
        
    }, []);

    const categories = ['Courses', 'Certificates']
    const pageTitle = 'Education'
    return (
        <HelmetProvider>
        {data ? (
            <>
            <MyHelmet 
                title={data.meta.title} 
                description={data.meta.description}
            />
            <CardView
                cards={data.education}
                categories={categories}
                pageTitle={pageTitle}
                page="education"
            />
            </>
        ): <FallbackSpinner />}
        
        </HelmetProvider>
        
    );
};

export default Education;