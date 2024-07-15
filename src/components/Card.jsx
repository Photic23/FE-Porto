import React from 'react';
import Biography from '../Sections/Biography';
import Contact from '../Sections/Contact';

function Card({page, isSmall}) {

    if(page==="About Me"){
        return(
            <Biography isSmall={isSmall}></Biography>
        );
    }else if(page==="Contact Me"){
        return(
            <Contact isSmall={isSmall}></Contact>
        );
    }else{
        <div class="h-svh w-full px-2 py-2">
            <div class="h-full w-full flex items-center justify-center rounded border-2 border-black px-1 py-1">
                <p class="text-4xl font-semibold mx-1">This site is under development </p>
            </div>
        </div>
    }

}

export default Card;