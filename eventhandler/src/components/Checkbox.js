const Checkbox = () => {
    return (
        <div>
            <input type="checkbox" onChange={(event) => {
                console.log(`Checkboxin arvo: ${event.target.checked}`)
            }}/>
        </div>
    )
}

export default Checkbox