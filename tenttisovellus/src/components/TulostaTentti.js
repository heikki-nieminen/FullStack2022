import TulostaKysymys from "./TulostaKysymys"

const TulostaTentti = (props) => {

    return <div>
               {props.tentti.nimi}
               {props.tentti.kysymykset.map(kysymys => <TulostaKysymys kysymys={kysymys} />)}
            </div>
}

export default TulostaTentti