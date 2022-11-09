import Nappain from "./Nappain"
import {useState} from "react"
import './styles.css'
import laskeTulos from "./LaskeTulos"

const Laskin = () =>{
    const nappaimet = [ "C","/","*","-",
                        "7","8","9","+",
                        "4","5","6", "",
                        "1","2","3","=",
                        "0","",".",""]

    const operators = ["/","*","+","-"]

    const [piste, setPiste] = useState(false)
    const [merkki, setMerkki] = useState(false)
    const [teksti, setTeksti] = useState("")
    const [param1, setParam1] = useState("")
    const [param2, setParam2] = useState("")
    const [operator, setOperator] = useState("")


    const nappainPainettu = (nappain) => {
        if(operators.includes(nappain)) {
            if(!merkki){
                console.log("Toimii")
                /*luvut.push(teksti)
                toiminnot.push(nappain)
                setTeksti(nappain)*/
                setTeksti(teksti + nappain)
                setPiste(false)
                setMerkki(true)
            }
        }

        else if(nappain === "C"){
            setPiste(false)
            setMerkki(false)
            setTeksti("")
        }
        else if(nappain === "."){
            if(!piste){
                setTeksti(teksti+nappain)
                setPiste(true)
            }
        }
        else if(nappain === "="){
            setMerkki(false)
            setTeksti(eval(teksti))
        }
        else{
            setTeksti(teksti+nappain)
            setMerkki(false)
        }
    }
    return(
        <div>
            <div className="laskin">
                <div className="display">
                    <input className="input-display" type="text" value={teksti}/>
                </div>
                <div className="button-layout">
                    {nappaimet.map((nappain, index)=>{
                        return <Nappain key={index} index={index} data={nappain} click={nappainPainettu}/>
                    })}
                </div>
            </div>
        </div>
    )
}
export default Laskin