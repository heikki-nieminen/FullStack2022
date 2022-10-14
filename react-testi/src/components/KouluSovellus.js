import Koulu from "./Koulu"
import "./KouluSovellus.css"
import {useState} from "react"

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

const KouluSovellus = () => {

    const [koulu2, setKoulu] = useState(koulu)

    const koulunNimiMuuttui = (nimi) => {
        const kouluKopio = JSON.parse(JSON.stringify(koulu2))
        kouluKopio.nimi = nimi
        setKoulu(kouluKopio)
    }

    const oppilaanNimiMuuttui = (nimi, oppilasIndex, luokkaIndex) => {
        const kouluKopio = JSON.parse(JSON.stringify(koulu2))
        kouluKopio.luokat[luokkaIndex].oppilaat[oppilasIndex].nimi = nimi
        setKoulu(kouluKopio);
    }

    return (
        <div>
            <div className="title">{<Koulu koulu={koulu2} koulunNimiMuuttui={koulunNimiMuuttui}
                                           oppilaanNimiMuuttui={oppilaanNimiMuuttui}/>}</div>

        </div>
    )
}

export default KouluSovellus
