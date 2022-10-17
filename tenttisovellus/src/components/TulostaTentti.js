import TulostaKysymys from "./TulostaKysymys"

const TulostaTentti = (props) => {

    return (
        <div className="tentti">
            <h3 className="tentti-title">{props.tentti.nimi}</h3>
            <input type="text" className="" onChange={(event) => {
                props.muutaTentinNimi(event.target.value)
            }}
                   value={props.tentti.nimi}
            />

            {props.tentti.kysymykset.map((kysymys, index) => <TulostaKysymys kysymys={kysymys} key={index} index={index}
                                                                             muutaKysymys={props.muutaKysymys}
                                                                             muutaVastaus={props.muutaVastaus}/>)}

        </div>
    )
}

export default TulostaTentti