import Luokka from "./Luokka"

const Koulu = (props) => {
    return (
        <div>
            <h1>{props.koulu.nimi}</h1>
            <p>Oppilaiden lukumäärä:{props.koulu.oppilaidenMäärä}</p>
            <input type="text" onChange={(event) => {
                props.dispatch({type: 'KOULUN_NIMI_MUUTTUI', nimi: event.target.value})
            }}
                   defaultValue={props.koulu.nimi}
            />
            <div className="luokat">{props.koulu.luokat.map((luokka, index) => <Luokka
                dispatch={props.dispatch} key={index} luokanIndex={index} data={luokka}/>)}</div>
        </div>
    )
}

export default Koulu