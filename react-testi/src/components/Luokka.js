import Oppilas from "./Oppilas"
import "./Luokka.css"

const Luokka = (props) => {
    return (
        <div>
            <div className="luokka">
            <h3>{props.data.nimi}</h3>
            Oppilaat: {props.data.oppilaat.map(oppilas => <Oppilas data={oppilas} />)}
            </div>
        </div>
    )
}

export default Luokka