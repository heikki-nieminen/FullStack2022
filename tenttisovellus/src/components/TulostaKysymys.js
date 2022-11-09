import TulostaVastaus from "./TulostaVastaus"

const TulostaKysymys = (props) => {
    return (
        <div className="kysymys">
            <div className="kysymys-rivi">
                {props.onkoOpettaja ?
                    <input type="text" className="kysymys-title text-input" /*onClick={(event) => {
                        props.dispatch({
                            type: "TALLENNA_VANHADATA", payload: {
                                data: event.target.value
                            }
                        })
                    }}*/
                           onChange={(event) => {
                               console.log(event)
                               props.dispatch({
                                   type: "MUUTA_KYSYMYS",
                                   payload: {kysymysIndex: props.index, kysymys: event.target.value}
                               })
                               props.dispatch({
                                   type: "MUUTOKSIA",
                                   payload: true
                               })
                           }}
                           value={props.kysymys.kysymys}
                    />
                    :
                    <>{props.kysymys.kysymys}</>
                }
            </div>
            <div className="vastaukset">
                {props.kysymys.vastaukset.map((vastaus, index) => <TulostaVastaus key={index}
                                                                                  tenttiIndex={props.tenttiIndex}
                                                                                  kysymysIndex={props.index}
                                                                                  vastausIndex={index}
                                                                                  vastaus={vastaus}
                                                                                  dispatch={props.dispatch}
                                                                                  onkoOpettaja={props.onkoOpettaja}
                                                                                  onkoMuutoksia={props.onkoMuutoksia}/>)}
            </div>

            {props.onkoOpettaja &&
                <>
                    <button className="lisaa-vaihtoehto" onClick={(event) => {
                        let vastaus = window.prompt("Anna uusi vaihtoehto:", "")
                        props.dispatch({
                            type: "LISAA_VAIHTOEHTO",
                            payload: {tenttiIndex: props.tenttiIndex, kysymysIndex: props.index, vastaus: vastaus}
                        })
                        props.dispatch({
                            type: "MUUTOKSIA",
                            payload: true
                        })
                    }
                    }>Lisää vaihtoehto
                    </button>

                    <button onClick={(event) => {
                        props.dispatch({
                            type: "POISTA_KYSYMYS",
                            payload: {tenttiIndex: props.tenttiIndex, kysymysIndex: props.index}
                        })
                        props.dispatch({
                            type: "MUUTOKSIA",
                            payload: true
                        })
                    }}>Poista kysymys
                    </button>
                </>
            }
        </div>
    )
}

export default TulostaKysymys