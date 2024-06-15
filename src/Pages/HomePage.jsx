import React, {Component} from 'react';
import { useState } from 'react';
import Nav from '../components/nav';
import Typewriter from 'typewriter-effect';
import GamingHutao from'../GamingHutao.jpg';
import Navbutton from '../components/navbutton';
import { useMediaQuery } from "@uidotdev/usehooks";


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

if(navSmall){
    return( 
        <>
            <Nav isSmall={navSmall} ></Nav>
            {/* first container */}
            <div class="h-svh w-full px-2 py-2" id='first-container'>
                <div class="h-full w-full flex items-center justify-center rounded border-2 border-black px-1 py-1">
                    <div class="flex flex-col items-center justify-center">
                        <div class="flex h-40 w-max items-end justify-start mb-2">
                            {/* top container */}
                            <div>
                                <img src={GamingHutao} class="h-40 rounded border-2 border-black" alt="" />
                            </div>
                        </div>
                        <div class="flex flex-col h-3/5 w-10/12 items-start justify-between px-5 mt-4">
                            {/* bottom container */}
                            <div class="p-1 w-11/12 border-b-4 border-black">
                                <h1 class="text-lg font-bold">Hi, I am Photic</h1>
                                <div class="typewriter-text-sm">
                                    <Typewriter
                                        class="text-4xl font-semibold"
                                        options={{
                                            strings: ['Information Systems Student', 'Professional Manga Reader', 'Mushoku Tensei Enthusiast'],
                                            autoStart: true,
                                            loop: true,
                                            delay:150,
                                            deleteSpeed:150,
                                            skipAddStyles:true,
                                        }}
                                    />
                                </div>
                            </div>
                            <p class="text-base font-normal my-1">An Information Systems student at Universitas Indonesia. Currently on my 2nd year. Motivated to create positive impact, learn and explore new experience, earn new ability, improve my capability, broaden my knowledge. I also love manga or light novel reading on my free time.</p>
                            <div class="inline-flex my-1">
                                <Navbutton text={"Linkedin"} japText={"リンクトイン"} isContact={false} link={"https://www.linkedin.com/in/naufalmahdy/"} target={"_blank"}/>
                                <Navbutton text={"Github"} japText={"ギットハブ"} isContact={false} link={"https://github.com/Photic23"} target={"_blank"}/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {/* second container */}
            <div class="h-svh w-full px-2 py-2">
                <div class="h-full w-full flex items-center justify-center rounded border-2 border-black px-1 py-1">
                    <p class="text-4xl font-semibold mx-1">This site is under development </p>
                </div>

            </div>
        </>
    );
}else{
    return( 
        <>
            <Nav isSmall={navSmall} ></Nav>
            {/* first container */}
            <div class="h-svh w-full px-2 py-2" id='first-container'>
                <div class="h-full w-full flex items-center justify-center rounded border-2 border-black px-1 py-1">
                    <div class="flex items-center justify-center">
                        <div class="flex flex-col h-72 w-2/5 items-start justify-between px-5">
                            {/* left container */}
                            <div class="p-1 w-11/12 border-b-4 border-black">
                                <h1 class="text-5xl font-bold">Hi, I am Photic</h1>
                                <div class="typewriter-text">
                                    <Typewriter
                                        class="text-4xl font-semibold"
                                        options={{
                                            strings: ['Information Systems Student', 'Professional Manga Reader', 'Mushoku Tensei Enthusiast'],
                                            autoStart: true,
                                            loop: true,
                                            delay:150,
                                            deleteSpeed:150,
                                            skipAddStyles:true,
                                        }}
                                    />
                                </div>
                            </div>
                            <p class="text-lg font-normal">An Information Systems student at Universitas Indonesia. Currently on my 2nd year. Motivated to create positive impact, learn and explore new experience, earn new ability, improve my capability, broaden my knowledge. I also love manga or light novel reading on my free time.</p>
                            <div class="inline-flex">
                                <Navbutton text={"Linkedin"} japText={"リンクトイン"} isContact={false} link={"https://www.linkedin.com/in/naufalmahdy/"} target={"_blank"}/>
                                <Navbutton text={"Github"} japText={"ギットハブ"} isContact={false} link={"https://github.com/Photic23"} target={"_blank"}/>
                            </div>
                        </div>
                        <div class="flex h-3/5 w-fit items-start justify-start">
                            {/* right container */}
                            <div>
                                <img src={GamingHutao} class="h-72 rounded border-2 border-black" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* second container */}
            <div class="h-svh w-full px-2 py-2">
                <div class="h-full w-full flex items-center justify-center rounded border-2 border-black px-1 py-1">
                    <p class="text-4xl font-semibold mx-1">This site is under development </p>
                </div>

            </div>
        </>
    );    
}

    

}

export default HomePage;