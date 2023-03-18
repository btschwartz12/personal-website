import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import endpoints from "../app/endpoints.jsx";
import MyHelmet from "../components/MyHelmet.jsx";
import { Slide, Fade } from "react-awesome-reveal";


const styles = {
  bodyStyle: {
    fontFamily: "Arial",
    color: "white",
    marginBottom: "30px"
  },
};


const Home = () => {

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(endpoints.home, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((res) => setData(res))
            .catch((err) => err);
    }, []);

  return (
    <HelmetProvider>
      <section id="home" className="home">
        {data ? (
        <div>
          <MyHelmet 
            title={data.meta.title} 
            description={data.meta.description}
          />
          <div className="intro_sec d-block d-lg-flex align-items-center ">
            <div
              className="h_bg-image order-1 order-lg-2 h-100"
              style={{
                backgroundImage: `url(${data.img_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: "relative",
                zIndex: 1,
              }}
            >
              <img
                src={data.img_url}
                alt="lazy loaded background"
                loading="lazy"
                style={{ visibility: "hidden", position: "absolute" }}
              />
            </div>
            <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center">
              <div className="align-self-center ">
                <div className="intro mx-auto">
                
                  <Slide direction="left" >
                    <h2 className="mb-1x">{data.greetings}</h2>
                  </Slide>
                  
                  <Slide direction="right">
                    <h1 className="fluidz-48 mb-1x">
                      <Typewriter
                        options={{
                          strings: data.animated_text,
                          autoStart: true,
                          loop: true,
                          deleteSpeed: 5,
                          pauseFor: 3000,
                        }}
                      />
                    </h1>
                  </Slide>

                  <div style={styles.bodyStyle}>
                    <Fade cascade duration='1000'>
                      {data.about.map((sentence) => (
                        <p>{'» ' + sentence}</p>
                      ))}
                    </Fade>
                  </div>
                  
                  <div style={{marginBottom: 20}}>
                  <Slide direction="right" cascade duration="400" damping={0.5}>
                    {data.buttons.map((item) => (
                      <Link to={item.route} key={item.name} target={item.type === "link" ? "_blank" : "_self"} className="text_2">
                        <div id={item.id} className="ac_btn btn ">
                          {item.name}
                          <div className="ring one"></div>
                          <div className="ring two"></div>
                          <div className="ring three"></div>
                        </div>
                      </Link>
                    ))}
                    </Slide>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        ): null}
        
      </section>
    </HelmetProvider>
  );
};

export default Home;