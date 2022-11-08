import './examApp.css'
import {useEffect, useReducer} from "react"
import axios from "axios"

const dbserver = 'https://localhost:8080'

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_ALERT" : {
            return {...state, alert: action.payload}
        }
        case "LOGIN": {
            return {...state, loggedIn: true, alert: ""}
        }
        case "LOGOUT": {
            return {...state, loggedIn: false}
        }
    }
}

const initialState = {
    alert: "",
    loggedIn: false,
    userId: 0

}

const ExamApp = () => {
    const [content, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {

    }, [])

    useEffect(() => {
        console.log("TILAMUUTOS")
    }, [content.username, content.password])

    const login = async (username, password) => {
        try {
            let res = await axios({
                method: 'post',
                url: dbserver + '/login',
                data: {
                    username: username,
                    password: password
                }
            })
            console.log(res.data)
            if (res.data === true) {
                dispatch({type: "LOGIN"})
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
            dispatch({type: "SET_ALERT", payload: "Ei yhteyttä palvelimeen"})
        }
    }

    const register = async (username, password, email) => {
        try {
            let res = await axios({
                method: 'post',
                url: dbserver + '/register',
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

    return (
        <div>
            {!content.loggedIn ?
                <>
                    <form className="login" onSubmit={(e) => {
                        e.preventDefault()
                        login(e.target.username.value, e.target.password.value)
                    }}>
                        <input name="username" placeholder="Käyttäjätunnus" required/>
                        <input name="password" placeholder="Salasana" type="password" required/>
                        <button>Kirjaudu</button>
                    </form>
                    <p className="login-alert">{content.alert}</p>
                </>
                :
                <>
                    <button onClick={() => {dispatch({type: "LOGOUT"})}}>Kirjaudu ulos</button>

                </>
            }
        </div>
    )
}

export default ExamApp

