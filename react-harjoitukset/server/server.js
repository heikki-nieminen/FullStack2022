const fs = require('fs')
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const {Pool, Client} = require('pg')

const PORT = 8080

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'admin',
    port: 5432,
})

const https = require('https')
const app = express()

const options = {
    key: fs.readFileSync('./cert/key.pem'),
    cert: fs.readFileSync('./cert/cert.pem')
}

app.use(express.json())
app.use(cors())

const server = https.createServer(options, app).listen(PORT, function () {
    console.log("Express server listening on port " + PORT);
});
// ROOT ROUTE
app.route('/')
    .get(async (req, res) => {

    })
    .post(async (req, res) => {

    })

// EXAM ROUTE (GET, POST, PUT, DELETE)
app.route('/exam')
    .get(async (req, res) => {
        const values = [req.query.id]
        try {
            const result = await pool.query('SELECT * FROM exam WHERE id=$1', values)
            if (result.rowCount) {
                res.send(result.rows[0])
            } else {
                res.send("Kyseistä tenttiä ei löydy")
            }
        } catch (err) {
            console.log(err)
            res.send("Virhe haettaessa dataa")
        }
    })
    .post(async (req, res) => {
        const values = [req.body.examName, req.body.userId]
        try {
            const result = await pool.query('INSERT INTO exam (name, creator) VALUES ($1, $2)', values)
            res.status(200).send("OK")
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    })
    .put(async (req, res) => {
        const values = [req.body.examId, req.body.examName]
        // Käyttäjän vahvistus?
        try {
            const result = await pool.query('UPDATE exam SET name=$2 WHERE id=$1', values)
            res.status(200).send("OK")
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    })
    .delete(async (req, res) => {
        const values = [req.body.examId]
        // Käyttäjän vahvistus?
        try {
            const result = await pool.query('DELETE FROM exam WHERE id=$1', values)
            res.status(200).send("OK")
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    })

// QUESTION ROUTE (GET, POST, PUT, DELETE)
app.route('/:examId/question')
    .get(async (req, res) => {
        const values = [req.query.id]
        const result = await pool.query('SELECT * FROM question WHERE id=$1', values)
        res.send(result.rows[0])
    })
    .post(async (req, res) => {
        const values = [req.body.question, req.params.examId, req.body.userId]
        try {
            const result = await pool.query('INSERT INTO question (question, creator, exam_id) VALUES ($1,$3,$2)', values)
            res.status(200).send("OK")
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    })
    .put(async (req, res) => {
        const values = [req.body.questionId, req.body.question]
        try {
            const result = await pool.query('UPDATE question SET question=$2 WHERE id=$1', values)
            res.status(200).send("OK")
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    })
    .delete(async (req, res) => {
        const values = [req.body.questionId]
        // VAHVISTUS
        try {
            const result = await pool.query('DELETE FROM question WHERE id=$1', values)
            res.status(200).send("OK")
        } catch (err) {
            console.log(err)
            res.send(err.detail)
        }
    })

// ANSWER ROUTE (GET, POST, PUT, DELETE)
app.route('/:examId/:questionId/answer')
    .get(async (req, res) => {
        const values = [req.query.id]
        try {
            const result = await pool.query('SELECT * FROM answer WHERE id=$1', values)
            res.send(result.rows[0])
        } catch (err) {
            console.log(err)
            res.send("Virhe haettaessa dataa")
        }
    })
    .post(async (req, res) => {
        const values = [req.body.answer, req.params.questionId, req.body.userId, req.body.isCorrect]
        try {
            const result = await pool.query('INSERT INTO answer (answer, creator, question_id, correct_answer) VALUES' +
                ' ($1, $3, $2, $4)', values)
            res.status(200).send("OK")

        } catch (err) {
            console.log(err)
            res.send(err)
        }
    })
    .put(async (req, res) => {
        const values = [req.body.answerId, req.body.answer, req.body.isCorrect]
        try {
            const result = await pool.query('UPDATE answer SET answer=$2, correct_answer=$3 WHERE id=$1', values)
            res.status(200).send("OK")
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    })
    .delete(async (req, res) => {
        const values = [req.body.answerId]
        try {
            const result = await pool.query('DELETE FROM answer WHERE id=$1', values)
            res.status(200).send("OK")
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    })

// LOGIN ROUTE (GET, POST)
app.route('/login')
    .get(async (req, res) => {
        const username = req.body.username

    })
    .post(async (req, res) => {
        const username = req.body.username
        const plainPassword = req.body.password
        console.log("USERNAME: ", username)
        console.log("PASSWORD: ", plainPassword)
        try {
            const pass = await pool.query('SELECT password FROM public.user WHERE username=$1', [username])
            const hash = pass.rows[0].password
            const result = await bcrypt.compare(plainPassword, hash)
            if (result) {
                res.status(200).send(true)
            } else {
                res.send(false)
            }

        } catch (err) {
            console.log(err)
            res.send("Kirjautuminen epäonnistui")
        }
    })

// REGISTER ROUTE (GET, POST)
app.route('/register')
    .get(async (req, res) => {

    })
    .post(async (req, res) => {
        const username = req.body.username
        const plainPassword = req.body.password
        const email = req.body.email
        try {
            const password = await hashPassword(plainPassword)
            const values = [username, password, email]
            const result = await pool.query('INSERT INTO public.user (username, password, email) VALUES ($1,$2, $3)', values)
            res.status(200).send(true)
        } catch (err) {
            console.log(err)
            res.send(false)
        }
    })

// HASH PASSWORD
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}