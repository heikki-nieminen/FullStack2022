const TulostaVastaus = (props) => {

    return (
        <div className="vastaus">
            <input type="checkbox"/>
            {props.vastaus}
            <input type="text" className="text-input" onChange={(event) => {
                props.dispatch({
                    type: "MUUTA_VASTAUS", payload:
                        {
                            kysymysIndex: props.kysymysIndex,
                            vastausIndex: props.vastausIndex,
                            vastaus: event.target.value
                        }
                })
            }}
                   value={props.vastaus}
            />
            <button onClick={(event) => {
                props.dispatch({
                    type: "POISTA_VAIHTOEHTO", payload: {
                        kysymysIndex: props.kysymysIndex,
                        vastausIndex: props.vastausIndex
                    }
                })
            }}>Poista vaihtoehto
            </button>
        </div>
    )
}

export default TulostaVastaus