import Koulu from "./Koulu"
import "./KouluSovellus.css"
import {useReducer} from "react"

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
    luokat: [luokka2, luokka1]
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'KOULUN_NIMI_MUUTTUI' : {
            return {...state, nimi: action.nimi}
        }
        case 'OPPILAAN_NIMI_MUUTTUI' : {
            let koulukopio = {...state}
            koulukopio.luokat[action.luokkaIndex].oppilaat[action.oppilasIndex].nimi = action.nimi
            return koulukopio
        }
    }
}

const KouluSovellus = () => {
    const [koulu2, dispatch] = useReducer(reducer, koulu)

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
            <div className="title">{<Koulu koulu={koulu2} dispatch={dispatch}/>}</div>
        </div>
    )
}

export default KouluSovellus

