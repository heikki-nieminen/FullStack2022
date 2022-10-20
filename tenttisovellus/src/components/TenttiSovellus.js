import './styles.css'
import TulostaTentti from "./TulostaTentti"
import {useEffect, useReducer, useState} from "react"

const reducer = (state, action) => {
    switch (action.type) {
        case "ALUSTA_DATA" : {
            let data = action.payload
            data.tietoAlustettu = true
            return data
        }
        case "PÄIVITÄ_TALLENNUSTILA" : {
            return {...state, tallennus: action.payload}
        }
        case "MUUTA_TENTIN_NIMI" : {
            let tenttiKopio = JSON.parse(JSON.stringify({...state}))
            tenttiKopio.nimi = action.payload.nimi
            return tenttiKopio
        }
        case "MUUTA_KYSYMYS" : {
            let tenttiKopio = JSON.parse(JSON.stringify({...state}))
            tenttiKopio.kysymykset[action.payload.kysymysIndex].kysymys = action.payload.kysymys
            return tenttiKopio
        }
        case "MUUTA_VASTAUS" : {
            let tenttiKopio = JSON.parse(JSON.stringify({...state}))
            tenttiKopio.kysymykset[action.payload.kysymysIndex].vastaukset[action.payload.vastausIndex] = action.payload.vastaus
            return tenttiKopio
        }
        case "VAIHDA_TENTTI" : {
            console.log("Uusi tentti index: ", action.payload.nykyinenTentti)
            console.log(action.payload.tentit[action.payload.nykyinenTentti])
            return {...action.payload.tentit[action.payload.nykyinenTentti]}
        }

        case "LISAA_VAIHTOEHTO" : {
            let tenttiKopio = JSON.parse(JSON.stringify({...state}))
            tenttiKopio.kysymykset[action.payload.kysymysIndex].vastaukset.push(action.payload.vastaus)
            return tenttiKopio
        }
        case "POISTA_VAIHTOEHTO" : {
            let tenttiKopio = JSON.parse(JSON.stringify({...state}))
            tenttiKopio.kysymykset[action.payload.kysymysIndex].vastaukset.splice(action.payload.vastausIndex, 1)
            return tenttiKopio
        }
        case "LISAA_KYSYMYS" : {
            let tenttiKopio = JSON.parse(JSON.stringify({...state}))
            tenttiKopio.kysymykset.push({
                kysymys: action.payload.kysymys,
                vastaukset: []
            })
            return tenttiKopio
        }
        case "POISTA_KYSYMYS" : {
            let tenttiKopio = JSON.parse(JSON.stringify({...state}))
            tenttiKopio.kysymykset.splice(action.payload.kysymysIndex, 1)
            return tenttiKopio
        }
        case "TALLENNA_TENTTI" : {
            console.log("TALLENNUKSEEN!!!!!")
            let tenttiKopio = JSON.parse(JSON.stringify({...state}))
            tenttiKopio.tallennus = true
            return tenttiKopio
        }
        default : {
            throw new Error("VIRHE")
        }
    }
}

const TenttiSovellus = () => {

    let tentti1 = {nimi: "Tentti 1", kysymykset: []}
    let tentti2 = {nimi: "Tentti 2", kysymykset: []}

    let tentitArray = [tentti1, tentti2]

    tentitArray.push({nimi: "Tentti 3", kysymykset: []})

    tentti1.kysymykset.push({kysymys: "1. Kysymys", vastaukset: ["vastaus1", "vastaus2", "vastaus3"]})
    tentti1.kysymykset.push({kysymys: "2. Kysymys", vastaukset: ["vastaus1", "vastaus2", "vastaus3", "vastaus4"]})
    tentti1.kysymykset.push({kysymys: "3. Kysymys", vastaukset: ["vastaus1", "vastaus2", "vastaus3"]})

    tentti2.kysymykset.push({kysymys: "1. Kysymys", vastaukset: ["vastaus1", "vastaus2", "vastaus3"]})
    tentti2.kysymykset.push({kysymys: "2. Kysymys", vastaukset: ["vastaus1", "vastaus2", "vastaus3"]})
    tentti2.kysymykset.push({kysymys: "3. Kysymys", vastaukset: ["vastaus1", "vastaus2", "vastaus3"]})

    const [nykyinenTentti, setNykyinenTentti] = useState(0)
    const [tentti, dispatch] = useReducer(reducer, tentitArray[nykyinenTentti])
    const [opettaja, setOpettaja] = useState(false)

    useEffect(() => {
        let tenttiData = localStorage.getItem(`tenttidata-${nykyinenTentti}`)
        if (tenttiData === null) {
            console.log("Luodaan local storage")
            tentitArray.map((tentti, index) => {
                tentti.tallennus = false
                tentti.tietoAlustettu = false
                localStorage.setItem(`tenttidata-${index}`, JSON.stringify(tentitArray[index]))
                dispatch({type: "ALUSTA_DATA", payload: tentti})
            })

        } else {
            dispatch({type: "ALUSTA_DATA", payload: (JSON.parse(tenttiData))})
        }
    }, [nykyinenTentti])

    useEffect(() => {
        if (tentti.tallennus === true) {
            dispatch({type: "PÄIVITÄ_TALLENNUSTILA", payload: false})
            localStorage.setItem(`tenttidata-${nykyinenTentti}`, JSON.stringify(tentti))
        }
    }, [tentti.tallennus])

    return (
        <div className="main-content">
            <div className="tentti">
                <button onClick={(event) => {
                    if (nykyinenTentti < tentitArray.length - 1) {
                        setNykyinenTentti(nykyinenTentti + 1)
                    } else {
                        setNykyinenTentti(0)
                    }
                }}>Vaihda tenttiä
                </button>

                <button onClick={(event) => {
                    setOpettaja(!opettaja)
                }}>
                    {opettaja ? "Vaihda oppilastilaan" : "Vaihda opettajatilaan"}
                </button>

                {tentti.tietoAlustettu && <TulostaTentti tentti={tentti}
                                                         tenttiIndex={nykyinenTentti}
                                                         dispatch={dispatch} onkoOpettaja={opettaja}/>}
            </div>
        </div>
    )
}

export default TenttiSovellus