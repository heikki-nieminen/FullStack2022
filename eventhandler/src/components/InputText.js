const InputText = () => {
    return (
        <div
            onClick={() => {
                console.log("DIV CLICK")
            }}
            onClickCapture={() => {
                console.log("DIV CAPTURE")
            }}
            onMouseOver={() => {
                console.log("Hiiri päällä")
            }}
        >
            <input type="text" onChange={(event) => {
                console.log(`Tekstikentässä lukee: ${event.target.value}`)
            }}/>
        </div>
    )
}

export default InputText