// 2.1

/*
Tee ohjelma, joka tallentaa yhden viikon viikonpäivät ja niitä vastaavat työtunnit
taulukkoon. Voit keksiä päiville haluamasi työtunnit, rehellinen pitää kuitenkin olla.
*/

const työpäiväTaulukko = (...tunnit) => {
  let taulukko = []
  tunnit.forEach((key, index) => (taulukko[index] = key))
  return taulukko
}

console.log(työpäiväTaulukko(7, 7, 6, 6, 7))

// 2.2

/*
Tee tehtävän 2.1 ohjelmaan lisäominaisuus, joka laskee työtuntien keskiarvon
a) for-rakenteen (forEach, for-silmukka tai for of) avulla
b) reduce -funktiolla
*/

// a

const työtuntienKeskiarvoFor = (taulukko) => {
  let summa = 0
  taulukko.forEach((value) => (summa += value))
  return summa / taulukko.length
}

console.log(työtuntienKeskiarvoFor(työpäiväTaulukko(7, 7, 6, 6, 7)))

// b

const työtuntienKeskiarvoReduce = (taulukko) => {
  return taulukko.reduce((acc, current) => acc + current, 0) / taulukko.length
}

console.log(työtuntienKeskiarvoReduce(työpäiväTaulukko(7, 7, 6, 6, 7)))

// 2.3

/* 
Lisää ohjelmaan 2.2 minimin ja maksimin selvittävä osuus.
a) for-rakenteen (forEach, for-silmukka tai for of) avulla
b) reduce -funktiolla 
*/

// a

const minmaxTyötunnitFor = (taulukko) => {
  let min = taulukko[0]
  let max = taulukko[0]
  taulukko.forEach((value) => {
    if (value < min) min = value
    else if (value > max) max = value
  })
  return `Minimi: ${min}, Maksimi: ${max}`
}

console.log(minmaxTyötunnitFor(työpäiväTaulukko(7, 7, 6, 6, 7)))

//b

const minmaxTyötunnitReduce = (taulukko) => {
  let min = taulukko.reduce((acc, current) => (current < acc ? current : acc))
  let max = taulukko.reduce((acc, current) => (current > acc ? current : acc))
  return `Minimi: ${min}, Maksimi: ${max}`
}
console.log(minmaxTyötunnitReduce(työpäiväTaulukko(7, 9, 6, 8, 5)))

// 2.4

/*
Tee ohjelma, jonka lähtökohtana ovat 12 kuukauden palkkatulot kuukausittain.
Kuukausipalkkaa korotetaan 50 %:lla. Ohjelma luo uuden taulukon, josta löytyvät korotetut
palkat.
*/

const palkkaTaulukko = [2200, 2500, 2450, 2600, 3000, 1950, 3500, 4000, 1800, 2750, 2800, 3250]

const palkanKorotus = (palkat) => {
  let taulukko = []
  palkat.forEach((value, index) => (taulukko[index] = value * 1.5))
  return taulukko
}

console.log(palkanKorotus(palkkaTaulukko))

// 2.5

/*
Tee ohjelma, jonka lähtökohtana ovat 12 kuukauden bruttopalkat kuukausittain ja
veroprosentti. Ohjelma luo uuden taulukon ja laskee nettotulot vähentäen jokaisen
kuukauden bruttopalkasta verot.
*/

const palkatJaVerot = [
  [2200, 12],
  [3000, 20],
  [1800, 8],
  [2500, 15],
  [1950, 9],
  [2750, 19],
  [2450, 15],
  [3500, 23],
  [2800, 19],
  [2600, 17],
  [4000, 28],
  [3250, 20],
]

const nettoTulot = (palkat) => {
  let nettoTaulukko = []
  palkat.forEach(
    (element, index) => (nettoTaulukko[index] = element[0] - (element[0] * element[1]) / 100)
  )
  return nettoTaulukko
}

console.log(nettoTulot(palkatJaVerot))

// 2.6

/*
Tee ohjelma, joka järjestää taulukon luvut [1,4,100,2,5,4] suuruusjärjestykseen. Käytä
JavaScriptin sort-funktiota oletustoteutuksella (ei omaa compare-funktiota)
*/

const järjestäLista = (lista) => {
  return lista.sort()
}

console.log(järjestäLista([1, 4, 100, 2, 5, 4]))

// Oletustoteutuksella sort-funktio ei järjestä lukuja suuruusjärjestykseen

// 2.7

/* 
Tee ohjelma, joka järjestää taulukon merkkijonot [“1”,”4”,”100”,”2”,”5”,”4”]
aakkosjärjestykseen. Käytä JavaScriptin sort-funktiota oletustoteutuksella (ei omaa
compare-funktiota) 
*/

console.log(järjestäLista(["1", "4", "100", "2", "5", "4"]))

// 2.8

/*
Selitä lyhyesti miten miten JavaScriptin sort-funktio toimii ja mitä tarkoittaa parametrina
annettava compare-funktio.
*/

console.log(
  'Sort-funktio muuntaa elementtien sisällön merkkijonoiksi, jotka se järjestää kasvavaan "aakkosjärjestykseen" merkkejä vastaavien koodien mukaan(UTF-16). Eli esim. luku 100 tulee ennen lukua 2. Parametrina annettavalla compare-funktiolla voidaan muuttaa järjestyslogiikkaa. Esimerkiksi vaikkapa suuruusjärjestykseen. Silloin luku 2 tulee ennen lukua 100.'
)

// 2.9

/*
Sinulla on [{“ma”:44}, {“pe”:100}, {“ke”:21}, {“ti”: 66},{”la”:22}]. Luo taulukko, jossa taulukon
objektit on järjestetty arvojen(values) mukaiseen järjestykseen.
*/

let lista = [{ ma: 44 }, { pe: 100 }, { ke: 21 }, { ti: 66 }, { la: 22 }]

const järjestäArvonMukaan = (a, b) => {
  a = Object.values(a)
  b = Object.values(b)
  return a - b
}

console.log(lista.sort(järjestäArvonMukaan))

// 2.10

/*
Sinulla on [{“ma”:44}, {“pe”:100}, {“ke”:21}, {“ti”: 66},{”la”:22}]. Luo taulukko, jossa taulukon
kentät on järjestetty päivien(avaimet) mukaiseen järjestykseen periaatteella
ma&lt;ti&lt;ke&lt;to&lt;pe&lt;la&lt;su.
*/

const päivät = ["ma", "ti", "ke", "to", "pe", "la", "su"]
lista = [{ ma: 44 }, { pe: 100 }, { ke: 21 }, { ti: 66 }, { la: 22 }]

const järjestäPäivänMukaan = (a, b) => {
  if (päivät.indexOf(String(Object.keys(a))) > päivät.indexOf(String(Object.keys(b)))) return 1
  else return -1
}

console.log(lista.sort(järjestäPäivänMukaan))

// 2.11

/*
Sinulla on [{“ma”:44}, {“pe”:100}, {“ke”:21}, {“ti”: 66},{”la”:22}]. Luo taulukko, jossa on
mukana objektit, joissa on parillinen arvo.
*/

lista = [{ ma: 44 }, { pe: 100 }, { ke: 21 }, { ti: 66 }, { la: 22 }]

const parillisetArvot = (taulukko) => {
  let uusiTaulukko = []
  for (key in taulukko) {
    let obj = taulukko[key]
    if (Object.values(obj) % 2 === 0) {
      uusiTaulukko.push(obj)
    }
  }
  return uusiTaulukko
}

console.log(parillisetArvot(lista))

// FILTER

lista = [{ ma: 44 }, { pe: 100 }, { ke: 21 }, { ti: 66 }, { la: 22 }]

const parillisetArvotFilter = (taulukko) => {
  return taulukko.filter((item) => Object.values(item)[0] % 2 === 0)
}

console.log(parillisetArvotFilter(lista))

// 2.12

/*
Sinulla on [{“ma”:44}, {“pe”:100}, {“ke”:21}, {“ti”: 66},{”la”:22}]. Luo taulukko, jossa on
mukana objektit, joiden avaimen toinen kirjain on e.
*/

lista = [{ ma: 44 }, { pe: 100 }, { ke: 21 }, { ti: 66 }, { la: 22 }]

const toinenKirjainE = (taulukko) => {
  let uusiTaulukko = []
  for (key in taulukko) {
    let obj = taulukko[key]
    let toinenKirjain = Object.keys(obj)[0][1]
    if (toinenKirjain === "e") {
      uusiTaulukko.push(obj)
    }
  }
  return uusiTaulukko
}

console.log(toinenKirjainE(lista))

// 2.13

/*
Sinulla on {“ma”:44, “pe”:100, “ke”:21, “ti”: 66,”la”:22}. Tee ohjelma, joka muuttaa objektin
listaksi niin, että [{“ma”:44},{“pe”:100},...]. Ohje: käytä esim. Objectin keys ja values -
funktioita.
*/

const muunnettavaObjekti = { ma: 44, pe: 100, ke: 21, ti: 66, la: 22 }

const muunnaTaulukoksi = (objekti) => {
  let taulukko = []
  for (key in objekti) {
    taulukko.push({ [key]: objekti[key] })
  }
  return taulukko
}

console.log(muunnaTaulukoksi(muunnettavaObjekti))
