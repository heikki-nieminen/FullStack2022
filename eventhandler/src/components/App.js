import {useState} from "react"

const App = () => {
    const [tila, setTila] = useState(true)
    console.log("Tila: " + tila)
    return (
        <div>
            <input type="checkbox" value={tila} checked={tila} onChange={(event) => {
                console.log(`Checkboxin arvo: ${event.target.checked}`)
                setTila(event.target.checked)
            }}/>
            <p>
                Tila: {tila ? "Valittu" : "Ei valittu"}
            </p>
            <button onClick={() => {
                setTila(!tila)
            }}>Muuta tilaa
            </button>
        </div>
    )
}

export default App