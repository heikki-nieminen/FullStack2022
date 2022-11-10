import Answer from "./Answer"
import './styles.css'
import edit from './img/edit.png'
import remove from './img/minus.png'
import add from './img/plus.png'
import {useEffect, useState} from "react"

const Question = (props) => {
    const [addAnswer, setAddAnswer] = useState(false)

    useEffect(() => {

    }, [addAnswer])

    return (
        <div className="question">
            <div className="question-box">
                <div className="question-title">{props.question.question}</div>
                <div className="answers-container">
                    {props.question.answers ?
                        <>
                            {props.question.answers.map((item, index) => {
                                return <Answer key={index} dispatch={props.dispatch} questionId={props.id} answer={item}
                                               id={index}
                                               edit={props.question.edit}/>
                            })}
                        </>
                        :
                        <>
                            EI vastauksia
                        </>
                    }
                    {props.question.edit &&
                        <>
                            {addAnswer ?
                                <AddAnswer dispatch={props.dispatch} questionId={props.id}
                                           realQuestionId={props.question.id} setAddAnswer={setAddAnswer}/>
                                :
                                <img className="question-image" src={add} alt="Add answer button" onClick={(e) => {
                                    setAddAnswer(true)
                                }}/>

                            }
                        </>
                    }
                </div>
            </div>
            {props.edit &&
                <div className="question-buttons">
                    <img className="question-image" src={edit} alt="Edit question button" onClick={() => {
                        console.log(props.question)
                        props.dispatch({type: "SET_QUESTION_EDIT_MODE", payload: props.id})
                    }}/>
                    <br/>
                    <img className="question-image" src={remove} alt="Remove question button"/>
                </div>
            }
        </div>
    )
}

const AddAnswer = (props) => {
    return (<div>
        <input id="add-answer" type="text" placeholder="Uusi vastaus"/>
        <input id="correct-answer" type="checkbox"/> Oikea vastaus?<br/>
        <button onClick={() => {
            props.dispatch({
                type: "ADD_ANSWER",
                payload: {
                    realQuestionId: props.realQuestionId,
                    questionId: props.questionId,
                    answer: document.getElementById("add-answer").value,
                    correct: document.getElementById("correct-answer").checked
                }
            })
            props.setAddAnswer(false)
        }}>Add
        </button>
        <button>Cancel</button>
    </div>)
}

export default Question