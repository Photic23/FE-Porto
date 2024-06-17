import React, {Component} from 'react';
import { useState } from 'react';
import Nav from '../components/nav';
import Typewriter from 'typewriter-effect';
import GamingHutao from'../GamingHutao.jpg';
import Navbutton from '../components/navbutton';
import { useMediaQuery } from "@uidotdev/usehooks";
import Card from '../components/Card';
import Footer from '../components/Footer';


function HomePage() {
const sm = useMediaQuery("only screen and (max-width : 767px)");
const md = useMediaQuery(
    "only screen and (min-width : 768px) and (max-width : 1023px)"
);
const lg = useMediaQuery(
    "only screen and (min-width : 1024px) and (max-width : 1279px)"
);
const xl = useMediaQuery(
    "only screen and (min-width : 1280px)"
);

const navSmall = sm||md;

const [page, setPage] = React.useState("About Me");


if(navSmall){
    return( 
        <>
            <Nav isSmall={navSmall} changePage={setPage} ></Nav>
            <Footer></Footer>
            {/* first container */}
            <Card page={page} isSmall={navSmall}></Card>
            
        </>
    );
}else{
    return( 
        <>
            <Nav isSmall={navSmall} changePage={setPage}></Nav>
            <Footer></Footer>
            {/* first container */}
            <Card page={page} isSmall={navSmall}></Card>
        </>
    );    
}

    

}

export default HomePage;