const WelcomeTitle = ({title,l_title})=>{
    return (
        <div className="flex flex-row text-3xl" >
            <div className="pr-2">{title}</div>
            <div className="text-purple-800" >{l_title}</div>
        </div>    
    )
}

export default WelcomeTitle;