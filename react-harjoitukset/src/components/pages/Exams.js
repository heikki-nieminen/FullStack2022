import {Link} from "react-router-dom"
import {useEffect, useState} from "react"
import axios from "axios"

const Exams = (props) => {
	const [addExam, setAddExam] = useState(false)
	
	const getExams = async () => {
		try {
			let res = await axios({
				method: 'post',
				url:    props.server + '/exams',
				data:   {
					role: props.content.role
				}
			})
			console.log(res.data)
			props.dispatch({type: "SET_EXAMS", payload: res.data})
		} catch (err) {
			console.log("Ei toimi ", err)
		}
	}
	
	useEffect(() => {
		getExams()
	}, [])
	
	const deleteExam = async (id) => {
		try {
			let res = await axios({
				method: 'delete',
				url:    props.server + '/exam',
				data:   {id: id}
			})
		} catch (err) {
			console.log(err)
		}
	}
	
	return (
		<div>
			<ul>{props.content.exams.map((item, index) => {
				return (<li key={index}><Link key={index} to={`/exam?id=${item.id}`} onClick={() => {
					props.dispatch({type: "INITIALIZE_DATA", payload: false})
					props.dispatch({
						type:    "SET_EXAM_ID",
						payload: {id: item.id, initialized: !props.content.initialized}
					})
				}}>{item.name}</Link>
					<button onClick={async () => {
						await deleteExam(item.id)
						props.dispatch({type: "REMOVE_EXAM", payload: index})
					}}>Poista tentti
					</button>
				</li>)
			})}</ul>
			{!addExam ? <button onClick={() => {
					setAddExam(true)
				}}>Uusi tentti</button>
				:
				<AddExam setAddExam={setAddExam} server={props.server} dispatch={props.dispatch}/>
			}
		</div>
	)
}

const AddExam = (props) => {
	return (<div>
		<input id="add-exam" type="text" placeholder="Tentin nimi"/>
		<button onClick={async () => {
			let exam = document.getElementById("add-exam").value
			try {
				let res = await axios({
					method: 'post',
					url:    props.server + '/exam',
					data:   {examName: exam}
				})
				props.dispatch({type: "ADD_EXAM", payload: {id: res.data, examName: exam}})
			} catch (err) {
			
			}
			props.setAddExam(false)
		}}>Lisää tentti
		</button>
	</div>)
}

export default Exams
