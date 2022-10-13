const Nappain = (props) => {
    let buttonId = "button-"+props.index
    if(props.data === ""){
        return (<div className={buttonId}></div>)
    }
    return(
        <div className={`buttons ${buttonId}`}>
            <button className={`buttons ${buttonId}`} onClick={()=>{props.click(props.data)}}>{props.data}</button>
        </div>
    )
}

export default Nappain