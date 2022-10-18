import TulostaVastaus from "./TulostaVastaus"

const TulostaKysymys = (props) => {
    return (
        <div className="kysymys">
            <div className="kysymys-rivi">
                <input type="text" className="kysymys-title text-input" onChange={(event) => {
                    props.dispatch({
                        type: "MUUTA_KYSYMYS",
                        payload: {kysymysIndex: props.index, kysymys: event.target.value}
                    })
                }}
                       value={props.kysymys.kysymys}
                />
            </div>
            <div className="vastaukset">
                {props.kysymys.vastaukset.map((vastaus, index) => <TulostaVastaus key={index} kysymysIndex={props.index}
                                                                                  vastausIndex={index}
                                                                                  vastaus={vastaus}
                                                                                  dispatch={props.dispatch}/>)}
            </div>
            <button className="lisaa-vaihtoehto" onClick={(event) => {
                console.log("LISÄÄ VAIHTOEHTO???")
                let vastaus = window.prompt("Anna uusi vaihtoehto:", "")
                props.dispatch({
                    type: "LISAA_VAIHTOEHTO",
                    payload: {kysymysIndex: props.index, vastaus: vastaus}
                })
            }
            }>Lisää vaihtoehto
            </button>
            <button onClick={(event) => {
                props.dispatch({
                    type: "POISTA_KYSYMYS",
                    payload: {kysymysIndex: props.index}
                })
            }}>Poista kysymys
            </button>
        </div>
    )
}

export default TulostaKysymys