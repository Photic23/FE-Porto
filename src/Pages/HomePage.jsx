import React from 'react';
import Nav from '../components/nav';
import { useMediaQuery } from "@uidotdev/usehooks";
import Card from '../components/Card';
import Footer from '../components/Footer';
import wavePick from '../stacked-waves.svg';


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
            <div className='relative h-full w-full'>
                <div className='relative z-10 flex flex-row h-full w-full'>
                    <Nav isSmall={navSmall} changePage={setPage} ></Nav>
                    <Footer></Footer>
                    {/* first container */}
                    <Card page={page} isSmall={navSmall}></Card>
                </div>
                <img src={wavePick} alt="" className='absolute z-0 bottom-0 h-full w-full object-cover'/>
            </div>

            
        </>
    );
}else{
    return( 
        <>
            <div className='relative h-full w-full'>
                <div className='relative z-10 flex flex-row h-full w-full'>
                    <Nav isSmall={navSmall} changePage={setPage}></Nav>
                    <Footer></Footer>
                    {/* first container */}
                    <Card page={page} isSmall={navSmall}></Card>
               </div>
               <img src={wavePick} alt="" className='absolute z-0 bottom-0 h-full w-full object-cover'/>
            </div>

        </>
    );    
}

    

}

export default HomePage;