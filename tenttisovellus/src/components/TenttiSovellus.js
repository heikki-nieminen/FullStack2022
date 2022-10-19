import './styles.css'
import TulostaTentti from "./TulostaTentti"
import {useReducer, useState} from "react"

const reducer = (state, action) => {
    switch (action.type) {
        case "MUUTA_TENTIN_NIMI" : {
            return {...state, nimi: action.payload.nimi}
        }
        case "MUUTA_KYSYMYS" : {
            let tenttiKopio = JSON.parse(JSON.stringify({...state}))
            tenttiKopio.kysymykset[action.payload.kysymysIndex].kysymys = action.payload.kysymys
            console.log("Muutettiin kysymys: ", tenttiKopio)
            return tenttiKopio
        }
        case "MUUTA_VASTAUS" : {
            let tenttiKopio = JSON.parse(JSON.stringify({...state}))
            tenttiKopio.kysymykset[action.payload.kysymysIndex].vastaukset[action.payload.vastausIndex] = action.payload.vastaus
            console.log("Muutettiin vastaus: ", tenttiKopio)
            return tenttiKopio
        }
        case "VAIHDA_TENTTI" : {
            let tenttiKopio = JSON.parse(JSON.stringify({...state}))
            if (action.payload.hasOwnProperty('index')) {
                return action.payload.tentit[action.payload.index]
            }
            let index2 = action.payload.tentit.findIndex(object => {return object.nimi === tenttiKopio.nimi})

            if (index2 < action.payload.tentit.length - 1) {
                return action.payload.tentit[index2 + 1]
            } else {
                return action.payload.tentit[0]
            }
        }
        // React.StrictMode aiheuttaa toisen kutsun
        case "LISAA_VAIHTOEHTO" : {
            let tenttiKopio = JSON.parse(JSON.stringify({...state}))
            //  console.log(tenttiKopio.kysymykset[action.payload.kysymysIndex].vastaukset.length)
            tenttiKopio.kysymykset[action.payload.kysymysIndex].vastaukset.push(action.payload.vastaus)
            console.log("Lisättiin vaihtoehto: ", action.payload.vastaus)
            return tenttiKopio
        }
        case "POISTA_VAIHTOEHTO" : {
            let tenttiKopio = JSON.parse(JSON.stringify({...state}))
            let splice = tenttiKopio.kysymykset[action.payload.kysymysIndex].vastaukset.splice(action.payload.vastausIndex, 1)
            console.log("Poistettiin vaihtoehto: ", splice)
            return tenttiKopio
        }
        case "LISAA_KYSYMYS" : {
            let tenttiKopio = JSON.parse(JSON.stringify({...state}))
            tenttiKopio.kysymykset.push({kysymys: action.payload.kysymys, vastaukset: []})
            console.log("Lisättiin kysymys: ", action.payload.kysymys)
            return tenttiKopio
        }
        case "POISTA_KYSYMYS" : {
            let tenttiKopio = JSON.parse(JSON.stringify({...state}))
            let splice = tenttiKopio.kysymykset.splice(action.payload.kysymysIndex, 1)
            console.log("Poistettiin kysymys: ", splice)
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
    let tentit = [tentti1, tentti2]

    tentit.push({nimi: "Tentti 3", kysymykset: []})
    tentit.push({nimi: "Tentti 4", kysymykset: []})
    tentit.push({nimi: "Tentti 5", kysymykset: []})

    tentti1.kysymykset.push({kysymys: "1. Kysymys", vastaukset: ["vastaus1", "vastaus2", "vastaus3"]})
    tentti1.kysymykset.push({kysymys: "2. Kysymys", vastaukset: ["vastaus1", "vastaus2", "vastaus3", "vastaus4"]})
    tentti1.kysymykset.push({kysymys: "3. Kysymys", vastaukset: ["vastaus1", "vastaus2", "vastaus3"]})

    tentti2.kysymykset.push({kysymys: "1. Kysymys", vastaukset: ["vastaus1", "vastaus2", "vastaus3"]})
    tentti2.kysymykset.push({kysymys: "2. Kysymys", vastaukset: ["vastaus1", "vastaus2", "vastaus3"]})
    tentti2.kysymykset.push({kysymys: "3. Kysymys", vastaukset: ["vastaus1", "vastaus2", "vastaus3"]})

    //const [nykyinenTentti, setNykyinenTentti] = useState(1)
    const [tentti, dispatch] = useReducer(reducer, tentit[0])
    const [opettaja, setOpettaja] = useState(false)

    /*const muutaTentinNimi = (nimi) => {
        setTentti({...tentti, nimi: nimi})
    }

    const muutaKysymys = (kysymysIndex, uusiKysymys) => {
        const uusiTentti = JSON.parse(JSON.stringify(tentti))
        uusiTentti.kysymykset[kysymysIndex].kysymys = uusiKysymys
        setTentti(uusiTentti)
    }

    const muutaVastaus = (kysymysIndex, vastausIndex, uusiVastaus) => {
        const uusiTentti = JSON.parse(JSON.stringify(tentti))
        uusiTentti.kysymykset[kysymysIndex].vastaukset[vastausIndex] = uusiVastaus
        setTentti(uusiTentti)
    }*/

    /*const muutaTentti = () => {
        let index
        if (nykyinenTentti < tentit.length - 1) {
            index = nykyinenTentti + 1
            setNykyinenTentti(index)
        } else {
            index = 0
            setNykyinenTentti(index)
        }
        const tenttiKopio = JSON.parse(JSON.stringify(tentit[index]))
        setTentti(tentit[index])
        console.log(nykyinenTentti)
    }*/

    return (
        <div className="main-content">
            <div className="tentti-lista">
                {tentit.map((tentti, index) => {
                    return (<a key={index} className="link" onMouseOver={(event) => {

                    }}
                               onClick={(event) => {
                                   dispatch({type: "VAIHDA_TENTTI", payload: {tentit: tentit, index: index}})
                               }}>{tentti.nimi}</a>)
                })}
            </div>
            <div className="tentti">
                <button onClick={(event) => {
                    dispatch({type: "VAIHDA_TENTTI", payload: {tentit}})
                }}>Vaihda tenttiä
                </button>

                <button onClick={(event) => {
                    setOpettaja(!opettaja)
                }}>
                    {opettaja ? "Vaihda oppilastilaan" : "Vaihda opettajatilaan"}
                </button>

                <TulostaTentti tentti={tentti} dispatch={dispatch} onkoOpettaja={opettaja}/>
            </div>
        </div>
    )
}

export default TenttiSovellus