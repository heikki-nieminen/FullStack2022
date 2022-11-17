import './examApp.css'
import {useEffect, useReducer, useState} from "react"
import Navigation from "./Navigation"
import {Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Exams from "./pages/Exams"
import Register from "./Register"
import Exam from "./pages/Exam"
import PageNotFound from "./pages/PageNotFound"
import Login from "./Login"
import axios from "axios"

const server = 'https://localhost:8080'

const reducer = (state, action) => {
	switch (action.type) {
		case "INITIALIZE_DATA": {
			return {...state, initialized: action.payload}
		}
		case "SET_ALERT" : {
			return {...state, alert: action.payload}
		}
		case "LOGIN": {
			let stateCopy = JSON.parse(JSON.stringify(state))
			console.log(action.payload.token)
			localStorage.setItem('access_token', action.payload.token)
			axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`;
			stateCopy.user.loggedIn = true
			stateCopy.user.id = action.payload.id
			stateCopy.user.role = action.payload.role
			stateCopy.user.token = action.payload.token
			return {...stateCopy, alert: ""}
		}
		case "LOGOUT": {
			let stateCopy = JSON.parse(JSON.stringify(state))
			localStorage.removeItem('access_token')
			stateCopy.user.loggedIn = false
			stateCopy.user.id = 0
			stateCopy.user.role = ""
			stateCopy.user.token = ""
			return stateCopy
		}
		case "SET_USER" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.user.id = action.payload.id
			stateCopy.user.role = action.payload.role
			stateCopy.user.username = action.payload.name
			stateCopy.user.loggedIn = true
			return stateCopy
		}
		case "SET_EXAMS" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			return {...stateCopy, exams: action.payload}
		}
		case "SET_EXAM_ID" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			console.log("SETTING EXAM ID")
			return {...stateCopy, examId: action.payload.id, initialized: action.payload.initialized}
		}
		case "SET_EXAM" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			console.log("PAYLOAD NIMI: ", action.payload.name)
			return {...stateCopy, exam: action.payload}
		}
		case "SET_QUESTION" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.exam.questions.push(action.payload)
			return stateCopy
		}
		case "SET_ANSWERS" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			console.log("SETTING ANSWERS", action.payload.answers)
			console.log("QUESTIONS: ", stateCopy.exam.questions)
			stateCopy.exam.questions[action.payload.questionId].answers = action.payload.answers
			return stateCopy
		}
		case "SET_QUESTION_EDIT_MODE" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.exam.questions[action.payload].edit = !stateCopy.exam.questions[action.payload].edit
			return stateCopy
		}
		case "SET_EXAM_EDIT_MODE" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.exam.edit = !stateCopy.exam.edit
			return stateCopy
		}
		case "ADD_EXAM" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.exams.push({id: action.payload.id, name: action.payload.examName})
			return stateCopy
		}
		case "REMOVE_EXAM" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.exams.splice(action.payload, 1)
			return stateCopy
		}
		case "ADD_QUESTION" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.exam.questions.push({
				id:       action.payload.id,
				question: action.payload.question,
				exam_id:  action.payload.examId,
				answers:  []
			})
			return stateCopy
		}
		case "EDIT_QUESTION": {
			let stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.exam.questions[action.payload.questionId].question = action.payload.question
			return stateCopy
		}
		case "ADD_QUESTION_ID" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.exam.questions[action.payload.index].id = action.payload.id
			return stateCopy
		}
		case "ADD_ANSWER" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.exam.questions[action.payload.questionId].answers.push({
				id:             action.payload.id,
				answer:         action.payload.answer,
				question_id:    action.payload.realQuestionId,
				correct_answer: action.payload.correct
			})
			console.log("Vastaus lisätty: ", stateCopy)
			return stateCopy
		}
		case "EDIT_ANSWER" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.exam.questions[action.payload.questionId].answers[action.payload.answerId].answer = action.payload.answer
			stateCopy.exam.questions[action.payload.questionId].answers[action.payload.answerId].correct_answer = action.payload.isCorrect
			return stateCopy
		}
		case "ADD_ANSWER_ID" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.exam.questions[action.payload.questionIndex].answers[action.payload.answerIndex].id = action.payload.answerIndex
			console.log("LISÄTTIIN VASTAUSID: ", stateCopy.exam.questions[action.payload.questionIndex].answers)
			return stateCopy
		}
		case "REMOVE_QUESTION" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.exam.questions.splice(action.payload.questionId, 1)
			return stateCopy
		}
		case "REMOVE_ANSWER" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			let removed = stateCopy.exam.questions[action.payload.questionId].answers.splice(action.payload.answerId, 1)
			console.log("POISTETTIIN: ", removed)
			return stateCopy
		}
		case "SAVE_EXAM" : {
			let stateCopy = JSON.parse(JSON.stringify(state))
			return stateCopy
		}
	}
}

const initialState = {
	user:         {id: 0, role: "", token: "", loggedIn: false},
	editQuestion: false,
	initialized:  false,
	exams:        [],
	getData:      false,
	alert:        "",
	loggedIn:     false,
	examId:       0,
	exam:         {name: "", questions: []},
	changes:      []
}

const ExamApp = () => {
	const [content, dispatch] = useReducer(reducer, initialState)
	const [loginState, setLoginState] = useState(false)
	const [registerState, setRegisterState] = useState(false)
	const [initializeData, setInitializeData] = useState(false)
	
	// Initialize data and validate token
	useEffect(() => {
		if (!initializeData) {
			const getUserData = async () => {
				const token = localStorage.getItem('access_token')
				if (token) {
					axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
					let userData = await axios({
						method: 'get',
						url:    server + '/RequestAccess'
					})
					console.log(userData.data)
					dispatch({
						type:    "SET_USER",
						payload: {id: userData.data.id, role: userData.data.role, name: userData.data.username}
					})
				}
			}
			getUserData()
			setInitializeData(true)
		}
	}, [])
	
	return (
		<div>
			{initializeData &&
				<>
					<Navigation content={content} dispatch={dispatch} setLoginState={setLoginState}
					            setRegisterState={setRegisterState} server={server}/>
					
					<Routes>
						<Route path="/" element={<Home/>}/>
						<Route path="*" element={<PageNotFound/>}/>
						<Route path="/exams" element={<Exams server={server} content={content} dispatch={dispatch}/>}/>
						<Route path="/exam" element={<Exam server={server} dispatch={dispatch} content={content}/>}/>
					</Routes>
				</>
			}
			{loginState && <Login setLoginState={setLoginState} dispatch={dispatch} server={server}/>}
			{registerState && <Register setRegisterState={setRegisterState} dispatch={dispatch} server={server}/>}
			<p className="login-alert">{content.alert}</p>
		</div>
	)
}

export default ExamApp

