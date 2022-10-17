import './styles.css'
import TulostaTentti from "./TulostaTentti"
import {useState} from "react"

const TenttiSovellus = () => {

    let tentti1 = {nimi: "Tentti 1", kysymykset: []}
    let tentti2 = {nimi: "Tentti 2", kysymykset: []}
    let tentit = [tentti1, tentti2]

    tentit.push({nimi: "Tentti 3", kysymykset: []})

    tentti1.kysymykset.push({kysymys: "1. Kysymys", vastaukset: ["vastaus1", "vastaus2", "vastaus3"]})
    tentti1.kysymykset.push({kysymys: "2. Kysymys", vastaukset: ["vastaus1", "vastaus2", "vastaus3", "vastaus4"]})
    tentti1.kysymykset.push({kysymys: "3. Kysymys", vastaukset: ["vastaus1", "vastaus2", "vastaus3"]})

    tentti2.kysymykset.push({kysymys: "1. Kysymys", vastaukset: ["vastaus1", "vastaus2", "vastaus3"]})
    tentti2.kysymykset.push({kysymys: "2. Kysymys", vastaukset: ["vastaus1", "vastaus2", "vastaus3"]})
    tentti2.kysymykset.push({kysymys: "3. Kysymys", vastaukset: ["vastaus1", "vastaus2", "vastaus3"]})

    const [nykyinenTentti, setNykyinenTentti] = useState(0)
    const [tentti, setTentti] = useState(tentit[nykyinenTentti])

    const muutaTentinNimi = (nimi) => {
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
    }

    const muutaTentti = () => {
        let temp
        if (nykyinenTentti < tentit.length - 1) {
            temp = nykyinenTentti + 1
            setNykyinenTentti(temp)
        } else {
            temp = 0
            setNykyinenTentti(temp)
        }
        const tenttiKopio = JSON.parse(JSON.stringify(tentit[temp]))
        setTentti(tenttiKopio)
    }

    return (
        <div className="main-content">
            <div className="tentti-lista">
                {tentit.map((tentti, index) => {
                    return (<a key={index} className="link" href={tentti.nimi.replace(' ', '')}>{tentti.nimi}</a>)
                })}
            </div>
            <div className="tentti">
                <button onClick={(event) => {
                    muutaTentti()
                }}>{tentti.nimi}</button>
                <TulostaTentti tentti={tentti} muutaTentinNimi={muutaTentinNimi} muutaKysymys={muutaKysymys}
                               muutaVastaus={muutaVastaus}/>
            </div>
        </div>
    )
}

export default TenttiSovellus