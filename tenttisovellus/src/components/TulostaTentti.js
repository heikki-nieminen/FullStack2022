import TulostaKysymys from "./TulostaKysymys"

const TulostaTentti = (props) => {

    return (
        <div className="tentti">
            <h3 className="tentti-title">{props.tentti.nimi}</h3>
            <input type="text" className="" onChange={(event) => {
                props.dispatch({type: "MUUTA_TENTIN_NIMI", payload: {nimi: event.target.value}})
            }}
                   value={props.tentti.nimi}
            />

            {props.tentti.kysymykset.map((kysymys, index) => <TulostaKysymys kysymys={kysymys} key={index} index={index}
                                                                             dispatch={props.dispatch}/>)}

            <button onClick={(event) => {
                let kysymys = window.prompt("Anna uusi kysymys:", "")
                props.dispatch({
                    type: "LISAA_KYSYMYS",
                    payload: {kysymys: kysymys}
                })
            }}>Lisää kysymys
            </button>
        </div>
    )
}

export default TulostaTentti