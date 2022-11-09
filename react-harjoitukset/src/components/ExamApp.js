import './examApp.css'
import {useEffect, useReducer} from "react"
import axios from "axios"
import Navigation from "./Navigation"
import {Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Exams from "./pages/Exams"
import Register from "./pages/Register"
import Exam from "./pages/Exam"

const server = 'https://localhost:8080'

const reducer = (state, action) => {
    switch (action.type) {
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
            return {...state, examId: action.payload}
        }
        case "SET_EXAM" : {
            let stateCopy = JSON.parse(JSON.stringify(state))
            console.log("PAYLOAD NIMI: ", action.payload.name)
            return {...stateCopy, exam: action.payload}
        }
    }
}

const initialState = {
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
    useEffect(() => {
        console.log("USE EFFECT")
        if (content.examId) {
            console.log("???????")
            const getExam = async (examId) => {
                try {
                    let res = await axios({
                        method: 'get',
                        url: server + '/exam?id=' + examId
                    })
                    dispatch({type: "SET_EXAM", payload: res.data})
                    console.log("RESULT: ", res.data)
                } catch (err) {
                    console.log("Virhe ", err)
                }
            }
            getExam(content.examId)
        }
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
            <Navigation login={login} content={content} dispatch={dispatch}/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/exams" element={<Exams content={content} dispatch={dispatch}/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/exam" element={<Exam dispatch={dispatch} content={content}/>}/>
            </Routes>
            <p className="login-alert">{content.alert}</p>
        </div>
    )
}

export default ExamApp

