import Question from "./Question"

const Exam = (props) => {
    console.log("ropsit", props)
    return (<div className="exam-container">
        <div className="exam-title">{props.content.exam.name}</div>
        {props.content.exam.questions ?
            <>
                {props.content.exam.questions.map((item, index) => <Question key={index} question={item}
                                                                             dispatch={props.dispatch}/>)}
            </>
            :
            <>
                <h1>Ei sisältöä</h1>
            </>
        }
    </div>)
}

export default Exam