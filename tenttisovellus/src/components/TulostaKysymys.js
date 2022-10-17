import TulostaVastaus from "./TulostaVastaus"

const TulostaKysymys = (props) => {
    return (
        <div className="kysymys">
            <div className="kysymys-rivi">
                <h4 className="kysymys-title">{props.kysymys.kysymys}</h4>
                <input type="text" className="text-input" onChange={(event) => {
                    props.muutaKysymys(props.index, event.target.value)
                }}
                       value={props.kysymys.kysymys}
                />
            </div>
            <div className="vastaukset">
                {props.kysymys.vastaukset.map((vastaus, index) => <TulostaVastaus key={index} kysymysIndex={props.index}
                                                                                  vastausIndex={index}
                                                                                  vastaus={vastaus}
                                                                                  muutaVastaus={props.muutaVastaus}/>)}
            </div>
        </div>
    )
}

export default TulostaKysymys