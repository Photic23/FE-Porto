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
                <div className="hidden fixed h-svh w-full px-8 py-8" >
                    <div className="h-full w-full flex items-center justify-center rounded border-2 border-black py-1 bg-[#A1CDA8]">
                        <div className="flex flex-col items-center justify-center w-full"  ref={ref}>
                            <Navbutton text={"About Me"} japText={"自分"} isContact={false} link={"#"} isPop={true} width={width} clickFunc={changePage} toggleClick={dummyFunc}/>
                            <Navbutton text={"Experience"} japText={"経験"} isContact={false} link={"#"} isPop={true} width={width} clickFunc={changePage} toggleClick={dummyFunc}/>
                            <Navbutton text={"Blog"} japText={"ブログ"} isContact={false} link={"#"} isPop={true} width={width} clickFunc={changePage} toggleClick={dummyFunc}/>
                            <Navbutton text={"Contact Me"} japText={"私に連絡して"} isContact={true} link={"#"} target={"_blank"} isPop={true} width={width} clickFunc={changePage} toggleClick={dummyFunc}></Navbutton>
                        </div>
                    </div>
                </div>
                {/* popped up nav */}
                <nav className="fixed w-full px-8 py-8" >
                    <div className="w-full inline-flex justify-between rounded border-2 border-black px-1 py-1 bg-[#A1CDA8]">
                        <div className="buttonName">
                            <Namebutton text={"Photic"} link={"#first-container"} ></Namebutton>
                        </div>
                        <div className="items-center inline-flex">
                            <Navbutton text={"About Me"} japText={"自分"} isContact={false} link={"#"} isPop={false} clickFunc={changePage} toggleClick={dummyFunc}/>
                            <Navbutton text={"Experience"} japText={"経験"} isContact={false} link={"#"} isPop={false} clickFunc={changePage} toggleClick={dummyFunc}/>
                            <Navbutton text={"Blog"} japText={"ブログ"} isContact={false} link={"#"} isPop={false} clickFunc={changePage} toggleClick={dummyFunc}/>
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
                    <div className="fixed h-svh w-full px-8 py-8" >
                        <div className="h-full w-full flex items-center justify-center rounded border-2 border-black py-1 bg-[#A1CDA8]">
                            <div className="flex flex-col items-center justify-center w-full" ref={ref}>
                                <Navbutton text={"About Me"} japText={"自分"} isContact={false} link={"#"} isPop={true} width={width} clickFunc={changePage} toggleClick={toggleOpenedNav}/>
                                <Navbutton text={"Experience"} japText={"経験"} isContact={false} link={"#"} isPop={true} width={width} clickFunc={changePage} toggleClick={toggleOpenedNav}/>
                                {/* <Navbutton text={"Blog"} japText={"ブログ"} isContact={false} link={"#"} isPop={true} width={width} clickFunc={changePage} toggleClick={toggleOpenedNav}/>                        */}
                                <Navbutton text={"Contact Me"} japText={"私に連絡して"} isContact={true} link={"#"} isPop={true} width={width} clickFunc={changePage} toggleClick={toggleOpenedNav}></Navbutton> 
                            </div>
                        </div>
                    </div>
                    {/* popped up nav */}
                    <nav className="fixed w-full px-8 py-8" >
                        <div className="w-full inline-flex justify-between rounded border-2 border-black px-1 py-1 bg-[#A1CDA8]">
                            <div className="buttonName">
                                <Namebutton text={"Photic"} link={"#first-container"}></Namebutton>
                            </div>
                            <div className="items-center inline-flex">                        
                                <PopButton toggleButton={toggleOpenedNav} isActive={openedNav} ></PopButton>
                            </div>
                        </div>
                    </nav>
                    
                </>
            ); 
        } else {
            return(
                <>
                {/* popped up nav but hidden */}
                    <div className="hidden fixed h-svh w-full px-8 py-8" >
                        <div className="h-full w-full flex items-center justify-center rounded border-2 border-black py-1 bg-[#A1CDA8]">
                            <div className="flex flex-col items-center justify-center w-full" ref={ref}>
                                <Navbutton text={"About Me"} japText={"自分"} isContact={false} link={"#"} isPop={true} width={width} clickFunc={changePage} toggleClick={dummyFunc}/>
                                <Navbutton text={"Experience"} japText={"経験"} isContact={false} link={"#"} isPop={true} width={width} clickFunc={changePage} toggleClick={dummyFunc}/>
                                {/* <Navbutton text={"Blog"} japText={"ブログ"} isContact={false} link={"#"} isPop={true} width={width} clickFunc={changePage} toggleClick={dummyFunc}/> */}
                                <Navbutton text={"Contact Me"} japText={"私に連絡して"} isContact={true} link={"#"} isPop={true} width={width} clickFunc={changePage} toggleClick={dummyFunc}></Navbutton>
                            </div>
                        </div>
                    </div>
                    {/* popped up nav */}
                    <nav className="fixed w-full px-8 py-8" >
                        <div className="w-full inline-flex justify-between rounded border-2 border-black px-1 py-1 bg-[#A1CDA8]">
                            <div className="buttonName">
                                <Namebutton text={"Photic"} link={"#first-container"}></Namebutton>
                            </div>
                            <div className="items-center inline-flex ">
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