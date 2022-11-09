const {Pool, Client} = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'admin',
    port: 5432,
})

const addNewExam = async (name) => {
    const text = 'INSERT INTO exams(name) VALUES($1)'
    const values = [name]
    try {
        const res = await pool.query(text, values)
        console.log(res.rowCount)
    } catch (err) {
        console.log(err)
    }
//    pool.end()
}

//addNewExam("Haskell perusteet")

const removeExamById = async (id) => {
    const text = 'DELETE FROM exams WHERE id=$1'
    const values = [id]
    try {
        const res = await pool.query(text, values)
        console.log(res.rowCount)
    } catch (err) {
        console.log(err)
    }
}

//removeExamById(2)

const changeExamNameByName = async (id, newName) => {
    const text = 'UPDATE exams SET name=$2 WHERE id=$1'
    const values = [id, newName]
    try {
        const res = await pool.query(text, values)
        console.log(res.rowCount)
    } catch (err) {
        console.log(err)
    }
}

//changeExamNameByName("C perusteet", "Testi")

const getAllExams = async () => {
    try {
        const res = await pool.query('SELECT * FROM exams')
        console.log(res.rows)
    } catch (err) {
        console.log(err)
    }
}

//getAllExams()

const getExamById = async (id) => {
    const text = 'SELECT * FROM exams WHERE id=$1'
    const values = [id]
    try {
        const res = await pool.query(text, values)
        console.log(res.rows)
    } catch (err) {
        console.log(err)
    }
}

//getExamById(5)

const getAllExamsOrdered = async () => {
    try {
        const res = await pool.query('SELECT * FROM exams ORDER BY name ASC')
        console.log(res.rows)
    } catch (err) {
        console.log(err)
    }
}

//getAllExamsOrdered()

const getExamsByIds = async () => {
    try {
        const res = await pool.query('SELECT * FROM exams WHERE id IN (1,2,3)')
        console.log(res.rows)
    } catch (err) {
        console.log(err)
    }
}

//getExamsByIds()

const getExamsBeforeDate = async () => {
    try {
        const res = await pool.query("SELECT * FROM exams WHERE date<'2022-10-12'")
        console.log(res.rows)
    } catch (err) {
        console.log(err)
    }
}

//getExamsBeforeDate()

const getValidExams = async () => {
    try {
        const res = await pool.query('SELECT * FROM exams WHERE valid')
        console.log(res.rows)
    } catch (err) {
        console.log(err)
    }
}

//getValidExams()