import React from 'react';
import { useState } from 'react';

function Button({text, japText, href, target, passFunc, isActive}) {

    const [isSelected, setIsSelected] = useState(false);


    function hoverButton(){ 
        setIsSelected(prevIsSelected => !prevIsSelected)
    }

    function clickFuncMail(){
        passFunc();
    }

    if(!isActive){
            return(
                <>
                    <div>
                        <a target={target} href={href} onMouseEnter={hoverButton} onMouseLeave={hoverButton} onClick={clickFuncMail}>
                            <span class={isSelected?"text-lg fold-bold  inline-flex items-center justify-center h-full w-full rounded border-2 border-black bg-black px-2 my-1 text-base font-bold text-white":"text-lg fold-bold  inline-flex items-center justify-center h-full w-full rounded border-2 border-black bg-white px-2 my-1 text-base font-bold text-black"}><img src="" alt="" />{isSelected?japText:text}</span>
                        </a>
                    </div>
                </>
            );
    }else{
        return(
            <>
                <div>
                    <a target={target} href={href} onMouseEnter={hoverButton} onMouseLeave={hoverButton} onClick={clickFuncMail}>
                        <span class={isSelected?"text-lg fold-bold inline-flex items-center justify-center h-full w-full rounded border-2 border-black bg-white px-2 my-1 text-base font-bold text-black":"text-lg fold-bold  inline-flex items-center justify-center h-full w-full rounded border-2 border-black bg-black px-2 my-1 text-base font-bold text-white"}><img src="" alt="" />{isSelected?text:japText}</span>
                    </a>
                </div>
            </>
        );
    }


}

export default Button;