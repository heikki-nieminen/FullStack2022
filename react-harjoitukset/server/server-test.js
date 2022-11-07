const fs = require('fs')
const express = require('express')
const cors = require('cors')

const PORT = 8080

const https = require('https')
const app = express()

const options = {
    key: fs.readFileSync('./cert/key.pem'),
    cert: fs.readFileSync('./cert/cert.pem')
}

app.use(express.json())
app.use(cors())

app.get('/', async (req, res) => {
    //const data = async () => fs.readFile('./users.json')
    const data = await readData()
    console.log("ODOTA SAATANA", data)
    await res.send(data)
})

app.post('/', async (req, res) => {
    console.log("POST REQUEST")
    switch (req.body.postType) {
        case("login"): {
            let user = req.body.username
            let password = req.body.password
            let userType = await checkUser(user, password)
            console.log("USERTYPE ", userType)
            res.send(userType)
            break
        }
        case("saveData"): {
            let data = req.body.content
            console.log("Kutsutaan tallennusfunktio")
            let response = await writeData(data)
            res.send(response)
            break
        }
        case("blockLoop"): {
            console.log("Looppi blokattu hetkeksi")
            blockLoop()
        }
    }
})

/*app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})*/

const serverTest = https.createServer(options, app).listen(PORT, function () {
    console.log("Express serverTest listening on port " + PORT);
});

const checkUser = async (user, pass) => {
    let jsonUsers = await readUsers()
    let users = JSON.parse(jsonUsers)
    return users.users.reduce((acc, item) => {
        if (!acc) {
            if (item.username === user && item.password === pass) return item.type
        } else return acc
    }, 0)
}

const readUsers = async () => {
    try {
        return await fs.promises.readFile('./users.json', 'utf8')
    } catch (err) {
        console.log(err)
    }
}

const writeData = async (data) => {
    try {
        let dataObj = {data: data}
        const jsonData = JSON.stringify(dataObj)
        await fs.promises.writeFile('./data.json', jsonData, 'utf-8')
        return true
    } catch (err) {
        console.log(err)
    }
}

const readData = async () => {
    try {
        return await fs.promises.readFile('./data.json', 'utf-8')
    } catch (err) {
        console.log(err)
    }
}

/* Funktiossa oleva for-loop blokkaa serverin hetkeksi, johtuen suuresta määrästä console.logausta.
Ilman console.logia for-loopin sisällä, olisi looppi käsitelty hetkessä
Tämän aikana lähetetyt pyynnöt kasautuvat jonoon, josta ne puretaan heti for-loopin loputtua*/

const blockLoop = () => {
    for (let i = 0; i < 200000; i++) {
        console.log(i)
    }
}