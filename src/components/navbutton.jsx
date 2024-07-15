import React from 'react';
import { useState } from 'react';
import "../App.css";


function Navbutton({text, japText, isContact, link, target, isPop, width, clickFunc, toggleClick}) {
    const [isSelected, setIsSelected] = useState(false);
    
    //terlanjur dinamain handleclick wkwk more like hover handler
    function handleClick(){ 
        setIsSelected(prevIsSelected => !prevIsSelected)
    }

    function clickhandler(value) {
        clickFunc(value);
        toggleClick();
    }

    if(!isPop){
        if(!isContact){
            return (
                <div class="mx-0.5">
                    <a onMouseEnter={handleClick} onMouseLeave={handleClick} class="" href={link} target={target} onClick={()=>clickhandler(text)}>
                        <span class={isSelected?"text-sm lg:text-base inline-flex items-center justify-center h-full w-24 lg:w-32 rounded border-2 border-black bg-black px-1 lg:px-2 py-1 lg:py-1  font-bold text-white":"text-sm lg:text-base inline-flex items-center justify-center h-full w-24 lg:w-32 rounded border-2 border-black bg-white px-1 lg:px-2 py-1  lg:py-1 font-bold text-black"}>{isSelected?japText:text}</span>
                    </a>
                </div>
            );
        }else{
            return (
                <div class="mx-0.5">
                    <a onMouseEnter={handleClick} onMouseLeave={handleClick} class="" href={link} target={target} onClick={()=>clickhandler(text)}>
                        <span class={isSelected?"text-sm lg:text-base inline-flex items-center justify-center h-full w-24 lg:w-32 rounded border-2 border-black bg-white px-1 lg:px-2 py-1  lg:py-1  font-bold text-black":"text-sm lg:text-base inline-flex items-center justify-center h-full w-24 lg:w-32 rounded border-2 border-black bg-black px-1 lg:px-2 py-1  lg:py-1 font-bold text-white"}>{isSelected?japText:text}</span>
                    </a>
                </div>
    
            );
        }
    }else{
        if(!isSelected){
            return (
                <div class="" style={{width: width}}>
                    <a onMouseEnter={handleClick} onMouseLeave={handleClick} class="" href={link} target={target} onClick={()=>clickhandler(text)} >
                        <span class="inline-flex items-center justify-center h-full w-full border-1 border-black bg-white px-2 py-1 text-xl font-bold text-black">{text}</span>
                    </a>
                </div>
    
            );
        }
        else{
            return (
                <div class="" style={{width: width}}>
                    <a onMouseEnter={handleClick} onMouseLeave={handleClick} class="" href={link} target={target} onClick={()=>clickhandler(text)} >
                        <span class="inline-flex items-center justify-center h-full w-full border-1 border-black bg-black px-2 py-1 text-xl font-bold text-white">{japText}</span>
                    </a>
                </div>
            );
        }
    }

}


// class navbutton extends Component(){
//     const [state, setstate] = useState();

// }

export default Navbutton;