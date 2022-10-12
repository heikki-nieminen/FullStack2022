import TulostaVastaus from "./TulostaVastaus"

const TulostaKysymys = (props) => {
    return (
        <div className="kysymys">
            <div>
                <h4 className="kysymys-title">{props.kysymys.kysymys}</h4>
            </div>
            <div className="vastaukset">
                {props.kysymys.vastaukset.map(vastaus => <TulostaVastaus vastaus={vastaus}/>)}
            </div>
        </div>
    )
}

export default TulostaKysymys