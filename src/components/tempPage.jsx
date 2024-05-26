import React, {Component} from 'react';
import { useState } from 'react';
import Typewriter from 'typewriter-effect';
import whatsapp from '../whatsapp.svg';
import instagram from '../instagram.svg';

function TempPage({textArray}) {
    console.log(textArray);
    return( 

            <div className='first-container'>
                <Typewriter
                    options={{
                        strings: textArray,
                        autoStart: true,
                        loop: true,
                        delay:150,
                        deleteSpeed:150,
                    }}
                />
                <h1>This site is currently under development.</h1>
                <div className='Footer'>
                    <div className='Footer-container'>
                        <p>Urgent inqueries contact below</p>
                    </div>
                    <div className='contact-container'>
                        <a href="https://wa.me/+6281907398637">
                            <img src={whatsapp} className="contact-logo" alt="logo" ></img>
                        </a>
                        <a href="https://www.instagram.com/photic___/">
                            <img src={instagram} className="contact-logo" alt="logo" ></img>
                        </a>
                    </div>
                </div>
            </div>
                
    );

    
}

export default TempPage;