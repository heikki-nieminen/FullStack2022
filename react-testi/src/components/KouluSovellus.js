import Koulu from "./Koulu"
import Luokka from "./Luokka"
import "./KouluSovellus.css"

const KouluSovellus = () => {
  let oppilas1 = { nimi: "Olli Oppilas" }

  let oppilas2 = { nimi: "Kalle Oppilas" }

  let oppilas3 = { nimi: "Mikko Mallikas" }

  let luokka1 = {
    nimi: "3B",
    oppilaidenMäärä: 25,
    oppilaat: [oppilas2],
  }

  let luokka2 = {
    nimi: "3A",
    oppilaidenMäärä: 27,
    oppilaat: [oppilas1, oppilas3],
  }

  let koulu = {
    oppilaidenMäärä: 100,
    nimi: "Kangasalan ala-aste",
    luokat: [luokka2, luokka1],
  }

  return (
    <div>
      <div className="title">{Koulu(koulu)}</div>
      <div className="luokat">{koulu.luokat.map(luokka => <Luokka data={luokka} />)}</div>
    </div>
  )
}

export default KouluSovellus
