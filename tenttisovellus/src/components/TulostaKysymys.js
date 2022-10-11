import TulostaVastaus from "./TulostaVastaus"

const TulostaKysymys = (props) => {

    console.log(props.kysymys.vastaukset)
    return(
        <div>
            <div className="kysymys">
                {props.kysymys.kysymys}
            </div> 
            <div className="vastaukset">
                {props.kysymys.vastaukset.map(vastaus => <TulostaVastaus vastaus={vastaus}/>)}
            </div>
        </div>
    )
}

export default TulostaKysymys