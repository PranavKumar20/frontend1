"use client"

import { useRouter } from "next/navigation";

const BottomText1 = ({text1,text2,goto})=>{
    const router = useRouter();
    function clickHandler(){
        router.push('/'+goto);
    }
    return (
        <div className="flex flex-row text-thin pt-2 " >
            <div className="mr-2">{text1}</div>
            <div onClick={clickHandler} className="text-blue-500 hover:text-blue-600 hover:cursor-pointer" >{text2}</div>
        </div>
    )
}

export default BottomText1;