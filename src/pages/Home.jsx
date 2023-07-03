import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import getEndpoint from "../app/endpoints.jsx";
import MyHelmet from "../components/MyHelmet.jsx";
import ParticlesBg from "particles-bg";

import { getRandomBgType } from "../components/Background.jsx";

import "animate.css";

const styles = {
  bodyStyle: {
    fontFamily: "Arial",
    color: "white",
    marginBottom: "30px",
    
  },
};



const Home = () => {
  const [data, setData] = useState(null);


  useEffect(() => {
    getEndpoint('home').then((endpoint) => {
      fetch(endpoint, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => setData(res))
        .catch((err) => err);
    });
    
  }, []);

  const button_animations = [
    "animate__animated animate__fadeInTopRight",
    "animate__animated animate__fadeInTopLeft",
    "animate__animated animate__fadeInTopRight",
    "animate__animated animate__fadeInBottomLeft",
    "animate__animated animate__fadeInBottomRight",
  ]

  const bullet_animations = [
    "animate__animated animate__backInDown",
    "animate__animated animate__backInRight",
    "animate__animated animate__backInUp",
    "animate__animated animate__backInLeft",
  ]

  const { type, num } = getRandomBgType();



  return (
    <HelmetProvider>
      <section id="home" className="home">
        {data ? (
          <div>
            <ParticlesBg type={type} num={num} styles={{ backgroundColor: 'black'}} 
                bg={{position: "fixed",
                    zIndex: -1,
                    top: 0,
                    left: 0}} 
            />
            <MyHelmet title={data.meta.title} description={data.meta.description} />
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
                  
                    <div className="animate__animated animate__flipInX" style={{marginBottom: "3rem"}}>
                      <h2 className="mb-1x" style={{fontSize: 40, fontWeight: 'bold'}} >{data.greetings}</h2>
                    </div>

                    {/* <Fade triggerOnce delay={5800}>
                      <h1 className="fluidz-48 mb-1x" >
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
                    </Fade> */}

                    <div style={{ ...styles.bodyStyle}}>
                        {data.about.map((sentence, index) => (
                          <p className={bullet_animations[index % bullet_animations.length] + " animate__delay-1s"}>{'» ' + sentence}</p>
                        ))}
                    </div>

                    <div style={{ marginBottom: 20}}>
                      {data.buttons.map((item, index) => (
                        <div className={button_animations[index % button_animations.length] + " animate__delay-2s"}>
                        <Link
                          to={item.route}
                          key={item.name}
                          target={item.type === "link" ? "_blank" : "_self"}
                          className="text_2"
                        >
                          <div id={item.id} className="ac_btn btn ">
                            {item.name}
                            <div className="ring one"></div>
                            <div className="ring two"></div>
                            <div className="ring three"></div>
                          </div>
                        </Link>
                        </div>
                      ))}
                    </div>
                    

                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </HelmetProvider>
  );
};




export default Home;