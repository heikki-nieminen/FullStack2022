import './styles.css'
import TulostaTentti from "./TulostaTentti"
import {useEffect, useReducer, useState} from "react"
import Muutokset from "./Muutokset"

const reducer = (state, action) => {
    switch (action.type) {
        case "ALUSTA_DATA" : {
            let data = action.payload
            data.tietoAlustettu = true
            return data
        }
        case "PÄIVITÄ_TALLENNUSTILA" : {
            let tenttiKopio = JSON.parse(JSON.stringify({...state}))
            tenttiKopio.tallennus = action.payload
            return tenttiKopio
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
        /*        case "VAIHDA_TENTTI" : {
                    console.log("Uusi tentti index: ", action.payload.nykyinenTentti)
                    console.log(action.payload.tentit[action.payload.nykyinenTentti])
                    return {...action.payload.tentit[action.payload.nykyinenTentti]}
                }*/

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

        case "MUUTOKSIA" : {
            let tenttiKopio = JSON.parse(JSON.stringify({...state}))
            return {...tenttiKopio, onkoMuutoksia: action.payload}
        }
        /* Näytä muutettu data(vanha ja uusi), tyhjennä tallennuksen yhteydessä
        * Muutokset muotoa kysymysIndex, (vastausIndex)
        *
        *
        *
        *
        * */
        /*        case "MUUTOKSIA" : {
                    console.log("Muutoksia")
                    let {kysymysIndex, vastausIndex} = action.payload
                    let tenttiKopio = JSON.parse(JSON.stringify({...state}))
                    let data, vanhaData
                    // Jos saatiin kysymysIndex
                    if (kysymysIndex !== null && kysymysIndex !== undefined) {
                        if (vastausIndex !== null && vastausIndex !== undefined) {
                            vanhaData = tenttiKopio.muutokset.vanhadata.kysymykset[kysymysIndex].vastaukset[vastausIndex]
                            data = tenttiKopio.kysymykset[kysymysIndex].vastaukset[vastausIndex]
                        } else {
                            vanhaData = tenttiKopio.muutokset.vanhadata.kysymykset[kysymysIndex].kysymys
                            data = tenttiKopio.kysymykset[kysymysIndex].kysymys
                        }
                    }
                    tenttiKopio.muutokset.uusidata = {
                        vanha: vanhaData,
                        uusi: data
                    }
                    //tenttiKopio.muutokset.uusidata = {testi: "testi"}
                    tenttiKopio.onkoMuutoksia = true
                    console.log(tenttiKopio)
                    return tenttiKopio
                }
                case "TALLENNA_VANHADATA" : {
                    let tenttiKopio = JSON.parse(JSON.stringify({...state}))
                    //if (tenttiKopio.muutokset.nimi)
                    let data = action.payload.data

                    console.log(tenttiKopio)
                    return tenttiKopio
                }*/
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
    const [onkoMuutoksia, setOnkoMuutoksia] = useState(false)

    useEffect(() => {
        let tenttiData = localStorage.getItem(`tenttidata-${nykyinenTentti}`)
        if (tenttiData === null) {
            console.log("Luodaan local storage")
            tentitArray.map((tentti, index) => {
                tentti.tallennus = false
                tentti.tietoAlustettu = false
                tentti.onkoMuutoksia = false
                tentti.ajastinID = ''
                /*              tentti.muutokset = {vanhadata: {}, uusidata: {}}
                                tentti.muutokset.vanhadata = JSON.parse(JSON.stringify(tentti))
                                delete tentti.muutokset.vanhadata.muutokset*/
                localStorage.setItem(`tenttidata-${index}`, JSON.stringify(tentitArray[index]))
                dispatch({type: "ALUSTA_DATA", payload: tentti})
            })

        } else {
            dispatch({type: "ALUSTA_DATA", payload: (JSON.parse(tenttiData))})
        }
    }, [nykyinenTentti])

    useEffect(() => {

    }, [])

// ????????????????????????????? Laita clearTimeout toimimaan!!!!!!

    useEffect(() => {

    })

    useEffect(() => {
        console.log("onko muutoksia: ", tentti.onkoMuutoksia)
        console.log("onko tallennus: ", tentti.tallennus)

        if (tentti.onkoMuutoksia === true) {
            tentti.onkoMuutoksia = false
            if (!tentti.ajastinID) {
                tentti.ajastinID = setTimeout(() => {
                    setOnkoMuutoksia(true)
                    console.log("CLEARED TIMEOUT ID: ", tentti.ajastinID)
                    clearTimeout(tentti.ajastinID)
                    tentti.ajastinID = ""
                }, 4000)
                console.log("TIMEOUT ID: ", tentti.ajastinID)
            }

        }
        console.log(tentti.ajastinID)
        if (tentti.tallennus === true) {
            /*          tentti.muutokset = {vanhadata: {}, uusidata: {}}
                        tentti.muutokset.vanhadata = JSON.parse(JSON.stringify(tentti))
                        delete tentti.muutokset.vanhadata.muutokset*/
            dispatch({type: "PÄIVITÄ_TALLENNUSTILA", payload: false})
            tentti.tallennus = false
            setOnkoMuutoksia(false)
            tentti.onkoMuutoksia = false
            console.log("CLEARED: ", tentti.ajastinID)

            clearTimeout(tentti.ajastinID)
            tentti.ajastinID = ""
            localStorage.setItem(`tenttidata-${nykyinenTentti}`, JSON.stringify(tentti))

        } else {
            console.log("EI TALLENNETA KUN EI OLE MUUTOKSIA")
        }
    }, [tentti.onkoMuutoksia, tentti.tallennus])

    return (
        <div className="main-content">
            <div className="tentti">
                <button className="vaihda-tentti"
                        onClick={(event) => {(nykyinenTentti < (tentitArray.length - 1)) ? setNykyinenTentti(nykyinenTentti + 1) : setNykyinenTentti(0)}}>
                    Vaihda tenttiä
                </button>

                <button onClick={(event) => {
                    setOpettaja(!opettaja)
                }}>
                    {opettaja ? "Vaihda oppilastilaan" : "Vaihda opettajatilaan"}
                </button>

                {tentti.tietoAlustettu && <TulostaTentti tentti={tentti}
                                                         tenttiIndex={nykyinenTentti}
                                                         dispatch={dispatch}
                                                         onkoOpettaja={opettaja}
                                                         onkoMuutoksia={setOnkoMuutoksia}/>}
            </div>
            <div className="muutokset">
                {onkoMuutoksia &&
                    <Muutokset/>
                }
            </div>
        </div>
    )
}

export default TenttiSovellus