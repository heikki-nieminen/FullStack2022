import {Link} from "react-router-dom"
import {useEffect} from "react"
import axios from "axios"

const server = 'https://localhost:8080'

const Exams = (props) => {

    useEffect(() => {
        const getData = async () => {
            try {
                let res = await axios({
                    method: 'post',
                    url: server + '/exams',
                    data: {
                        role: props.content.role
                    }
                })
                console.log(res.data)
                props.dispatch({type: "SET_EXAMS", payload: res.data})
            } catch (err) {
                console.log("Ei toimi ", err)
            }
        }
        getData()
    }, [])

    return (
        <div>
            <ul>{props.content.exams.map((item, index) => {
                return (<li key={index}><Link key={index} to={`/exam?id=${item.id}`} onClick={() => {
                    props.dispatch({type: "SET_EXAM_ID", payload: item.id})
                }}>{item.name}</Link></li>)
            })}</ul>
        </div>
    )
}

export default Exams
