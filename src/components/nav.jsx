import React, {Component} from 'react';
import { useState, useEffect, useRef } from 'react';
import Navbutton from './navbutton';
import Namebutton from './namebutton';
import PopButton from './popButton';


function Nav({isSmall}){
    const [openedNav, setOpenedNav] = React.useState(true)

    const [width, setWidth] = useState(null)
    const ref = useRef(null)

    function toggleOpenedNav() {
        setOpenedNav(prevOpenedNav => !prevOpenedNav)
    }
    

    useEffect(() => {
        if(ref.current.offsetWidth!=null){
            setWidth(ref.current.offsetWidth)
        }else{
            setWidth(0)
        }
        
    })

    if(!isSmall){
        return(
            <>
                {/* popped up nav */}
                <div class="hidden fixed h-svh w-full px-2 py-2" >
                    <div class="h-full w-full flex items-center justify-center rounded bg-white border-2 border-black py-1">
                        <div class="flex flex-col items-center justify-center w-full"  ref={ref}>
                            <Navbutton text={"About Me"} japText={"自分"} isContact={false} link={"#first-container"} isPop={true} width={width}/>
                            <Navbutton text={"Contact Me"} japText={"私に連絡して"} isContact={true} link={"https://wa.me/+6281907398637"} target={"_blank"} isPop={true} width={width}></Navbutton>
                        </div>
                    </div>
                </div>
                {/* popped up nav */}
                <nav  className="fixed  w-full px-2 py-2" >
                    <div class=" bg-white w-full inline-flex justify-between rounded border-2 border-black px-1 py-1">
                        <div class="buttonName">
                            <Namebutton text={"Photic"} link={"#first-container"}></Namebutton>
                        </div>
                        <div class="items-center inline-flex">
                            <Navbutton text={"About Me"} japText={"自分"} isContact={false} link={"#first-container"} isPop={false}/>
                            {/* <Navbutton text={"About Me"} japText={"自分"} isContact={false} link={"#"}/>
                            <Navbutton text={"About Me"} japText={"自分"} isContact={false} link={"#"}/> */}
                            <Navbutton text={"Contact Me"} japText={"私に連絡して"} isContact={true} link={"https://wa.me/+6281907398637"} target={"_blank"} isPop={false}/>
                        </div>
                    </div>
                </nav>
            </>
        );
    }
    else if(isSmall){
        if(!openedNav){
            return(
                <>
                {/* popped up nav */}
                    <div class="fixed h-svh w-full px-2 py-2" >
                        <div class="h-full w-full flex items-center justify-center rounded bg-white border-2 border-black py-1">
                            <div class="flex flex-col items-center justify-center w-full"  ref={ref}>
                                <a href="#first-container">
                                    <Navbutton text={"About Me"} japText={"自分"} isContact={false} link={"#first-container"} target={"_self"} isPop={true} width={width} clickFunc={toggleOpenedNav}/>
                                </a>
                                <a href="https://wa.me/+6281907398637">
                                    <Navbutton text={"Contact Me"} japText={"私に連絡して"} isContact={true} link={"https://wa.me/+6281907398637"} target={"_blank"} isPop={true} width={width} clickFunc={toggleOpenedNav}></Navbutton>
                                </a>
                                
                            </div>
                        </div>
                    </div>
                    {/* popped up nav */}
                    <nav  class="fixed  w-full px-2 py-2" >
                        <div class=" bg-white w-full inline-flex justify-between rounded border-2 border-black px-1 py-1">
                            <div class="buttonName">
                                <Namebutton text={"Photic"} link={"#first-container"}></Namebutton>
                            </div>
                            <div class="items-center inline-flex">                        
                                <PopButton toggleButton={toggleOpenedNav} isActive={openedNav} ></PopButton>
                            </div>
                        </div>
                    </nav>
                    
                </>

    
            ); 
        }else{
            return(
                <>
                {/* popped up nav but hidden */}
                    <div class="hidden fixed h-svh w-full px-2 py-2" >
                        <div class="h-full w-full flex items-center justify-center rounded bg-white border-2 border-black py-1">
                            <div class="flex flex-col items-center justify-center w-full"  ref={ref}>
                                <Navbutton text={"About Me"} japText={"自分"} isContact={false} link={"#first-container"} isPop={true} width={width}/>
                                <Navbutton text={"Contact Me"} japText={"私に連絡して"} isContact={true} link={"https://wa.me/+6281907398637"} target={"_blank"} isPop={true} width={width}></Navbutton>
                            </div>
                        </div>
                    </div>
                    {/* popped up nav */}
                    <nav  class="fixed  w-full px-2 py-2" >
                        <div class=" bg-white w-full inline-flex justify-between rounded border-2 border-black px-1 py-1">
                            <div class="buttonName">
                                <Namebutton text={"Photic"} link={"#first-container"}></Namebutton>
                            </div>
                            <div class="items-center inline-flex ">
                                <PopButton toggleButton={toggleOpenedNav} isActive={openedNav} ></PopButton>                            
                            </div>
                        </div>
                    </nav>

                </>
            ); 
        }
       
    }

}

export default Nav;