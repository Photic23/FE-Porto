import React from 'react';
import GamingHutao from'../porto-pic.jpg';
import Navbutton from '../components/navbutton';
import Typewriter from 'typewriter-effect';
import SpotifyPlayer from '../components/SpotifyPlayer';
import SpotifyDebug from '../components/SpotifyDebug';
import TokenGrabber from '../components/TokenGrabber';


function Biography({isSmall}) {
    function dummyFunc() {
        
    }

    function dummyFunc2(value){

    }    

    if(isSmall){
        return(
            <div class="bg-transparent h-svh w-full px-8 py-8" id='first-container'>
                <div class="h-full w-full flex items-center justify-center rounded border-2 border-black px-1 py-1 bg-[#B5DFCA]">
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
                                <h1 class="text-lg font-bold">Hi, I am Mahdy</h1>
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
                            <p class="text-sm font-medium my-1">An Information Systems student at Universitas Indonesia. Currently on my 3rd year. Motivated to create positive impact, learn and explore new experience, earn new ability, improve my capability, broaden my knowledge. I also love reading manga or light novel on my free time.</p>
                            <div className="my-2">
                                <TokenGrabber />
                            </div>
                            <div class="inline-flex my-1">
                                <Navbutton text={"Linkedin"} japText={"リンクトイン"} isContact={false} link={"https://www.linkedin.com/in/naufalmahdy/"} target={"_blank"} toggleClick={dummyFunc} clickFunc={dummyFunc2}/>
                                <Navbutton text={"Github"} japText={"ギットハブ"} isContact={false} link={"https://github.com/Photic23"} target={"_blank"} toggleClick={dummyFunc} clickFunc={dummyFunc}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        );
    }else{
        return(
            <>
                <div class="bg-transparent h-svh w-full px-8 py-8" id='first-container' >
                    <div class="h-full w-full flex items-center justify-center rounded border-2 border-black  py-1 bg-[#B5DFCA]">
                        <div class="flex items-center justify-center">
                            <div class="flex flex-col h-72 w-2/5 items-start justify-evenly px-5">
                                {/* left container */}
                                <div class="p-1 w-11/12 border-b-4 border-black">
                                    <h1 class="text-4xl font-bold">Hi, I am Mahdy</h1>
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
                                <p class="text-base font-medium">An Information Systems student at Universitas Indonesia. Currently on my 3rd year. Motivated to create positive impact, learn and explore new experience, earn new ability, improve my capability, broaden my knowledge. I also love reading manga or light novel on my free time.</p>
                                <div className="my-2">
                                    <TokenGrabber />
                                </div>
                                <div class="inline-flex">
                                    <Navbutton text={"Linkedin"} japText={"リンクトイン"} isContact={false} link={"https://www.linkedin.com/in/naufalmahdy/"} target={"_blank"} toggleClick={dummyFunc} clickFunc={dummyFunc2}/>
                                    <Navbutton text={"Github"} japText={"ギットハブ"} isContact={false} link={"https://github.com/Photic23"} target={"_blank"} toggleClick={dummyFunc} clickFunc={dummyFunc2}/>
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
            </>

        );
    }

}

export default Biography;