import axios from "axios"
import {useEffect, useReducer, useState} from "react"

const server = 'https://localhost:8080'
const initialData = {
    username: "",
    password: "",
    postDataState: false,
    loggedIn: false,
    userType: "",
    postType: "",
    postData: {},
    content: "",
    saveState: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_DATA" : {
            let dataCopy = JSON.parse(JSON.stringify(state))
            return {...dataCopy, content: action.payload}
        }
        case "LOGGED_IN" : {
            console.log("Logged in ", action.payload)
            let dataCopy = JSON.parse(JSON.stringify(state))
            return {...dataCopy, loggedIn: true, userType: action.payload}
        }
        case "LOGIN" : {
            let dataCopy = JSON.parse(JSON.stringify(state))
            return {
                ...dataCopy,
                postType: "login",
                postDataState: true,
                postData: {user: dataCopy.username, pass: dataCopy.password}
            }
        }
        case "POST_DATA_STATE" : {
            let dataCopy = JSON.parse(JSON.stringify(state))
            return {...dataCopy, postDataState: action.payload}
        }
        case "SET_USERNAME" : {
            let dataCopy = JSON.parse(JSON.stringify(state))
            return {...dataCopy, username: action.payload}
        }
        case "SET_PASSWORD" : {
            let dataCopy = JSON.parse(JSON.stringify(state))
            return {...dataCopy, password: action.payload}
        }
        case "SAVE_DATA" : {
            let dataCopy = JSON.parse(JSON.stringify(state))
            return {...dataCopy, postType: "saveData", postDataState: true, postData: dataCopy.content}
        }
        case "SAVE_STATE" : {
            let dataCopy = JSON.parse(JSON.stringify(state))
            return {...dataCopy, saveState: action.payload}
        }
        case "BLOCK_LOOP" : {
            let dataCopy = JSON.parse(JSON.stringify(state))
            return {...dataCopy, postType: "blockLoop", postDataState: true}
        }
        default: {
            throw new Error("VIRHE")
        }
    }
}

const Client = () => {

    const [data, dispatch] = useReducer(reducer, initialData)
    const [timeoutID, setTimeoutID] = useState(0)

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axios(server)
                dispatch({type: "SET_DATA", payload: result.data.data})
            } catch {
                console.log("Eipä toimi")
            }
        }
        getData()
    }, [])

    useEffect(() => {
        if (data.postDataState) {
            const postData = async (postdata, datatype) => {
                console.log("async", datatype)
                try {
                    switch (datatype) {
                        case ("login") : {
                            let res = await axios({
                                method: 'post',
                                url: server,
                                data: {username: postdata.user, password: postdata.pass, postType: "login"}
                            })
                            if (res.data) {
                                dispatch({type: "LOGGED_IN", payload: res.data})
                            }
                            break
                        }
                        case ("saveData"): {
                            let res = await axios({
                                method: 'post',
                                url: server,
                                data: {content: postdata, postType: "saveData"}
                            })
                            if (res.data) {
                                console.log("SAATIIN VASTAUS")
                                dispatch({type: "SAVE_STATE", payload: true})
                            }
                            break
                        }
                        case ("blockLoop"): {
                            let res = await axios({
                                method: 'post',
                                url: server,
                                data: {postType: "blockLoop"}
                            })
                            if (res.data) {
                                console.log("Servu jumissa")
                            }
                            break
                        }
                    }
                } catch {
                    console.log("Virhetila")
                }
            }
            postData(data.postData, data.postType)
            dispatch({type: "POST_DATA_STATE", payload: false})
        }
    }, [data.postDataState])

    useEffect(() => {
        if (data.saveState) {
            let timeout = setTimeout(() => {
                dispatch({type: "SAVE_STATE", payload: false})
            }, 5000)
            setTimeoutID(timeout)
        } else {
            clearTimeout(timeoutID)
        }
    }, [data.saveState])

    return (
        <div>
            <div>
                {data.userType === "user" && <div>Olet kirjautunut sisään käyttäjänä</div>}
                {data.userType === "admin" && <div>Olet kirjautunut sisään adminina</div>}
            </div>
            <div className="login">
                <input type="text" defaultValue="Käyttäjätunnus" onChange={(e) => {
                    dispatch({type: "SET_USERNAME", payload: e.target.value})
                }}/>
                <input type="text" defaultValue="Salasana" onChange={(e) => {
                    dispatch({type: "SET_PASSWORD", payload: e.target.value})
                }}/>

                <button onClick={() => {
                    dispatch({type: "LOGIN"})
                }}>Kirjaudu
                </button>
            </div>
            <br/>
            {data.userType === "user" && <div>{data.content}</div>}
            {data.userType === "admin" && <div>
                <input type="text" value={data.content} onChange={(e) => {
                    dispatch({type: "SET_DATA", payload: e.target.value})
                }}/>
                <button onClick={() => {
                    dispatch({type: "SAVE_DATA"})
                }}>Tallenna data
                </button>
                <button onClick={() => {
                    dispatch({type: "BLOCK_LOOP"})
                }}>Blokkaa looppi
                </button>
            </div>}
            {data.saveState && <div>Data tallennettu</div>}

        </div>
    )
}

export default Client