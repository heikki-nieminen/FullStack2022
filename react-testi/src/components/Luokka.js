import Oppilas from "./Oppilas"
import "./Luokka.css"

const Luokka = (props) => {
    return (
        <div>
            <div className="luokka">
                <h3>{props.data.nimi}</h3>
                Oppilaat: {props.data.oppilaat.map((oppilas, index) =>
                <Oppilas oppilaanNimiMuuttui={props.oppilaanNimiMuuttui} key={index} oppilaanIndex={index}
                         luokanIndex={props.luokanIndex} data={oppilas}/>)}
            </div>
        </div>
    )
}

export default Luokka