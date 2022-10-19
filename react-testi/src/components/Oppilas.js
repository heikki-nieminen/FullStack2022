const Oppilas = (props) => {
    return (
        <div><p>{props.data.nimi}</p>
            <input type="text" onChange={(event) => {
                props.dispatch({
                    type: 'OPPILAAN_NIMI_MUUTTUI',
                    payload: {
                        nimi: event.target.value,
                        oppilasIndex: props.oppilaanIndex,
                        luokkaIndex: props.luokanIndex
                    }
                })
            }}
                   value={props.data.nimi}
            />
        </div>
    )
}

export default Oppilas