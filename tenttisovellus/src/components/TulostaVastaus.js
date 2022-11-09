const TulostaVastaus = (props) => {

    return (
        <div className="vastaus">
            {props.onkoOpettaja ?
                <>
                    <input type="text" className="text-input" onChange={(event) => {
                        props.dispatch({
                            type: "MUUTA_VASTAUS", payload:
                                {
                                    kysymysIndex: props.kysymysIndex,
                                    vastausIndex: props.vastausIndex,
                                    vastaus: event.target.value
                                }
                        })
                        props.dispatch({
                            type: "MUUTOKSIA",
                            payload: true
                        })
                    }}
                           defaultValue={props.vastaus}
                    />

                    <button onClick={(event) => {
                        props.dispatch({
                            type: "POISTA_VAIHTOEHTO", payload: {
                                tenttiIndex: props.tenttiIndex,
                                kysymysIndex: props.kysymysIndex,
                                vastausIndex: props.vastausIndex
                            }
                        })
                        props.dispatch({
                            type: "MUUTOKSIA",
                            payload: true
                        })
                    }}>Poista vaihtoehto
                    </button>
                </>
                :
                <>
                    <input type="checkbox"/>
                    {props.vastaus}
                </>
            }
        </div>
    )
}

export default TulostaVastaus