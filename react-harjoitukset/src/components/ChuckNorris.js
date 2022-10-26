import {useEffect, useReducer, useState} from "react"
import axios from "axios"

const API = "https://api.chucknorris.io/jokes/random1"

const reducer = (state, action) => {
    switch (action.type) {
        case "ALUSTA_DATA" : {
            let vitsikopio = JSON.parse(JSON.stringify({...state}))
            return {...vitsikopio, dataAlustettu: true}
        }
        case "HAE_VITSI" : {
            let vitsikopio = JSON.parse(JSON.stringify({...state}))
            return {...vitsikopio, haeVitsi: true}
        }
        case "VITSI_HAETTU" : {
            let vitsikopio = JSON.parse(JSON.stringify({...state}))
            return {...vitsikopio, value: action.payload.value, vitsiHaettu: true}
        }
        case "KÄYNNISTÄ_HAKU" : {
            let vitsikopio = JSON.parse(JSON.stringify({...state}))
            return {
                ...vitsikopio,
                haeAutomaattisesti: action.payload.haeAutomaattisesti,
                hakuPaalla: action.payload.hakuPaalla
            }
        }
        case "HAE_AUTOMAATTISESTI" : {
            let vitsikopio = JSON.parse(JSON.stringify({...state}))
            return {...vitsikopio, haeAutomaattisesti: action.payload}
        }
        case "PYSAYTA_HAKU" : {
            let vitsikopio = JSON.parse(JSON.stringify({...state}))
            // console.log(vitsikopio)
            return {...vitsikopio, pysaytaHaku: true, haeAutomaattisesti: false}
        }
        case "HAE_SATUNNAINEN_VITSI": {
            let vitsikopio = JSON.parse(JSON.stringify({...state}))
            return {...vitsikopio}
        }
        case "HAE_LOCAL_STORAGESTA": {
            let vitsikopio = JSON.parse(JSON.stringify({...state}))
            // console.log("VITSEJÄ JÄLJELLÄ: ", action.payload.vitsit)
            return {
                ...vitsikopio,
                value: action.payload.value,
                vitsit: action.payload.vitsit,
                vitsiHaettu: true,
                vitsitLoppu: action.payload.vitsitLoppu
            }
        }
        case "TALLENNUS_TILA": {
            let vitsikopio = JSON.parse(JSON.stringify({...state}))
            return {...vitsikopio, tallennus: action.payload}
        }
        case "TALLENNA_LOCAL_STORAGEEN": {
            return {...state}
        }
        default: {
            throw new Error("Virhe")
        }
    }
}

let intervalID = ""
let timeoutID = ""
let kerrotutVitsit = []

const ChuckNorris = () => {

    const tarkistaVitsi = (uusiVitsi) => {
        console.log("TARIKSTETAAN: ", uusiVitsi)
        if (kerrotutVitsit.includes(uusiVitsi)) console.log("LÖYTYY JO")
        return !kerrotutVitsit.includes(uusiVitsi);
    }

    const [vitsi, dispatch] = useReducer(reducer, {
        value: "",
        vitsiHaettu: false,
        haeVitsi: false,
        tallennus: false,
        pysaytaHaku: false,
        vitsitLoppu: false,
        hakuPaalla: false,
        vitsit: []
    })

    const [local, setLocal] = useState(false)

    useEffect(() => {
        console.log("Tarkastetaan löytyyko local storage")
        // LOCAL STORAGEN LUONTI JOS EI OLE
        let localVitsit = JSON.parse(localStorage.getItem("vitsiData"))
        if (!localVitsit) {
            localStorage.setItem("vitsiData", JSON.stringify(vitsi))
        } else {
            dispatch({type: "HAE_LOCAL_STORAGESTA", payload: {vitsit: localVitsit.vitsit}})
        }
    }, [])

    useEffect(() => {
        //console.log("TÄÄLLÄ OLLAAN")
        const haeVitsi = async () => {
            console.log("Kutsutaan haeVitsi()")
            try {
                let data = await axios(API)
                dispatch({type: "VITSI_HAETTU", payload: data.data})
                setLocal(false)
            } catch (error) {
                setLocal(true)
                let vitsit = vitsi.vitsit.slice()
                let index = Math.floor(Math.random() * vitsi.vitsit.length)
                if (vitsi.vitsit.length > 0) {
                    console.log("SPLICE")
                    vitsit.splice(index, 1)
                    dispatch({
                        type: "HAE_LOCAL_STORAGESTA",
                        payload: {value: vitsi.vitsit[index], vitsit: vitsit, index: index}
                    })

                } else {
                    console.log("VITSIT ON NY LOPPU")
                    dispatch({
                        type: "HAE_LOCAL_STORAGESTA",
                        payload: {value: "VITSIT LOPPU", vitsit: vitsit, index: index, vitsitLoppu: true}
                    })
                }
            }
            dispatch({type: "TALLENNUS_TILA", payload: true})
        }

        if (vitsi.haeVitsi && !vitsi.vitsitLoppu) {
            vitsi.haeVitsi = false
            haeVitsi()
        }

        // Ei toimi täysin vielä
        if (vitsi.haeAutomaattisesti && vitsi.hakuPaalla) {
            vitsi.hakuPaalla = false
            haeVitsi()
            console.log("INTERVAL KÄYNNISTETTY")
            intervalID = setInterval(() => {
                haeVitsi()
            }, 500)
        }
        if (vitsi.pysaytaHaku === true || vitsi.vitsitLoppu === true) {
            vitsi.pysaytaHaku = false
            vitsi.haeAutomaattisesti = false
            clearInterval(intervalID)
            intervalID = ""
        }

    }, [vitsi, vitsi.hakuPaalla])

    useEffect(() => {
        if (vitsi.tallennus && !vitsi.vitsitLoppu) {
            // console.log("TALLENNUKSEEN")
            dispatch({type: "TALLENNUS_TILA", payload: false})
            if (vitsi.value) {
                if (tarkistaVitsi(vitsi.value)) {
                    kerrotutVitsit.push(vitsi.value)
                    if (!local) {
                        let localVitsit = JSON.parse(localStorage.getItem("vitsiData"))
                        //  console.log(localVitsit)
                        localVitsit.vitsit.push(vitsi.value)
                        localStorage.setItem("vitsiData", JSON.stringify(localVitsit))
                    }
                }
            }
        }
    }, [vitsi.tallennus])

    return (
        <div>

            {vitsi.haeAutomaattisesti ?
                <>
                    <button onClick={() => {dispatch({type: "PYSAYTA_HAKU"})}}>
                        Lopeta haku
                    </button>
                </>
                :
                <>
                    <button onClick={() => dispatch({type: "HAE_VITSI"})}>Hae vitsi</button>
                    <button onClick={() => {
                        dispatch({
                            type: "KÄYNNISTÄ_HAKU",
                            payload: {haeAutomaattisesti: true, hakuPaalla: true}
                        })
                    }}>
                        Hae automaattisesti
                    </button>
                </>
            }
            {local && <>Local</>}
            <br/>
            {vitsi.vitsiHaettu &&
                <>
                    {vitsi.value}
                </>
            }
        </div>
    )
}

export default ChuckNorris