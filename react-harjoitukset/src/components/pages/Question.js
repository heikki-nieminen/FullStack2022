import Answer from "./Answer"
import './styles.css'

const Question = (props) => {
    return (<div className="question-box">
        <div className="question-title">{props.question.question}</div>
        <div className="answers-container">
            {props.question.answers.map((item, index) => {
                return <Answer key={index} answer={item}/>
            })}
        </div>
    </div>)
}
export default Question