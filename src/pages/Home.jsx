import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import endpoints from "../app/endpoints";
import MyHelmet from "../components/MyHelmet";
import Slide from "react-reveal/Slide";
import TextBody from "../components/TextBody";




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
                <h2 className="mb-1x">
                  <Slide top cascade>
                  {data.greetings}
                  </Slide>
                  </h2>
                  <Slide right>
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
                  <Slide left>
                  <TextBody text={data.about} />
                  </Slide>
                  <Slide right>
                  <div >
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
                    {/* <ContactPopup triggerButton={contactButton}/> */}
                  </div>
                  </Slide>
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