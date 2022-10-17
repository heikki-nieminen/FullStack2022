const TulostaVastaus = (props) => {

    return (
        <div className="vastaus">
            <input type="checkbox"/>
            {props.vastaus}
            <input type="text" className="text-input" onChange={(event) => {
                props.muutaVastaus(props.kysymysIndex, props.vastausIndex, event.target.value)
            }}
                   value={props.vastaus}
            />
        </div>
    )
}

export default TulostaVastaus