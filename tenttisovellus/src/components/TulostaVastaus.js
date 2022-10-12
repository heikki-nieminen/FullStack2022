const TulostaVastaus = (props) => {

    return (
        <div className="vastaus">
            <input type="checkbox"/>
            {props.vastaus}
        </div>
    )
}

export default TulostaVastaus