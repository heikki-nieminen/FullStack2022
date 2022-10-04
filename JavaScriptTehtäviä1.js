// 1.1 - 1.3

/*
Tee funktio, joka saa parametrina kokonaisluvun. Jos luku on suurempi kuin 100, funktio
palauttaa: ”syötit luvun, joka on suurempi kuin 100”. Jos luku on 100 tai pienempi,
palautetaan “” 

Muuta tehtävää 1 siten, että se palauttaa ”syötit luvun joka on pienempi kuin 100”
tapauksessa, jossa käyttäjä argumentin arvo on pienempi kuin sata.

Muuta tehtävää 2 siten, että funktio palauttaa tekstin ”luku on 100” jos käyttäjä syöttää
luvun 100.
*/

const suurempiKuinSata = (luku) => {
    if (luku > 100) return "Syötit luvun, joka on suurempi kuin 100"
    else if (luku == 100) return "Luku on 100"
    else return "Syötit luvun, joka on pienempi kuin 100"
}

console.log(suurempiKuinSata(101))
console.log(suurempiKuinSata(99))
console.log(suurempiKuinSata(100))

// 1.4

/*
a) Tee funktio, jonka parametreina ovat tunnit, minuutit ja sekunnit ja se palauttaa
kokonaisajan sekunteina. Esimerkiksi, jos argumenteiksi annetaan 0 tunneiksi, 1
minuuteiksi 1 ja 1 sekunneiksi, palauttaa funktio 61 sekuntia.
Kokeile ohjelmaasi myös seuraavalla syötteellä: tunnit=20, minuutit=2 ja sekunnit=300.
Jos ohjelmasi ei toimi, korjaa se.
b) Tee funktio, jonka parametrina on valuutan määrä markoissa ja se palauttaa määrän
euroissa.
c) Tee funktio, jonka parametrina on valuutan määrä euroissa ja se palauttaa määrän
markoissa.
*/

// a
const muunnaSekunneiksi = (tunnit, minuutit, sekunnit) => {
    return 3600 * tunnit + 60 * minuutit + sekunnit
}

console.log(muunnaSekunneiksi(20, 2, 300))

// b
const muunnnaEuroiksi = (markat) => {
    return markat * 0.17
}

console.log(muunnnaEuroiksi(15) + " euroa")

// c
const muunnaMarkoiksi = (eurot) => {
    return eurot * 5.95
}

console.log(muunnaMarkoiksi(3) + " markkaa")

// 1.5

/*
Tee funktio, jonka parametrit ovat viikonpäivän numeron ja joka palauttaa viikonpäivän,
esim. jos argumentti on 1, palautetaan “maanantai”.
*/

const viikonPäivä = (numero) => {
    switch (numero) {
        case 1:
            return "maanantai"
            break
        case 2:
            return "tiistai"
            break
        case 3:
            return "keskiviikko"
            break
        case 4:
            return "torstai"
            break
        case 5:
            return "perjantai"
            break
        case 6:
            return "lauantai"
            break
        case 7:
            return "sunnuntai"
            break
        default:
            return "Päivää ei tunnistettu"
            break
    }
}

console.log(viikonPäivä(3))
console.log(viikonPäivä(8))

// 1.6

/*
Tee funktio, joka saa syötteenä iän ja palauttaa seuraavat tekstit riippuen iästä:

1-17 “olet alaikäinen”
18-33 “olet nuori”
34-50 “olet keski-ikäinen”
51- “olet vanha”
*/

const ikäKysely = (ikä) => {
    if (ikä >= 1 && ikä <= 17) return "Olet alaikäinen"
    else if (ikä >= 18 && ikä <= 33) return "Olet nuori"
    else if (ikä >= 34 && ikä <= 50) return "Olet keski-ikäinen"
    else if (ikä >= 51) return "Olet vanha"
    else return "Ikä väärin"
}

console.log(ikäKysely(15))
console.log(ikäKysely(25))
console.log(ikäKysely(42))
console.log(ikäKysely(65))
console.log(ikäKysely(-3))

// 1.7

/*
Tee funktio, joka saa syötteenä etunimen, sukunimen ja iän. Funktio palauttaa
merkkijonon muodossa ”Terve etunimi sukunimi, olet ikä vuotias”.
*/

const tervehdys = (etunimi, sukunimi, ikä) => {
    return `Terve ${etunimi} ${sukunimi}, olet ${ikä} vuotias`
}

console.log(tervehdys("Heikki", "Nieminen", 32))

// 1.8

/*
Tee funktio, joka saa syötteenä syntymävuoden ja suosikkinumeron. Jos syntymävuosi on
1970 ja suosikkinumero 77, niin palautetaan teksti: ”Olet onnenpekka”. Tee tehtävä
yhdellä JOS (IF) lauseella.
*/

const onnenpekka = (syntymävuosi, suosikkinumero) => {
    if (syntymävuosi == 1970 && suosikkinumero == 77) return "Olet onnenpekka"
    else return "Et ole onnenpekka"
}

console.log(onnenpekka(1970, 78))
console.log(onnenpekka(1971, 77))
console.log(onnenpekka(1970, 77))

// 1.9

/*
Tee funktio, joka palauttaa luvut 7-131 (lista/taulukko)
*/

const haeTaulukko = () => {
    let taulukko = []
    for (let i = 7; i <= 131; i++) {
        taulukko.push(i)
    }
    return taulukko
}

// 1.10

/*
a) Tee funktio, joka palauttaa lukujen 7-131 summan.
b) Tee funktio, joka saa syötteenä positiiviset luvut a ja b ja palauttaa lukuvälin summan.
Huomaa, että ohjelman tulee tarkistaa, että b>a.
Tee molemmat tehtävät käyttäen sekä for-rakennetta että reduce-funktiota.
*/

// a

const summaFor = () => {
    let summa = 0
    for (let i = 7; i <= 131; i++) {
        summa += i
    }
    return summa
}

const summaReduce = () => {
    let taulukko = []
    for (let i = 7; i <= 131; i++) {
        taulukko.push(i)
    }
    return taulukko.reduce((edellinen, nykyinen) => edellinen + nykyinen)
}

console.log(summaFor())
console.log(summaReduce())

// b 

const summaForLuvut = (alku, loppu) => {
    let summa = 0
    for (let i = alku; i <= loppu; i++) {
        summa += i
    }
    return summa
}

const summaReduceLuvut = (alku, loppu) => {
    let taulukko = []
    for (let i = alku; i <= loppu; i++) {
        taulukko.push(i)
    }
    return taulukko.reduce((edellinen, nykyinen) => edellinen + nykyinen)
}

console.log(summaForLuvut(1, 6))
console.log(summaReduceLuvut(1, 6))

// 1.11

/*
Tee funktio, joka palauttaa luvun 10 kertoman. Esimerkiksi 5 kertoma tarkoittaa 1*2*3*4*5.
Tee tehtävä käyttäen sekä for-rakennetta että reduce-funktiota.
*/

const kertomaFor = () => {
    let kertoma = 1
    for (let i = 1; i <= 10; i++) {
        kertoma *= i
    }
    return kertoma
}

const kertomaReduce = () => {
    let taulukko = []
    for (let i = 1; i <= 10; i++) {
        taulukko.push(i)
    }

    return taulukko.reduce((edellinen, nykyinen) => edellinen * nykyinen)
}

console.log(kertomaFor())
console.log(kertomaReduce())

// 1.12

/*
Tee funktio, joka palauttaa parilliset luvut väliltä 0-100.
Tee tehtävä käyttäen for-rakennetta tai reduce-funktiota.
*/

const parillisetLuvut = () => {
    let taulukko = []
    for (let i = 0; i <= 100; i++) {
        taulukko.push(i)
    }

    return taulukko.reduce((edellinen, nykyinen) => {
        if (nykyinen % 2 == 0) {
            return [...edellinen, nykyinen]
        }
        return edellinen
    }, []
    )
}

console.log(parillisetLuvut())

// 1.13

/*
Tee funktio, joka palauttaa parillisten kulujen summan lukuväliltä 0-1000.
Tee tehtävä käyttäen joko for-rakennetta tai reduce-funktiota.
*/

const summaParilliset = () => {
    let taulukko = []
    for (let i = 0; i <= 1000; i++) {
        taulukko.push(i)
    }

    return taulukko.reduce((edellinen, nykyinen) => (nykyinen % 2 == 0 ? edellinen + nykyinen : edellinen))
}

console.log(summaParilliset())

// 1.14

/*
Tee ohjelma, joka tulostaa lukujen 1-10 kertotaulun. Esim. seuraavasti:
1 * 1 = 1
1 * 2 = 2
1 * 3 = 3
…
1 * 10 = 10
2 * 1 = 2
2 * 2 = 4
…
10 * 10 = 100

Ohje: Jos ratkaiset tehtävän luupeilla, tarvitset 2 silmukkaa, joista yksi silmukka on toisen
sisällä.
*/

const kertotaulut = () => {
    let taulukko = []
    for (let i = 1; i <= 10; i++) {
        taulukko[i - 1] = new Array
        for (let j = 1; j <= 10; j++) {
            taulukko[i - 1].push(i * j)
        }
    }

    return taulukko
}

console.log(kertotaulut())

const tulostaKertotaulut = () => {
    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
            console.log(`${i}*${j} = ${i * j}`)
        }
    }
}

tulostaKertotaulut()

// 1.15

/*
a) Tee ohjelma, joka tulostaa seuraavanlaisen kuvion
*

*
*

*
*
*

b) Tee ohjelma, joka tulostaa halutun kokoisen suorakulmion, joka muodostuu * -
merkeistä. Ohjelma kysyy suorakulmion leveyden ja pituuden.
*/

// a

const kuvio = () => {
    let tuloste = ""
    for (let i = 0; i < 8; i++) {
        if (i == 1 || i == 4) tuloste += "\n"
        else tuloste += "*\n"
    }
    return tuloste
}

console.log(kuvio())

// b

const tulostaSuorakulmio = (x, y) => {
    let tuloste = ""
    for (let i = 0; i < x; i++) {
        if (i == 0 || i == x - 1) tuloste += "*"
        else tuloste += "|"
        for (let j = 0; j < y - 2; j++) {
            if (i == 0 || i == x - 1) tuloste += "-"
            else tuloste += " "
        }
        if (i == 0 || i == x - 1) tuloste += "*\n"
        else tuloste += "|\n"
    }
    return tuloste
}

console.log(tulostaSuorakulmio(3, 3))

// 1.16

/*
Tee funktio, joka saa syötteenä painon (kg), pituuden (m) ja palauttaa painoindeksin.
Painoindeksin avulla voidaan arvioida painoa. Painoindeksi (BMI = Body Mass Index)
suhteuttaa painon ja pituuden, ja se voidaan laskea jakamalla paino pituuden neliöllä
(laskukaavassa paino ilmaistaan kiloina, pituus metreinä).
Aikuisilla painoindeksin normaalialue on 20.0-24.9. Joskus tästä painoindeksin
normaalialueesta käytetään käsitettä &quot;ihannepaino&quot;. Mitä suurempi painoindeksi on, sitä
suurempaan ylipainoon se viittaa
*/

const painoindeksi = (paino, pituus) => {
    return paino / (Math.pow(pituus, 2))
}

console.log(painoindeksi(90, 1.8))

// 1.17

/*
Kirjoita funktio, joka saa syötteenä vuosiluvun ja palauttaa merkkijonon “on” tai “ei” sen
mukaan onko vuosi karkausvuosi.
Karkausvuosia ovat pääsääntöisesti 4:llä jaolliset vuosiluvut. Vuosi ei kuitenkaan ole
karkausvuosi, jos vuosiluku on jaollinen 100:lla. Mutta, jos vuosiluku on jaollinen 400:lla,
vuosi on aina karkausvuosi.
Ohje: Vuodet 1996 ja 2000 ovat karkausvuosia, vuodet 1800 ja 1997 eivät.
Jakojäännösoperaattori on %.
*/

const onkoKarkausvuosi = (vuosi) => {
    if (vuosi % 4 == 0 && vuosi % 100 != 0 || vuosi % 400 == 0) return "On"
    else return "Ei"
}

console.log(onkoKarkausvuosi(48))
console.log(onkoKarkausvuosi(1800))
console.log(onkoKarkausvuosi(1000))
console.log(onkoKarkausvuosi(1200))

// 1.18

/*
Tee funktio, joka saa syötteenä luvun. Mikäli syöte ei ole 1 funktio palauttaa ” Syöte ei ole
1” .
*/

const onkoYksi = (luku) => {
    if (luku != 1) {
        return "Syöte ei ole 1"
    }
}

console.log(onkoYksi(1))
console.log(onkoYksi(2))

// 1.19

/*
Muuta seuraavan pseudokoodin mukainen ohjelma funktioksi. Keksi itse funktion
parametrit.
ALGORITMI
INPUT “anna asteikko”, asteikko
IF ( asteikko = ”C”) OR (asteikko=”c”) OR
(asteikko = ”F” ) OR (asteikko=”f”) THEN
INPUT ”anna lukema”, lukema
IF (lukema &lt;=100 AND lukema &gt; -101) THEN

IF (asteikko=”C”) OR (asteikko = ”c”)
THEN

lukema = 9/5*lukema + 32

ELSE
lukema =5/9 *(lukema –32)

END IF
OUTPUT lukema
ELSE
OUTPUT ”lukema virheellinen”
END IF
ELSE
OUTPUT ”asteikko tuntematon”
END IF
END ALGORITMI
*/

const asteKääntäjä = (asteikko, lukema) => {
    if (asteikko == "c" || asteikko == "C" || asteikko == "f" || asteikko == "F") {
        if (lukema <= 100 && lukema > -101) {
            if (asteikko == "c" || asteikko == "C") {
                lukema = 9 / 5 * lukema + 32
            }
            else {
                lukema = 5 / 9 * (lukema - 32)
            }
            console.log(lukema)
        }
        else {
            console.log("Lukema virheellinen")
        }
    }
    else {
        console.log("Asteikko tuntematon")
    }
}

asteKääntäjä("f", 100)

// 1.20

/*
Muuta seuraavan pseudokoodin mukainen ohjelma funktioksi funktio. Keksi itse funktion
parametrit.

ALGORITMI
INPUT ”anna litrat”, L
IF ( L &gt;0 ) THEN

( JOS (L&gt;0) NIIN)
INPUT “anna kilometrit”,K
IF ( K &gt; 0 ) THEN
sadalla = L * 100 / K
OUTPUT sadalla
ELSE
OUTPUT ”virhesyöttö”
END IF
ELSE
OUTPUT ”virhesyöttö”
END IF

END ALGORITMI
*/

const litraaSadalla = (litrat, kilometrit) => {
    if (litrat > 0 && kilometrit > 0) {
        return litrat * 100 / kilometrit
    }
    else {
        return "Virhesyöttö"
    }
}

console.log(litraaSadalla(10, 105))

// 1.21

/*
Laadi funktio, joka saa syötteenä henkilön nimen.. Jos nimi on Pekka, palautetaan
funktiosta ”Minunkin mielestäni Pekka on kiva”. Sama logiikka pätee, jos syötteenä on
Liisa tai Jorma. Jos syötetään jotain muuta, palautetaan funktiosta ”En tunne henkilöä”.
Toteuta ohjelma sekä ehtolausein että switch-case rakenteen avulla.
*/

const kysyNimiEhto = (nimi) => {
    if (nimi == "Pekka" || nimi == "Liisa" || nimi == "Jorma") {
        return `Minunkin mielestäni ${nimi} on kiva`
    }
    else {
        return "En tunne henkilöä"
    }
}

const kysyNimiSwitch = (nimi) => {
    switch (nimi) {
        case "Pekka":
            return `Minunkin mielestäni ${nimi} on kiva`
            break
        case "Liisa":
            return `Minunkin mielestäni ${nimi} on kiva`
            break
        case "Jorma":
            return `Minunkin mielestäni ${nimi} on kiva`
            break
        default:
            return "En tunne henkilöä"
            break
    }
}

console.log(kysyNimiEhto("Pekka"))
console.log(kysyNimiEhto("Liisa"))
console.log(kysyNimiEhto("Jorma"))
console.log(kysyNimiEhto("Ville"))

console.log(kysyNimiSwitch("Pekka"))
console.log(kysyNimiSwitch("Liisa"))
console.log(kysyNimiSwitch("Jorma"))
console.log(kysyNimiSwitch("Ville"))

// 1.22

/*
Seuraavat lauseet ovat tosia:
Lause A on ”Pekka on vakosamettihousuinen mies”.
Lause B on ”Rauni ei ole vihainen”.
Lause C on ”Harri on yhdeksän”.
Lause D on ”Sataa”.
&& = JA
|| = TAI
!=EI

Ovatko seuraavat väittämät tosia?
a) (!D || !C && !B) 
b) (D && !B || !A)
c) (!D || A) 
d) (B && !A) 
e) (D && !B || !A) || (!D || A)
f) (!(!C && !B) && (!D || B))
*/

const tosi = () => {
    const A = true
    const B = true
    const C = true
    const D = true

    let vastaukset = "";

    if (!D || !C && !B) vastaukset += "a) tosi\n"
    else vastaukset += "a) epätosi\n"

    if (D && !B || !A) vastaukset += "b) tosi\n"
    else vastaukset += "b) epätosi\n"

    if (!D || A) vastaukset += "c) tosi\n"
    else vastaukset += "c) epätosi\n"

    if (B && !A) vastaukset += "d) tosi\n"
    else vastaukset += "d) epätosi\n"

    if (D && !B || !A || (!D || A)) vastaukset += "e) tosi\n"
    else vastaukset += "e) epätosi\n"

    if (!(!C && !B) && (!D || B)) vastaukset += "f) tosi\n"
    else vastaukset += "f) epätosi\n"

    return vastaukset
}

console.log(tosi())

// 1.23

/*
Rakennusfirma aikoo tilata 50 kpl erikokoisia betonielementtejä monumentin pystytystä
varten. Arkkitehdin oikkujen mukaan tilattavien elementtien on oltava eri kokoisia.
Elementit ovat sellaisia, että pienin elementti on kooltaan 0,3 m x 0,5 m x 0,5 m (pituus,
leveys, korkeus). Seuraava elementti on aina 2% pidempi, 3% leveämpi ja 1.5%
korkeampi kuin edellinen elementti. Betonielementtejä kuljetetaan rakennuspaikalle
kuorma-autolla. Kuorma-auto voi kuljettaa enintään 10500 kg kuormaa.
Kun tiedetään, että betonin tiheys on 2,5 kg/dm 3 , kuinka monta kertaa kuorma-auto joutuu
ajamaan rakennuspaikalle.
Ratkaise ongelma laatimasi funktion/ohjelman avulla. Ohjelmassa ei saa käyttää valmiita
potenssiinkorotusfunktioita.
*/

const kuormaAutoja = () => {
    const elementinTiheys = 2.5
    let nykyinenPaino = 0
    let kuormat = 1
    let elementti = [3, 5, 5]
    let elementinTilavuus = 0

    for (let i = 0; i < 50; i++) {
        elementinTilavuus = elementti.reduce((acc, current) => acc * current)
        if (nykyinenPaino + elementinTilavuus * elementinTiheys <= 10500) {
            nykyinenPaino += elementinTilavuus * elementinTiheys
            elementti[0] *= 1.02
            elementti[1] *= 1.03
            elementti[2] *= 1.015
        }
        else {
            kuormat += 1
            nykyinenPaino = 0
            i--
        }
    }
    return kuormat
}

console.log("Kuormia tarvitaan: "+kuormaAutoja())