const fs = require('fs')
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const {Pool, Client} = require('pg')

const PORT = 8080

const pool = new Pool({
	user:     'postgres',
	host:     'localhost',
	database: 'postgres',
	password: 'admin',
	port:     5432,
})

const https = require('https')
const app = express()

const options = {
	key:  fs.readFileSync('./cert/key.pem'),
	cert: fs.readFileSync('./cert/cert.pem')
}

app.use(express.json())
app.use(cors())

const server = https.createServer(options, app).listen(PORT, function () {
	console.log("Express server listening on port " + PORT)
})
// ROOT ROUTE
app.route('/')
	.get(async (req, res) => {
	
	})
	.post(async (req, res) => {
	
	})

// EXAMS ROUTE
app.route('/exams')
	.get(async (req, res) => {
	
	})
	.post(async (req, res) => {
		try {
			console.log(req.body.role)
			if (req.body.role === "admin") {
				const result = await pool.query('SELECT name, id FROM exam')
				res.status(200).send(result.rows)
			}
		} catch (err) {
			console.log(err)
			res.status(400)
		}
	})

// EXAM ROUTE (GET, POST, PUT, DELETE)
app.route('/exam')
	.get(async (req, res) => {
		console.log("Haetaan tentti")
		let exam = {name: "", questions: []}
		const values = [req.query.id]
		try {
			const result = await pool.query('SELECT * FROM exam WHERE id=$1', values)
			if (result.rowCount) {
				exam.name = result.rows[0].name
				exam.id = result.rows[0].id
				let questions = await pool.query('SELECT * FROM question WHERE exam_id=$1', [result.rows[0].id])
				if (questions.rowCount) {
					exam.questions = questions.rows
				}
				/*if (questions.rowCount) {
						exam.questions = questions.rows
						await Promise.all(questions.rows.map(async (item, index) => {
								const answers = await pool.query('SELECT * FROM answer WHERE question_id=$1', [item.id])
								if (answers.rowCount) {
										exam.questions[index].answers = answers.rows
								}
						}))
				}*/
				res.status(200).send(exam)
				
			} else {
				res.status(404).send("Kyseistä tenttiä ei löydy")
			}
		} catch (err) {
			console.log(err)
			res.status(400).send("Virhe haettaessa dataa")
		}
	})
	.post(async (req, res) => {
		const values = [req.body.examName]
		try {
			const result = await pool.query('INSERT INTO exam (name) VALUES ($1) RETURNING id', values)
			res.status(200).send(result.rows[0].id)
		} catch (err) {
			console.log(err)
			res.status(400).send(err)
		}
	})
	.put(async (req, res) => {
		const values = [req.body.examId, req.body.examName]
		console.log(req.body)
		try {
			const result = await pool.query('UPDATE exam SET name=$2 WHERE id=$1 RETURNING id', values)
			res.status(200).send("OK")
		} catch (err) {
			console.log(err)
			res.status(400).send(err)
		}
	})
	.delete(async (req, res) => {
		const values = [req.body.id]
		// Käyttäjän vahvistus?
		try {
			const result = await pool.query('DELETE FROM exam WHERE id=$1', values)
			res.status(200).send("OK")
		} catch (err) {
			console.log(err)
			res.status(400).send(err)
		}
	})

// QUESTION ROUTE (GET, POST, PUT, DELETE)
app.route('/exam/question')
	.get(async (req, res) => {
		const questionId = req.query.id
		try {
			const result = await pool.query('SELECT * FROM answer WHERE question_id=$1', [questionId])
			res.status(200).send(result.rows)
		} catch (err) {
			res.status(404).send("Virhe haettaessa dataa")
		}
	})
	.post(async (req, res) => {
		const values = [req.body.question, req.body.exam_id]
		try {
			const result = await pool.query('INSERT INTO question (question, exam_id) VALUES ($1,$2) RETURNING id', values)
			res.status(200).send(result.rows[0].id)
		} catch (err) {
			console.log(err)
			res.status(400).send(err)
		}
	})
	.put(async (req, res) => {
		const values = [req.body.id, req.body.question]
		try {
			const result = await pool.query('UPDATE question SET question=$2 WHERE id=$1', values)
			res.status(200).send("Ok")
		} catch (err) {
			console.log(err)
			res.status(400).send(err)
		}
	})
	.delete(async (req, res) => {
		const values = [req.body.id]
		// VAHVISTUS
		try {
			const result = await pool.query('DELETE FROM question WHERE id=$1', values)
			res.status(204).send("OK")
		} catch (err) {
			console.log(err)
			res.status(400).send(err.detail)
		}
	})

// ANSWER ROUTE (GET, POST, PUT, DELETE)
app.route('/exam/question/answer')
	.get(async (req, res) => {
		const values = [req.query.id]
		try {
			const result = await pool.query('SELECT * FROM answer WHERE id=$1', values)
			res.send(result.rows[0])
		} catch (err) {
			console.log(err)
			res.status(404).send("Virhe haettaessa dataa")
		}
	})
	.post(async (req, res) => {
		const values = [req.body.answer, req.body.question_id, req.body.correct_answer]
		try {
			const result = await pool.query('INSERT INTO answer (answer, question_id, correct_answer) VALUES' +
				' ($1, $2, $3) RETURNING id', values)
			res.status(201).send(result.rows[0].id)
			
		} catch (err) {
			console.log(err)
			res.status(400).send(err)
		}
	})
	.put(async (req, res) => {
		const values = [req.body.id, req.body.answer, req.body.isCorrect]
		try {
			const result = await pool.query('UPDATE answer SET answer=$2, correct_answer=$3 WHERE id=$1', values)
			res.status(201).send("OK")
		} catch (err) {
			console.log(err)
			res.status(400)
		}
	})
	.delete(async (req, res) => {
		const values = [req.body.id]
		try {
			const result = await pool.query('DELETE FROM answer WHERE id=$1', values)
			res.status(204).send("OK")
		} catch (err) {
			console.log(err)
			res.status(400).send(err)
		}
	})

// LOGIN ROUTE (GET, POST)
app.route('/login')
	.get(async (req, res) => {
	
	})
	.post(async (req, res) => {
		const username = req.body.username
		const plainPassword = req.body.password
		try {
			const pass = await pool.query('SELECT password, role, id FROM public.user WHERE username=$1', [username])
			const hash = pass.rows[0].password
			const result = await bcrypt.compare(plainPassword, hash)
			if (result) {
				res.status(201).send({correct: true, role: pass.rows[0].role, id: pass.rows[0].id})
			} else {
				res.status(400).send({correct: false})
			}
			
		} catch (err) {
			console.log(err)
			res.status(400).send("Kirjautuminen epäonnistu")
		}
	})

// REGISTER ROUTE (GET, POST)
app.route('/register')
	.get(async (req, res) => {
	
	})
	.post(async (req, res) => {
		console.log(req.body)
		const username = req.body.username
		const plainPassword = req.body.password
		const email = req.body.email
		try {
			const password = await hashPassword(plainPassword)
			const values = [username, password, email]
			const result = await pool.query("INSERT INTO public.user (username, password, email, role) " +
				"VALUES ($1,$2,$3,'user')", values)
			console.log(result)
			res.status(201).send(true)
		} catch (err) {
			if (err.code === '23505') {
				res.status(400).send("Käyttäjätunnus on jo olemassa")
			} else {
				console.log(err)
				res.send(false)
			}
		}
	})

// HASH PASSWORD
const hashPassword = async (password) => {
	return await bcrypt.hash(password, 10)
}