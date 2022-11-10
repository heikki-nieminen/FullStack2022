import Question from "./Question"
import {useEffect} from "react"
import axios from "axios"
import edit from './img/edit.png'

const Exam = (props) => {
    useEffect(() => {
        props.dispatch({type: "INITIALIZE_DATA", payload: false})
        if (props.content.examId) {
            const getExam = async (examId) => {
                try {
                    let res = await axios({
                        method: 'get',
                        url: props.server + '/exam?id=' + examId
                    })
                    props.dispatch({type: "SET_EXAM", payload: res.data})
                    props.dispatch({type: "INITIALIZE_DATA", payload: true})
                } catch (err) {
                    console.log("Virhe ", err)
                }
            }
            getExam(props.content.examId)
        }
    }, [])

    return (<div className="exam-container">
        {props.content.initialized &&
            <>
                <div className="exam-title-container">
                    <div className="exam-title">
                        {props.content.exam.name}
                    </div>
                    <img className="exam-image" src={edit} alt="Edit exam button" onClick={() => {
                        props.dispatch({type: "SET_EXAM_EDIT_MODE"})
                    }}/>
                </div>
                {props.content.exam.questions ?
                    <>
                        {props.content.exam.questions.map((item, index) => {
                            return <Question key={index} server={props.server} question={item} id={index}
                                             edit={props.content.exam.edit}
                                             dispatch={props.dispatch}/>
                        })
                        }
                    </>
                    :
                    <>
                        <p>Ei sisältöä</p>
                    </>
                }
                {props.content.exam.edit &&
                    <button>Tallenna muutokset</button>
                }
            </>
        }
    </div>)
}

export default Exam