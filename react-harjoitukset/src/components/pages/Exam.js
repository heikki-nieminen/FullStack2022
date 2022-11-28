import {useContext, useEffect, useState} from "react"
import axios from "axios"
import edit from './img/edit.png'
import './styles.css'
import {useSearchParams} from "react-router-dom"
import Question from "./Question"
import {UserContext} from "../context/UserContext"

const Exam = (props) => {
	
	let [searchParams] = useSearchParams()
	const [addQuestion, setAddQuestion] = useState(false)
	const [isExamData, setIsExamData] = useState(false)
	const [initializeData, setInitializeData] = useState(false)
	
	const currentUser = useContext(UserContext)
	console.log(currentUser)
	useEffect(() => {
		props.dispatch({
			type:    "SET_EXAM_ID",
			payload: {id: searchParams.get('id')}
		})
		
		const getExam = async (examId) => {
			try {
				let res = await axios({
					method: 'get',
					url:    props.server + '/exam?id=' + examId
				})
				props.dispatch({type: "SET_EXAM", payload: res.data})
				setInitializeData(true)
				console.log("DATA SET TO TRUE")
				setIsExamData(true)
			} catch (err) {
				console.log("Virhe ", err)
			}
		}
		if (!initializeData) {
			console.log("Calling getExam()")
			getExam(searchParams.get('id'))
		}
	}, [])
	
	/* const saveChanges = async () => {
			 // SAVE EXAM
			 try {
					 let res = await axios({
							 method: 'put',
							 url: props.server + '/exam?id=' + props.content.exam.examId,
							 data: props.content.exam
					 })
			 } catch (err) {
					 console.log("Virhe ", err)
			 }

			 // SAVE QUESTIONS

			 props.content.exam.questions.map(async (question, index) => {
					 if (question.id) {
							 try {
									 let res = await axios({
											 method: 'put',
											 url: props.server + '/exam/question?id=' + question.id,
											 data: question
									 })
							 } catch (err) {
									 console.log("Virhe ", err)
							 }
					 } else {
							 try {
									 let res = await axios({
											 method: 'post',
											 url: props.server + '/exam/question',
											 data: question
									 })
									 props.dispatch({type: "ADD_QUESTION_ID", payload: {id: res.data, index: index}})
							 } catch (err) {
									 console.log("Virhe ", err)
							 }
					 }

					 // SAVE ANSWERS
					 question.answers.map(async (answer, answerIndex) => {
							 console.log("TALLENNETAAN VASTAUS: ", answer)
							 if (answer.id) {
									 try {
											 let res = await axios({
													 method: 'put',
													 url: props.server + '/exam/question/answer?id=' + answer.id,
													 data: answer
											 })
									 } catch (err) {
											 console.log("Virhe ", err)
									 }
							 } else {
									 try {
											 answer.question_id = question.id
											 let res = await axios({
													 method: 'post',
													 url: props.server + '/exam/question/answer',
													 data: answer
											 })
											 console.log("RES: ", res.data)
											 props.dispatch({
													 type: "ADD_ANSWER_ID",
													 payload: {id: res.data, answerIndex: answerIndex, questionIndex: index}
											 })
									 } catch (err) {
											 console.log("Virhe ", err)
									 }
							 }

					 })
			 })
	 }*/
	
	return (<div className="exam-container">
		{initializeData ?
			<>
				{isExamData ?
					<>
						<div className="exam-title-container">
							<div className="exam-title">
								{props.content.exam.name}
							</div>
							{props.content.user.role === "admin" &&
								<img className="exam-image" src={edit} alt="Edit exam button" onClick={() => {
									props.dispatch({type: "SET_EXAM_EDIT_MODE"})
								}}/>
							}
						</div>
						{props.content.exam.questions ?
							<>
								{props.content.exam.questions.map((item, index) => {
									return (<Question key={index} server={props.server} question={item} id={index}
									                  edit={props.content.exam.edit} initialized={props.content.initialized}
									                  dispatch={props.dispatch}/>)
								})}
								<button>Tallenna vastaukset</button>
							</>
							:
							<>
								<p>Ei sisältöä</p>
							</>
						}
						{props.content.exam.edit &&
							<>
								{addQuestion ?
									<AddQuestion dispatch={props.dispatch} examId={props.content.exam.id}
									             setAddQuestion={setAddQuestion} server={props.server}
									             content={props.content}/>
									:
									<div className="exam-buttons">
										<button onClick={() => {
											setAddQuestion(true)
										}}>Lisää kysymys
										</button>
									</div>
								}
							</>
						}
					</>
					:
					<>
						<h1>404 - Tenttiä ei löydy</h1>
					</>
				}
			</>
			:
			<>
				<h1>Ladataan...</h1>
			</>
		}
	</div>)
}

const AddQuestion = (props) => {
	return (<div className="add-question-buttons">
		<input id="add-question" type="text" placeholder="Uusi kysymys"/>
		<div>
			<button onClick={async () => {
				const question = document.getElementById("add-question").value
				let request = {question: question, exam_id: props.content.exam.id}
				try {
					let res = await axios({
						method: 'post',
						url:    props.server + '/exam/question',
						data:   request
					})
					props.dispatch({
						type: "ADD_QUESTION", payload: {
							id:       res.data,
							question: question,
							examId:   props.examId
						}
					})
				} catch (err) {
					console.log(err)
				}
				
				props.setAddQuestion(false)
			}}>Lisää kysymys
			</button>
			<button onClick={() =>
				props.setAddQuestion(false)
			}>Peruuta
			</button>
		</div>
	</div>)
}

export default Exam