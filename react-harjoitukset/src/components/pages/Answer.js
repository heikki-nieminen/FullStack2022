import edit from './img/edit.png'
import remove from './img/minus.png'

const Answer = (props) => {

    return (<div className="answer">
        <div>
            <input type="checkbox" value={props.answer.answer}/>
            {props.answer.answer}
        </div>
        {props.edit &&
            <div className="right">
                <img className="answer-image" src={edit}/>
                <img className="answer-image" src={remove} alt="Remove answer button" onClick={() => {
                    props.dispatch({type: "REMOVE_ANSWER", payload: {questionId: props.questionId, answerId: props.id}})
                }}/>
            </div>
        }
    </div>)
}

export default Answer