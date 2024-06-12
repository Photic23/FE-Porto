import React, {Component} from 'react';
import { useState } from 'react';
import "../App.css";


function Navbutton({text, japText, isContact, link, target}) {
    const [isSelected, setIsSelected] = useState(false);
    
    function handleClick(){
        setIsSelected(prevIsSelected => !prevIsSelected)
    }

    if(!isContact){
        if(!isSelected){
            return (
                <div class="mx-0.5">
                    <a onMouseEnter={handleClick} onMouseLeave={handleClick} class="" href={link} target={target}>
                        <span class="fold-bold  inline-flex items-center justify-center h-full w-32 rounded border-2 border-black bg-white px-2 py-1  text-base font-bold text-black">{text}</span>
                    </a>
                </div>
    
            );
        }
        else{
            return (
                <div class="mx-0.5">
                    <a onMouseEnter={handleClick} onMouseLeave={handleClick} class="" href={link} target={target}>
                        <span class="fold-bold  inline-flex items-center justify-center h-full w-32 rounded border-2 border-black bg-black px-2 py-1 text-base font-bold text-white">{japText}</span>
                    </a>
                </div>
            );
        }
    }else{
        if(isSelected){
            return (
                <div class="mx-0.5">
                    <a onMouseEnter={handleClick} onMouseLeave={handleClick} class="" href={link} target={target}>
                        <span class="fold-bold  inline-flex items-center justify-center h-full w-32 rounded border-2 border-black bg-white px-2 py-1  text-base font-bold text-black">{japText}</span>
                    </a>
                </div>
    
            );
        }
        else{
            return (
                <div class="mx-0.5">
                    <a onMouseEnter={handleClick} onMouseLeave={handleClick} class="" href={link} target={target}>
                        <span class="fold-bold  inline-flex items-center justify-center h-full w-32 rounded border-2 border-black bg-black px-2 py-1 text-base font-bold text-white">{text}</span>
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