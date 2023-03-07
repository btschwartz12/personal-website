import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import endpoints from '../app/endpoints';
import { useMediaQuery } from 'usehooks-ts';
import Bio from '../components/Bio';
import AboutIcons from '../components/AboutIcons';
import FallbackSpinner from '../components/FallbackSpinner';
import { Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle';


import { HelmetProvider } from 'react-helmet-async';
import MyHelmet from '../components/MyHelmet';



const styles = {
  separator: {
    borderTop: '1px solid #d3d3d3',
    margin: '32px 0',
  },

  sectionContentContainer: {
    marginTop: '64px',
    maxWidth: '1000px',
    margin: '0 auto',
    flex: '1 0 auto',
    position: 'relative',
    width: '100%',
    transition: 'all .5s ease-in',
  },
  
};

const About = () => {
  const [data, setData] = useState(null);
  const [homeData, setHomeData] = useState(null);
  const matches = useMediaQuery('(min-width: 1000px)');

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    }).then((res) => res.json()).then((res) => setData(res))
      .catch((err) => err);
  }, []);

  useEffect(() => {
      fetch(endpoints.home, { method: 'GET', })
        .then((res) => res.json()).then((res) => setHomeData(res))
        .catch((err) => err);
  }, []);


  

  return (
    <HelmetProvider>
    <div style={styles.sectionContentContainer}>
        <Container>
          <Row>
            <PageTitle title="Ben Schwartz" />
          </Row>
            {data ? (
              <Row className="justify-content-center">
                  <MyHelmet 
                    title={data.meta.title} 
                    description={data.meta.description}
                  />
              
              <Bio data={data} matches={matches}/>
              </Row>
            ) : <FallbackSpinner />}

          <Row>
            <div className="d-flex flex-wrap justify-content-center">
                {homeData ? (
                  <>
                    {homeData.buttons.map((item) => (
                    item.name !== 'Me' &&
                    <Link to={item.route} key={item.name} target={item.type === "link" ? "_blank" : "_self"} className="text_2">
                      <div id={item.id} className="ac_btn btn ">
                        {item.name}
                        <div className="ring one"></div>
                        <div className="ring two"></div>
                        <div className="ring three"></div>
                      </div>
                    </Link>
                  ))}
                  </>
                ) : <FallbackSpinner />}
            </div>
          </Row>
          <hr style={styles.separator} />
          <Row>
          {data ? (
            <AboutIcons icons={data.icons}/>
          ) : <FallbackSpinner />}
          </Row>
        </Container>
    </div>
    </HelmetProvider>
  );
};

export default About;