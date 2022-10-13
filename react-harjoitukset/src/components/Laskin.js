import Nappain from "./Nappain"
import {useState} from "react"
import './styles.css'

const Laskin = () =>{


    const nappaimet = [ "C","/","*","-",
                        "7","8","9","+",
                        "4","5","6", "",
                        "1","2","3","=",
                        "0","",",",""]
    const [teksti, setTeksti] = useState("")
    const nappainPainettu = (nappain) => {

        if(nappain === "C"){
            console.log(nappain)
            setTeksti("")
        }
        else if(nappain === "="){
            setTeksti(eval(teksti))
        }
        else
            setTeksti(teksti+nappain)
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