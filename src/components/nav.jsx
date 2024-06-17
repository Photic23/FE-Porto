import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Navbutton from './navbutton';
import Namebutton from './namebutton';
import PopButton from './popButton';


function Nav({isSmall, changePage}){
    const [openedNav, setOpenedNav] = React.useState(true)

    const [width, setWidth] = useState(null)
    const ref = useRef(null)


    function toggleOpenedNav() {
        setOpenedNav(prevOpenedNav => !prevOpenedNav);
    }

    function dummyFunc(){

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
                {/* dummy nav for size ref i guess, i forgot lmao*/}
                <div class="hidden fixed h-svh w-full px-2 py-2" >
                    <div class="h-full w-full flex items-center justify-center rounded bg-white border-2 border-black py-1">
                        <div class="flex flex-col items-center justify-center w-full"  ref={ref}>
                            <Navbutton text={"About Me"} japText={"自分"} isContact={false} link={"#"} isPop={true} width={width} clickFunc={changePage} toggleClick={dummyFunc}/>
                            <Navbutton text={"Contact Me"} japText={"私に連絡して"} isContact={true} link={"#"} target={"_blank"} isPop={true} width={width} clickFunc={changePage} toggleClick={dummyFunc}></Navbutton>
                        </div>
                    </div>
                </div>
                {/* popped up nav */}
                <nav  className="fixed  w-full px-2 py-2" >
                    <div class=" bg-white w-full inline-flex justify-between rounded border-2 border-black px-1 py-1">
                        <div class="buttonName">
                            <Namebutton text={"Photic"} link={"#first-container"} ></Namebutton>
                        </div>
                        <div class="items-center inline-flex">
                            <Navbutton text={"About Me"} japText={"自分"} isContact={false} link={"#"} isPop={false} clickFunc={changePage} toggleClick={dummyFunc}/>
                            {/* <Navbutton text={"About Me"} japText={"自分"} isContact={false} link={"#"}/>
                            <Navbutton text={"About Me"} japText={"自分"} isContact={false} link={"#"}/> */}
                            <Navbutton text={"Contact Me"} japText={"私に連絡して"} isContact={true} link={"#"} isPop={false} clickFunc={changePage} toggleClick={dummyFunc}/>
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
                                    <Navbutton text={"About Me"} japText={"自分"} isContact={false} link={"#"} isPop={true} width={width} clickFunc={changePage} toggleClick={toggleOpenedNav}/>                         
                                    <Navbutton text={"Contact Me"} japText={"私に連絡して"} isContact={true} link={"#"}  isPop={true} width={width} clickFunc={changePage} toggleClick={toggleOpenedNav}></Navbutton> 
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
                                <Navbutton text={"About Me"} japText={"自分"} isContact={false} link={"#"} isPop={true} width={width} clickFunc={changePage} toggleClick={dummyFunc}/>
                                <Navbutton text={"Contact Me"} japText={"私に連絡して"} isContact={true} link={"#"}  isPop={true} width={width} clickFunc={changePage} toggleClick={dummyFunc}></Navbutton>
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