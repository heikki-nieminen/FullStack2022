import './styles.css'
import TulostaTentti from "./TulostaTentti"

const TenttiSovellus = () => {
    let tentti1 = {nimi: "Tentti 1", kysymykset: []}
    let tentti2 = {nimi: "Tentti 2", kysymykset: []}
    let tentit = [tentti1, tentti2]

    tentit.push({nimi: "Tentti 3", kysymykset: []})

    let valittuTentti = tentti1

    tentti1.kysymykset.push({kysymys: "1. Kysymys", vastaukset: ["vastaus1", "vastaus2", "vastaus3"]})
    tentti1.kysymykset.push({kysymys: "2. Kysymys", vastaukset: ["vastaus1", "vastaus2", "vastaus3", "vastaus4"]})
    tentti1.kysymykset.push({kysymys: "3. Kysymys", vastaukset: ["vastaus1", "vastaus2", "vastaus3"]})

    tentti2.kysymykset.push({kysymys: "1. Kysymys", vastaukset: ["vastaus1", "vastaus2", "vastaus3"]})
    tentti2.kysymykset.push({kysymys: "2. Kysymys", vastaukset: ["vastaus1", "vastaus2", "vastaus3"]})
    tentti2.kysymykset.push({kysymys: "3. Kysymys", vastaukset: ["vastaus1", "vastaus2", "vastaus3"]})

    return (
        <div className="main-content">
            <div className="tentti-lista">
                {tentit.map(tentti => {
                    return (<a className="link" href={tentti.nimi.replace(' ', '')}>{tentti.nimi}</a>)
                })}
            </div>
            <div className="tentti">
                <TulostaTentti tentti={valittuTentti}/>
            </div>
        </div>
    )
}

export default TenttiSovellus