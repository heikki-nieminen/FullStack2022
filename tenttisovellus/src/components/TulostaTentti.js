import TulostaKysymys from "./TulostaKysymys"

const TulostaTentti = (props) => {

    return (
        <div className="tentti">
            <h3 className="tentti-title">{props.tentti.nimi}</h3>
            {props.tentti.kysymykset.map(kysymys => <TulostaKysymys kysymys={kysymys}/>)}
        </div>
    )
}

export default TulostaTentti