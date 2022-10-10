import Oppilas from "./Oppilas"

const Luokka = (props) => {
    return (
        <div>
            <h2>Luokan nimi: {props.data.nimi}</h2>
            <p>Oppilaat: {props.data.oppilaat.map(oppilas => <Oppilas data={oppilas} />)}</p>
        </div>
    )
}

export default Luokka