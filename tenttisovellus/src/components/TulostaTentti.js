import TulostaKysymys from "./TulostaKysymys"

const TulostaTentti = (props) => {
    return (
        <div className="tentti">
            {props.onkoOpettaja ?
                <input type="text" className="" onChange={(event) => {
                    props.dispatch({type: "MUUTA_TENTIN_NIMI", payload: {nimi: event.target.value}})
                }}
                       value={props.tentti.nimi}
                />
                :
                <h3 className="tentti-title">{props.tentti.nimi}</h3>
            }

            {props.tentti.kysymykset.map((kysymys, index) => <TulostaKysymys kysymys={kysymys} key={index}
                                                                             index={index}
                                                                             dispatch={props.dispatch}
                                                                             onkoOpettaja={props.onkoOpettaja}/>)}
            {props.onkoOpettaja ?
                <>
                    <button onClick={(event) => {
                        let kysymys = window.prompt("Anna uusi kysymys:", "")
                        props.dispatch({
                            type: "LISAA_KYSYMYS",
                            payload: {kysymys: kysymys}
                        })
                    }}>Lisää kysymys
                    </button>
                    <button className="right">Tallenna tentti</button>
                </>
                :
                <button>Palauta vastaukset</button>
            }

        </div>
    )

}

export default TulostaTentti