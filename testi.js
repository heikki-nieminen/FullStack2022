const biggerThanHundred = (number) => {
    if (typeof number != 'number') {
        return "Syötä luku"
    }
    else if (number > 100) {
        return "Syötit luvun, joka on suurempi kuin 100"
    }
    else {
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