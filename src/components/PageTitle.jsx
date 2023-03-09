import React from 'react';
import MovingComponent from 'react-moving-text';
import { LightSpeed } from 'react-reveal';
import { Zoom, Bounce } from 'react-reveal';
import Jump from 'react-reveal/Jump';
import Jello from 'react-reveal/Jello';
import RubberBand from 'react-reveal/RubberBand';
// import { useMediaQuery } from 'usehooks-ts';

const getRandomComponent = () => {   
  const components = [Zoom, Bounce, Jump, Jello, RubberBand];
  const randomIndex = Math.floor(Math.random() * components.length);
  const component = components[randomIndex] || LightSpeed;
  return component;
};


const AnimatedWord = ({ word, style }) => {
    const letters = word.split('');

    return (
        <div style={{textAlign: 'center'}}>
            {letters.map((letter, index) =>
                letter === ' ' ? '\u00A0\u00A0\u00A0' :
                <MovingComponent
                key={index}
                type="effect3D"
                duration="2500ms"
                delay={`${index * 100}ms`}
                direction="normal"
                timing="ease"
                iteration="infinite"
                fillMode="none"
                style={style}
                >
                {letter}
                </MovingComponent>
            )}
        </div>
    );
}

const styles = {     
    titleLetterStyle: {       
        display: 'inline-block',
        fontSize: '3em',
        fontFamily: 'Arial, sans-serif',
        color: 'white',
        textAlign: 'center',
    },
    subtitleLetterStyle: {
        display: 'inline-block',
        fontSize: '1.0em',
        fontFamily: 'Arial, sans-serif',
        color: 'white'
    },
    stackedTitle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
};


const PageTitle = ({ title, subtitle, random = true }) => {
    // const bigEnough = useMediaQuery('(min-width: 1000px)');


    const RevealComponent = random ? getRandomComponent() : LightSpeed;

    return (
        <>
        <RevealComponent>
            <div style={styles.stackedTitle}>
                <AnimatedWord word={title} style={styles.titleLetterStyle} />
                {subtitle &&
                    <AnimatedWord word={subtitle} style={styles.subtitleLetterStyle} />
                }
            </div>
            
        </RevealComponent>
        <hr className="t_border my-4 ml-0 text-left"
            style={{color: '#FFCB05', borderWidth: '2px'}}/>
        </>
    );
};

export default PageTitle;