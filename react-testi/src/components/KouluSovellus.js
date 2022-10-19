import Koulu from "./Koulu"
import "./KouluSovellus.css"
import {useEffect, useReducer} from "react"

let oppilas1 = {nimi: "Olli Oppilas"}

let oppilas2 = {nimi: "Kalle Oppilas"}

let oppilas3 = {nimi: "Mikko Mallikas"}

let luokka1 = {
    nimi: "3B",
    oppilaidenMäärä: 25,
    oppilaat: [oppilas2]
}

let luokka2 = {
    nimi: "3A",
    oppilaidenMäärä: 27,
    oppilaat: [oppilas1, oppilas3]
}

let koulu = {
    oppilaidenMäärä: 100,
    nimi: "Kangasalan ala-aste",
    luokat: [luokka2, luokka1],
    tallennus: false,
    tietoAlustettu: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'KOULUN_NIMI_MUUTTUI' : {
            return {...state, nimi: action.payload.nimi, tallennus: true}
        }
        case 'OPPILAAN_NIMI_MUUTTUI' : {
            let koulukopio = {...state}
            koulukopio.luokat[action.payload.luokkaIndex].oppilaat[action.payload.oppilasIndex].nimi = action.payload.nimi
            return {...koulukopio, tallennus: true}
        }
        case "ALUSTA_DATA": {
            return {...action.payload, tietoAlustettu: true}
        }
        case "PÄIVITÄ_TALLENNUSTILA" : {
            return {...state, tallennus: action.payload}
        }
        default: {
            throw new Error("VIRHE")
        }
    }
}

const KouluSovellus = () => {
    const [koulu2, dispatch] = useReducer(reducer, koulu)

    useEffect(() => {
        let kouluData = localStorage.getItem('kouludata')
        if (kouluData == null) {
            localStorage.setItem('kouludata', JSON.stringify(koulu))
            dispatch({type: "ALUSTA_DATA", payload: koulu})
        } else {
            console.log("Haetaan vanha data")
            dispatch({type: "ALUSTA_DATA", payload: (JSON.parse(kouluData))})
        }
    }, [])

    useEffect(() => {
        if (koulu2.tallennus === true) {
            console.log("TALLENNUS")
            localStorage.setItem('kouludata', JSON.stringify(koulu2))
            dispatch({type: "PÄIVITÄ_TALLENNUSTILA", payload: false})
        }

    }, [koulu2.tallennus])
    /*const koulunNimiMuuttui = (nimi) => {
        /!*const kouluKopio = JSON.parse(JSON.stringify(koulu2))
        kouluKopio.nimi = nimi*!/
        setKoulu({...koulu2, nimi: nimi})
    }

    const oppilaanNimiMuuttui = (nimi, oppilasIndex, luokkaIndex) => {
        /!*const kouluKopio = JSON.parse(JSON.stringify(koulu2))
        kouluKopio.luokat[luokkaIndex].oppilaat[oppilasIndex].nimi = nimi*!/

        let kouluKopio = {...koulu2}
        let luokatKopio = [...koulu2.luokat]
        let oppilaatKopio = [...koulu2.luokat[luokkaIndex].oppilaat]
        oppilaatKopio[oppilasIndex].nimi = nimi

        kouluKopio.luokat = luokatKopio
        luokatKopio.oppilaat = oppilaatKopio

        setKoulu(kouluKopio)
    }*/

    return (
        <div>
            <div className="title">
                {koulu2.tietoAlustettu &&
                    <Koulu koulu={koulu2} dispatch={dispatch}/>
                }
            </div>
        </div>
    )
}

export default KouluSovellus

