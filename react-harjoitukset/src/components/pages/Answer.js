const Answer = (props) => {

    return (<div className="answer">
        <input type="checkbox" value={props.answer.answer}/>
        {props.answer.answer}
    </div>)
}

export default Answer