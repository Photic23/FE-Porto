import React, {Component} from 'react';
import { useState } from 'react';
import "../App.css";


function Namebutton({text, link}) {
    return (
        <div class="mx-0.5">
            <a class="relative" href={link}>
                <span class="fold-bold font-bold relative inline-flex items-center text-xl justify-center h-full w-24  border-white bg-white px-2 py-1  text-base font-bold text-black">{text}</span>
            </a>
        </div>

    );
}

export default Namebutton;