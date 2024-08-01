import React from 'react';
import "../App.css";


function Namebutton({text, link}) {
    return (
        <div className="mx-0.5">
            <a className="relative" href={link}>
                <span className="fold-bold font-bold relative inline-flex items-center text-xl justify-center h-full w-24  border-white bg-[#A1CDA8] px-2 py-1  text-base font-bold text-black">{text}</span>
            </a>
        </div>

    );
}

export default Namebutton;