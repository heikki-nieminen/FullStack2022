import './examApp.css'
import {useEffect, useReducer} from "react"

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USERNAME" : {
            let contentCopy = {state}
            return {...contentCopy, username: action.payload.username}
        }
        case "SET_PASSWORD" : {
            let contentCopy = {state}
            return {...contentCopy, password: action.payload.password}
        }
        case "LOGIN": {

        }
    }
}

const initialState = {
    username: "",
    password: "",
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

    return (
        <div>
            {!content.loggedIn &&
                <div className="login">
                    <input placeholder="Username" onChange={(e) => {
                        dispatch({type: "SET_USERNAME", payload: {username: e.target.value}})
                    }} value={content.username}
                    />
                    <input type="password" placeholder="Password" onChange={(e) => {
                        dispatch({type: "SET_PASSWORD", payload: {password: e.target.value}})
                    }} defaultValue={content.password}
                    />
                    <button>Kirjaudu</button>
                </div>
            }
            Tähän tulee tenttisovellus
        </div>
    )
}

export default ExamApp