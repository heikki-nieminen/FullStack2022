const objekti = {}
const paaobjekti = {}

objekti.etunimi = "jaakko"
objekti.sukunimi = "niskanen"
objekti.luokka = []
objekti.luokka.push("A-luokka")
paaobjekti.henkilo1 = objekti

console.log(objekti)

class person {
    constructor(name, age){
        this.name = name
        this.age = age
    }
}

let jaakko = new person("jaakko", 20)
let seppo = new person("seppo", 35)

let persons = []
persons.push(jaakko, seppo)
let newPersons = persons.slice(1,-1)

let personList = persons.map(obj => {
    return `Nimi: ${obj.name}\nIkä: ${obj.age}`
})

let reduceList = newPersons.reduce((acc, current) => {
    return (acc + current.name)
},"")

console.log(reduceList);