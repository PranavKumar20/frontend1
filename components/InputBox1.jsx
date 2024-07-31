"use client"
import { useState } from 'react';

const InputBox1 = ({ placeholder, icon, type }) => {
    const [inputType, setInputType] = useState(type);
    const [iconClicked, setIconClicked] = useState(false);

    function clickHandler() {
        setIconClicked(!iconClicked);
        setInputType(inputType === 'password' ? 'text' : 'password');
    }

    return (
        <div className="relative flex items-center">
            <input 
                className="w-full pr-10 pl-3 py-2 bg-gray-200 border border-gray-300 focus:outline-none focus:border-gray-400 rounded" 
                type={inputType} 
                placeholder={placeholder} 
            />
            <div 
                className="absolute right-0 mr-3 cursor-pointer text-gray-500"
                
            >
                {icon}
            </div>
        </div>
    );
}

export default InputBox1;

//onClick={clickHandler}  ->> it was in icon div
