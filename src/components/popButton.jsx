import React, {Component} from 'react';
import { useState } from 'react';
import "../App.css";
import Borgir from '../menu-burger.svg';
import Borgirwhite from '../menu-burger-white.svg';


function PopButton({toggleButton, isActive}) {

    if(!isActive){
        return (
            <div class="mx-0.5">
                <a onClick={toggleButton} class="" href="javascript:void(0)">
                    <span class="fold-bold  inline-flex items-center justify-center h-9 w-9 rounded border-2 border-black bg-[#404a41] px-2 py-1  text-base font-bold text-black">
                        <img className='' src={Borgirwhite} alt="" />
                    </span>
                </a>
            </div>

        );
    }else{
        return (
            <div class="mx-0.5">
                <a onClick={toggleButton} class="" href="javascript:void(0)">
                    <span class="fold-bold  inline-flex items-center justify-center h-9 w-9 rounded border-2 border-black bg-[#627264] px-2 py-1  text-base font-bold text-black">
                    <img className='fill-black' src={Borgir} alt="" />
                    </span>
           
                </a>
            </div>

        );        
    }

}


export default PopButton;