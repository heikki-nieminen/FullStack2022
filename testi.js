const biggerThanHundred = (number) => {
  if (typeof number != "number") {
    return "Syötä luku"
  } else if (number > 100) {
    return "Syötit luvun, joka on suurempi kuin 100"
  } else {
    return ""
  }
}

console.log(biggerThanHundred(101))

const toSeconds = (hours, minutes, seconds) => {
  return seconds + 60 * minutes + 3600 * hours
}

console.log(toSeconds(4, 22, 45))

const weekDay = (day) => {
  switch (day) {
    case 7:
      return "sunnuntai"
    case 6:
      return "lauantai"
    case 5:
      return "perjantai"
    case 4:
      return "torstai"
    case 3:
      return "keskiviikko"
    case 2:
      return "tiistai"
    case 1:
      return "maanantai"
    default:
      return "en tunnista päivää"
  }
}

console.log(weekDay(9))

lista = ["dawdasw", "asdaweccxzv", "fhsadkjfhas"]

listaUpper = lista.map((item) => item.toUpperCase())

console.log(listaUpper)

nimet = [
  { etunimi: "pekka", sukunimi: "hannula" },
  { etunimi: "liisa", sukunimi: "liisala" },
  { etunimi: "kalle", sukunimi: "testi" },
  { etunimi: "olli", sukunimi: "testi2" },
]

nimetIsolla = nimet.map((item) => {
  return { ...item, etunimi: item.etunimi.replace(item.etunimi[0], item.etunimi[0].toUpperCase()) }
})
console.log(nimetIsolla)

nimetIsolla2 = nimet.map((item) => {
  return {
    ...item,
    etunimi: item.etunimi.charAt(0).toUpperCase() + item.etunimi.slice(1),
    sukunimi: item.sukunimi.charAt(0).toUpperCase() + item.sukunimi.slice(1),
  }
})
console.log(nimetIsolla2)

isoAlkukirjain = nimet.map((item) => {
  return {}
})

console.log(nimet)
console.log(nimetIsolla)

// Esimerkki siitä, että muuttuja, joka on luotu filtterillä, osoittaa edelleen alkuperäiseen muuttujaan

const taulukkoConst = [{ ma: 10 }, { ti: 15 }, { ke: 18 }]

let taulukkoFilter = taulukkoConst.filter((alkio) => Object.values(alkio)[0] % 2 === 0)

taulukkoFilter[0]["ma"] = 200

console.log(taulukkoConst)
console.log(taulukkoFilter)

/*
[ { ma: 200 }, { ti: 15 }, { ke: 18 } ]
[ { ma: 200 }, { ke: 18 } ]
*/

// Koulu, Luokat, Oppilaat
let oppilas1 = {
  nimi: "Olli Oppilas",
}

let oppilas2 = {
  nimi: "Kalle Oppilas",
}

let oppilas3 = {
  nimi: "Mikko Mallikas",
}

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
  luokat: [luokka1, luokka2],
}

const Koulu = (koulu) => {
  let luokat = koulu.luokat.map((luokka) => Luokka(luokka)).join("")
  return `<h1>${koulu.nimi}</h1>${luokat}`
}

const Luokka = (luokka) => {
  return `<h2>Luokan nimi:${luokka.nimi}</h2> <div>Oppilaat:${luokka.oppilaat
    .map((oppilas) => Oppilas(oppilas))
    .join("")}</div>`
}

const Oppilas = (oppilas) => {
  return `<p>Oppilaan nimi:${oppilas.nimi}</p>`
}

console.log(Koulu(koulu))
