const fs = require('fs')
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const {Pool, Client} = require('pg')
const jwt = require('jsonwebtoken')
const https = require('https')
//const emailsender = require('./emailsender')

const PORT = 8080

const pool = new Pool({
	user:     'postgres',
	host:     'localhost',
	database: 'postgres',
	password: 'admin',
	port:     5432,
})

const app = express()

const options = {
	key:  fs.readFileSync('./cert/key.pem'),
	cert: fs.readFileSync('./cert/cert.pem')
}

app.use(express.json())
app.use(cors())

const verifyToken = async (req, res, next) => {
	try {
		const token = await req.headers.authorization?.split(' ')[1]
		if (!token) {
			res.status(401).json({success: false, message: "Token was not provided"})
		}
		req.decoded = await jwt.verify(token, "salainenavain")
		console.log(req.decoded)
		next()
	} catch (err) {
		if (err.message === 'jwt expired') {
			res.status(401).json({success: false, message: "Token expired"})
		}
		res.status(401)
	}
}

const isAdmin = async (req, res, next) => {
	try {
		const result = await pool.query('SELECT role FROM public.user WHERE username = $1', [req.decoded.username])
		console.log(req.decoded.username)
		if (result.rows[0].role === 'admin') {
			next()
		}
	} catch (err) {
		res.status(403).send("Pääsy evätty")
	}
}

const server = https.createServer(options, app).listen(PORT, function () {
	console.log("Express server listening on port " + PORT)
})

// ROOT ROUTE
app.route('/')
	.get(async (req, res) => {
		res.json({message: "Terve"})
	})
	.post(async (req, res) => {
	
	})

// EXAMS ROUTE
app.route('/exams')
	.all(verifyToken)
	.get(async (req, res) => {
	
	})
	.post(async (req, res) => {
		try {
			if (req.decoded.role === 'admin') {
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
	.all(verifyToken)
	.get(async (req, res) => {
		console.log("Haetaan tentt")
		let exam = {name: "", questions: []}
		const values = [req.query.id]
		try {
			const result = await pool.query('SELECT * FROM exam WHERE id=$1', values)
			if (result.rowCount) {
				exam.name = result.rows[0].name
				exam.id = result.rows[0].id
				let questions = await pool.query('SELECT * FROM question WHERE exam_id=$1 ORDER by id ASC', [result.rows[0].id])
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
	.post(isAdmin, async (req, res) => {
		const values = [req.body.examName]
		try {
			const result = await pool.query('INSERT INTO exam (name) VALUES ($1) RETURNING id', values)
			res.status(200).send(result.rows[0].id)
		} catch (err) {
			console.log(err)
			res.status(400).send(err)
		}
	})
	.put(isAdmin, async (req, res) => {
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
	.delete(isAdmin, async (req, res) => {
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
			const result = await pool.query('SELECT * FROM answer WHERE question_id=$1 ORDER by id ASC', [questionId])
			res.status(200).send(result.rows)
		} catch (err) {
			res.status(404).send("Virhe haettaessa dataa")
		}
	})
	.post(isAdmin, async (req, res) => {
		const values = [req.body.question, req.body.exam_id]
		try {
			const result = await pool.query('INSERT INTO question (question, exam_id) VALUES ($1,$2) RETURNING id', values)
			res.status(200).send(result.rows[0].id)
		} catch (err) {
			console.log(err)
			res.status(400).send(err)
		}
	})
	.put(isAdmin, async (req, res) => {
		const values = [req.body.id, req.body.question]
		try {
			const result = await pool.query('UPDATE question SET question=$2 WHERE id=$1', values)
			res.status(200).send("Ok")
		} catch (err) {
			console.log(err)
			res.status(400).send(err)
		}
	})
	.delete(isAdmin, async (req, res) => {
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
	.post(isAdmin, async (req, res) => {
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
	.put(isAdmin, async (req, res) => {
		const values = [req.body.id, req.body.answer, req.body.isCorrect]
		try {
			const result = await pool.query('UPDATE answer SET answer=$2, correct_answer=$3 WHERE id=$1', values)
			res.status(201).send("OK")
		} catch (err) {
			console.log(err)
			res.status(400)
		}
	})
	.delete(isAdmin, async (req, res) => {
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
		console.log("KIRJAUTUMINEN")
		const username = req.body.username
		const plainPassword = req.body.password
		let token
		try {
			const pass = await pool.query('SELECT password, role, id FROM public.user WHERE username=$1', [username])
			if (pass.rowCount > 0) {
				const hash = pass.rows[0].password
				const result = await bcrypt.compare(plainPassword, hash)
				if (result) {
					token = await jwt.sign({
						id:       pass.rows[0].id,
						username: username,
						role:     pass.rows[0].role
					}, "salainenavain", {expiresIn: "1h"})
					res.status(201).json({correct: true, role: pass.rows[0].role, id: pass.rows[0].id, token: token})
				} else {
					res.status(401).json({correct: false, message: "Wrong username or password"})
				}
			} else {
				res.status(401).json({correct: false, message: "Wrong username or password"})
			}
		} catch (err) {
			res.status(400).json({correct: false, message: "Palvelinvirhe"})
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
				res.status(400).send("Käyttäjätunnus varattu")
			} else {
				console.log(err)
				res.send(false)
			}
		}
	})

// USERS ROUTE
app.route('/users')
	.all(verifyToken)
	.all(isAdmin)
	.get(async (req, res) => {
		try {
			const result = await pool.query("SELECT * FROM public.user")
			if (result.rowCount > 0) {
				res.status(200).json({users: result.rows})
			}
		} catch (err) {
			res.status(400)
		}
	})
	.post(async (req, res) => {
	
	})
	.put(async (req, res) => {
	
	})
	.delete(async (req, res) => {
	
	})

app.route('/email')
	.post(async (req, res) => {
		const {email, subject, text} = req.body
		try {
			emailsender.send(email, subject, text)
		} catch (err) {
			console.log(err)
		}
	})

// AUTHENTICATION CHECK
app.get('/RequestAccess', verifyToken, (req, res) => {
	res.status(200).json(req.decoded)
})

// HASH PASSWORD
const hashPassword = async (password) => {
	return await bcrypt.hash(password, 10)
}