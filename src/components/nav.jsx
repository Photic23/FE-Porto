import React, {Component} from 'react';
import { useState, useEffect, useRef } from 'react';
import Navbutton from './navbutton';
import Namebutton from './namebutton';


function Nav({isFiller}){
    const refContainer = useRef();
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
    });
    useEffect(() => {
        if (refContainer.current) {
            setDimensions({
                width: refContainer.current.offsetWidth,
                height: refContainer.current.offsetHeight,
            });
        }
    }, []);

    if(!isFiller){
        return(
            <nav  class="fixed  w-full px-2 py-2" ref={refContainer}>
                <div class=" bg-white w-full inline-flex justify-between rounded border-2 border-black px-1 py-1">
                    <div class="buttonName">
                        <Namebutton text={"Photic"} link={"#first-container"}></Namebutton>
                    </div>
                    <div class="items-center inline-flex">
                        <Navbutton text={"About Me"} japText={"自分"} isContact={false} link={"#first-container"}/>
                        {/* <Navbutton text={"About Me"} japText={"自分"} isContact={false} link={"#"}/>
                        <Navbutton text={"About Me"} japText={"自分"} isContact={false} link={"#"}/> */}
                        <Navbutton text={"Contact Me"} japText={"私に連絡して"} isContact={true} link={"https://wa.me/+6281907398637"} target={"_blank"}/>
                    </div>
                </div>
            </nav>
        );
    }else{
        return(
            <nav style={{visibility: 'hidden'}} class="fixed top-0 w-full px-2 py-2">
                <div class="w-full inline-flex justify-between rounded border-2 border-black px-1 py-1">
                    <div class="buttonName">
                        <Namebutton text={"Photic"}></Namebutton>
                    </div>
                    <div class="items-center inline-flex">
                        <Navbutton text={"About Me"} japText={"自分"} isContact={false}/>
                        <Navbutton text={"About Me"} japText={"自分"}/>
                        <Navbutton text={"About Me"} japText={"自分"}/>
                        <Navbutton text={"Contact Me"} japText={"私に連絡して"} isContact={true}/>   
                    </div>
                </div>
            </nav>
        );        
    }

}

export default Nav;