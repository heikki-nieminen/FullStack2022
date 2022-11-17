import './styles.css'
import {useEffect, useState} from "react"
import edit from './img/edit.png'
import remove from './img/minus.png'
import add from './img/plus.png'
import axios from "axios"
import Answer from "./Answer"

const Question = (props) => {
	const [addAnswer, setAddAnswer] = useState(false)
	const [editQuestion, setEditQuestion] = useState(false)
	const [initializeData, setInitializeData] = useState(false)
	
	useEffect(() => {
		const getAnswers = async (questionId) => {
			if (questionId) {
				try {
					let res = await axios({
						method: 'get',
						url:    props.server + '/exam/question?id=' + questionId
					})
					props.dispatch({type: "SET_ANSWERS", payload: {questionId: props.id, answers: res.data}})
					setInitializeData(true)
				} catch (err) {
					console.log("Virhe ", err)
				}
			}
		}
		if (!initializeData) {
			getAnswers(props.question.id)
		}
	}, [])
	
	const saveQuestion = async () => {
		let question = document.getElementById("question-edit").value
		try {
			let res = await axios({
				method: 'put',
				url:    props.server + '/exam/question',
				data:   {id: props.question.id, question: question}
			})
			props.dispatch({type: "EDIT_QUESTION", payload: {questionId: props.id, question: question}})
		} catch (err) {
			console.log(err)
		}
		
	}
	
	return (
		<>
			{initializeData ?
				<div className="question">
					<div className="question-box">
						{!editQuestion ?
							<div className="question-title-container">
								<p className="question-title">{props.question.question}</p>
								{props.question.edit && <img className="edit-question-image" src={edit} onClick={() => {
									setEditQuestion(true)
								}}/>}
							</div>
							:
							<div className="question-title-container">
								<input id="question-edit" type="text" defaultValue={props.question.question}/>
								<button onClick={() => {
									saveQuestion()
									setEditQuestion(false)
								}}>Tallenna kysymys
								</button>
							</div>
						}
						<div className="answers-container">
							{props.question.answers ?
								<>
									{props.question.answers.map((item, index) => {
										return <Answer key={index} dispatch={props.dispatch} questionId={props.id} answer={item}
										               id={index} question={props.question}
										               edit={props.question.edit} server={props.server}/>
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
										<AddAnswer dispatch={props.dispatch} question={props.question} questionId={props.id}
										           setAddAnswer={setAddAnswer} server={props.server}/>
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
							<img className="question-image" src={remove} alt="Remove question button" onClick={async () => {
								let request = {id: props.question.id}
								try {
									let res = await axios({
										method: 'delete',
										url:    props.server + '/exam/question',
										data:   request
									})
									props.dispatch({type: "REMOVE_QUESTION", payload: {questionId: props.id}})
								} catch (err) {
									console.log(err)
								}
							}}/>
						</div>
					}
				</div>
				:
				<>
					<h1>Ladataan...</h1>
				</>
			}
		</>
	)
}

const AddAnswer = (props) => {
	return (<div>
		<input id="add-answer" type="text" placeholder="Uusi vastaus"/>
		<input id="correct-answer" type="checkbox"/> Oikea vastaus?<br/>
		<button onClick={async () => {
			const answer = document.getElementById("add-answer").value
			const correct = document.getElementById("correct-answer").checked
			let request = {answer: answer, question_id: props.question.id, correct_answer: correct}
			try {
				let res = await axios({
					method: 'post',
					url:    props.server + '/exam/question/answer',
					data:   request
				})
				props.dispatch({
					type:    "ADD_ANSWER",
					payload: {
						id:             res.data,
						realQuestionId: props.question.id,
						questionId:     props.questionId,
						answer:         answer,
						correct:        correct
					}
				})
			} catch (err) {
				console.log(err)
			}
			props.setAddAnswer(false)
		}}>Add
		</button>
		<button onClick={() => {
			props.setAddAnswer(false)
		}}>Cancel
		</button>
	</div>)
}

export default Question