const Oppilas = (props) => {
    return (
        <div>{props.data.nimi}
            <input type="text" onChange={(event) => {
                props.oppilaanNimiMuuttui(event.target.value, props.oppilaanIndex, props.luokanIndex)
            }}
                   value={props.data.nimi}
            />
        </div>
    )
}

export default Oppilas