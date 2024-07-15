import React from 'react';
import { useState } from 'react';

function EmailButton({text, japText, passFunc, isActive}) {

    const [isSelected, setIsSelected] = useState(false);


    function hoverButton(){ 
        setIsSelected(prevIsSelected => !prevIsSelected)
    }

    function clickFuncMail(){
        passFunc();
    }

    if(!isActive){
        if(!isSelected){
            return(
                <>
                    <div>
                        <input className={'text-lg fold-bold  inline-flex items-center justify-center h-full w-full rounded border-2 border-black bg-white px-2 my-1 text-base font-bold text-black'} type='submit' value={text} onMouseEnter={hoverButton} onMouseLeave={hoverButton}/>
                    </div>
                </>
            );
        }else{
            return(
                <>
                    <div>
                        <input className='text-lg fold-bold  inline-flex items-center justify-center h-full w-full rounded border-2 border-black bg-black px-2 my-1 text-base font-bold text-white' type='submit' value={japText} onMouseEnter={hoverButton} onMouseLeave={hoverButton}/>
                    </div>
                </>
            );
        }
    }else{
        if(!isSelected){
            return(
                <>
                    <div>
                        <input className='text-lg fold-bold  inline-flex items-center justify-center h-full w-full rounded border-2 border-black bg-black px-2 my-1 text-base font-bold text-white' type='submit' value={japText} onMouseEnter={hoverButton} onMouseLeave={hoverButton}/>
                    </div>
                </>
            );
        }else{
            return(
                <>
                    <div>
                        <input className="text-lg fold-bold  inline-flex items-center justify-center h-full w-full rounded border-2 border-black bg-white px-2 my-1 text-base font-bold text-black" type='submit' value={text} onMouseEnter={hoverButton} onMouseLeave={hoverButton}/>
                    </div>
                </>
            );
        }        
    }


}

export default EmailButton;