import TulostaKysymys from "./TulostaKysymys"

const TulostaTentti = (props) => {
    return (
        <div className="tentti">
            {props.onkoOpettaja ?
                <input type="text" className="" onChange={(event) => {
                    props.dispatch({
                        type: "MUUTA_TENTIN_NIMI",
                        payload: {tenttiIndex: props.tenttiIndex, nimi: event.target.value}
                    })
                }}
                       value={props.tentti.nimi}
                />
                :
                <h3 className="tentti-title">{props.tentti.nimi}</h3>
            }
            {props.tentti.kysymykset.map((kysymys, index) => <TulostaKysymys kysymys={kysymys} key={index}
                                                                             tenttiIndex={props.tenttiIndex}
                                                                             index={index}
                                                                             dispatch={props.dispatch}
                                                                             onkoOpettaja={props.onkoOpettaja}/>)}
            {props.onkoOpettaja ?
                <>
                    <button onClick={(event) => {
                        let kysymys = window.prompt("Anna uusi kysymys:", "")
                        props.dispatch({
                            type: "LISAA_KYSYMYS",
                            payload: {kysymys: kysymys, tenttiIndex: props.tenttiIndex}
                        })
                    }}>Lisää kysymys
                    </button>
                    <button className="right" onClick={(event) => {
                        props.dispatch({
                            type: "TALLENNA_TENTTI",
                            payload: {index: props.tenttiIndex}
                        })
                    }
                    }>Tallenna tentti
                    </button>
                </>
                :
                <button>Palauta vastaukset</button>
            }

        </div>
    )

}

export default TulostaTentti