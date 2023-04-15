import { Navbar, Nav, Container } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import withRouter from '../hooks/withRouter.jsx';
import endpoints from '../app/endpoints.jsx';
import ContactPopup from './ContactPopup.jsx';
import { Link } from 'react-router-dom';
import { socialIconsImages } from './SocialIcons.jsx';

import { Slide, JackInTheBox, Zoom } from 'react-awesome-reveal';

const styles = {
  navbarCustom: {
    fontFamily: 'Arial',
    backgroundColor: '#00274C'
  },
  navLink: {
    fontFamily: 'Arial',
    padding: '0 12px',
    display: 'flex',
    margin: '5px',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    color: 'white',
  },
};




const NavBar = () => {
  const [data, setData] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const [socialIcons, setSocialIcons] = useState(null);

  useEffect(() => {
      fetch(endpoints.social, {
          method: 'GET',
      })
          .then((res) => res.json())
          .then((res) => setSocialIcons(res.navbar))
          .catch((err) => err);
  }, []);

  useEffect(() => {
    fetch(endpoints.navbar, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);


  const handleLinkClick = () => {
    setExpanded(false);
  };

  const specialHandleLinkClick = () => {
    setExpanded(false);
    if (window.location.pathname === process.env.BASE_NAME) {
      window.location.reload();
    }
  };

  return (
    <Navbar
      fixed="top"
      bg="custom"
      variant="dark"
      className="navbar-custom"
      collapseOnSelect
      expand={false}
      expanded={expanded}
      onToggle={(expanded) => setExpanded(expanded)}
      style={styles.navbarCustom}
    >
      <Container>
        <JackInTheBox>
        <Navbar.Brand>
          <Link to="https://btschwartz.com/" className="text_2" onClick={specialHandleLinkClick}>
          <img
            alt=""
            src={data?.logo?.source}
            width={data?.logo?.width}
            height={data?.logo?.height}
            className="d-inline-block align-top"
          />{' '}
          </Link>
        </Navbar.Brand>
        </JackInTheBox>

        <Slide direction='down'>
        <Navbar.Brand >
          <>
          {socialIcons?.github && (
            <a href={socialIcons.github} target="_blank" rel="noopener noreferrer" style={{marginRight: 10}}>
              <socialIconsImages.github />
            </a>
          )}
          <ContactPopup />
          {socialIcons?.linkedin && (
            <a href={socialIcons.linkedin} target="_blank" rel="noopener noreferrer" style={{marginLeft: 10}}>
              <socialIconsImages.linkedin />
            </a>
          )}
          </>
        </Navbar.Brand>
        </Slide>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav >
            <Zoom cascade duration='200'>
            {data?.sections?.map((section, index) => (
              <Link to={section.href} key={section.title} target={section.type === "link" ? "_blank" : "_self"} className="text_2" onClick={handleLinkClick}>
                <div id={index} style={styles.navLink} >
                  {section.title}
                </div>
              </Link>
            ))}
            </Zoom>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const NavBarWithRouter = withRouter(NavBar);
export default NavBarWithRouter;
