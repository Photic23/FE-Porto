import React, {Component} from 'react';
import { useState } from 'react';


function Navbutton() {
    const [isSelected, setIsSelected] = useState(false);
    
    function handleClick(){
        setIsSelected(prevIsSelected => !prevIsSelected)
    }
    if(isSelected){
        return (
            <div>
                <button onClick={handleClick} className="button-aktif ">
                    {isSelected ? 'Selected' : 'Not Selected'}
                </button>
                <p>The button is {isSelected ? 'selected' : 'not selected'}.</p>
            </div>
        );
    }
    else{
        return (
            <div>
                <button onClick={handleClick} className="button-inaktif rounded">
                    {isSelected ? 'Selected' : 'Not Selected'}
                </button>
                <p>The button is {isSelected ? 'selected' : 'not selected'}.</p>
            </div>
        );
    }
}


// class navbutton extends Component(){
//     const [state, setstate] = useState();

// }

export default Navbutton;