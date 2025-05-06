import React from 'react';
import Biography from '../Sections/Biography';
import Contact from '../Sections/Contact';
import Blog from '../Sections/Blog';
import Experience from '../Sections/Experience';

function Card({page, isSmall}) {

    if(page === "About Me"){
        return(
            <Biography isSmall={isSmall}></Biography>
        );
    } else if(page === "Contact Me"){
        return(
            <Contact isSmall={isSmall}></Contact>
        );
    } else if(page === "Blog"){
        return(
            <Blog></Blog>
        );
    } else if(page === "Experience"){
        return(
            <Experience isSmall={isSmall}></Experience>
        );
    } else {
        return (
            <div className="h-svh w-full px-2 py-2">
                <div className="h-full w-full flex items-center justify-center rounded border-2 border-black px-1 py-1 bg-[#ecc9b5]">
                    <p className="text-4xl font-semibold mx-1">This site is under development </p>
                </div>
            </div>
        );
    }

}

export default Card;