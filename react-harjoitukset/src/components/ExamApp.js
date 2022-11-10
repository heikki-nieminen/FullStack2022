import './examApp.css'
import {useEffect, useReducer, useState} from "react"
import axios from "axios"
import Navigation from "./Navigation"
import {Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Exams from "./pages/Exams"
import Register from "./pages/Register"
import Exam from "./pages/Exam"
import PageNotFound from "./pages/PageNotFound"
import Login from "./Login"

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
            return {...state, loggedIn: true, alert: ""}
        }
        case "LOGOUT": {
            return {...state, loggedIn: false, role: ""}
        }
        case "SET_ROLE" : {
            return {...state, role: action.payload}
        }
        case "SET_EXAMS" : {
            let stateCopy = JSON.parse(JSON.stringify(state))
            return {...stateCopy, exams: action.payload}
        }
        case "SET_EXAM_ID" : {
            return {...state, examId: action.payload.id, initialized: action.payload.initialized}
        }
        case "SET_EXAM" : {
            let stateCopy = JSON.parse(JSON.stringify(state))
            console.log("PAYLOAD NIMI: ", action.payload.name)
            return {...stateCopy, exam: action.payload}
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
        case "ADD_ANSWER" : {
            let stateCopy = JSON.parse(JSON.stringify(state))
            stateCopy.exam.questions[action.payload.questionId].answers.push({
                answer: action.payload.answer,
                question_id: action.payload.realQuestionId,
                correct_answer: action.payload.correct
            })
            console.log("Vastaus lisätty: ", stateCopy)
            return stateCopy
        }
        case "REMOVE_ANSWER" : {
            let stateCopy = JSON.parse(JSON.stringify(state))
            stateCopy.exam.questions[action.payload.questionId].answers.splice(action.payload.answerId, 1)
            return stateCopy
        }
    }
}

const initialState = {
    editQuestion: false,
    initialized: false,
    exams: [],
    getData: false,
    alert: "",
    loggedIn: false,
    userId: 0,
    role: "admin",
    examId: 0,
    exam: {name: "", questions: []}
}

const ExamApp = () => {
    const [content, dispatch] = useReducer(reducer, initialState)
    const [loginState, setLoginState] = useState(false)
    useEffect(() => {

    }, [content.examId])

    const register = async (username, password, email) => {
        try {
            let res = await axios({
                method: 'post',
                url: server + '/register',
                data: {
                    username: username,
                    password: password,
                    email: email
                }
            })
            if (res.data === true) {
                dispatch({type: "SET_ALERT", payload: "Tili luotu onnistuneesti"})
                let timeOutId
                timeOutId = setTimeout(() => {
                    dispatch({type: "SET_ALERT", payload: ""})
                    clearTimeout(timeOutId)
                }, 3000)
            } else {
                dispatch({type: "SET_ALERT", payload: "Virhe tilin luonnissa"})
                let timeOutId
                timeOutId = setTimeout(() => {
                    dispatch({type: "SET_ALERT", payload: ""})
                    clearTimeout(timeOutId)
                }, 3000)
            }
        } catch (err) {

        }
    }
    const login = async (username, password) => {
        try {
            let res = await axios({
                method: 'post',
                url: server + '/login',
                data: {
                    username: username,
                    password: password
                }
            })
            console.log(res.data)
            if (res.data[0] === true) {
                dispatch({type: "LOGIN"})
                dispatch({type: "SET_ROLE", payload: res.data[1]})
                setLoginState(false)
            } else {
                console.log("TESTI")
                dispatch({type: "SET_ALERT", payload: "Käyttäjätunnus tai salasana väärin"})
                let timeOutId
                timeOutId = setTimeout(() => {
                    dispatch({type: "SET_ALERT", payload: ""})
                    clearTimeout(timeOutId)
                }, 3000)
            }
        } catch (err) {
            console.log(err)
            dispatch({type: "SET_ALERT", payload: "Ei yhteyttä palvelimeen"})
        }
    }
    return (
        <div>
            <Navigation content={content} dispatch={dispatch} setLoginState={setLoginState}/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="*" element={<PageNotFound/>}/>
                <Route path="/exams" element={<Exams server={server} content={content} dispatch={dispatch}/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/exam" element={<Exam server={server} dispatch={dispatch} content={content}/>}/>
            </Routes>
            {loginState &&
                <Login login={login} setLoginState={setLoginState}/>
            }
            <p className="login-alert">{content.alert}</p>
        </div>
    )
}

export default ExamApp

