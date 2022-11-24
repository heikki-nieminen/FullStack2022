import {useEffect, useState} from "react"
import axios from "axios"
import './styles.css'

const Users = (props) => {
	const [users, setUsers] = useState([])
	
	const getExams = async () => {
		try {
			let res = await axios({
				method: 'get',
				url:    props.server + '/exams',
			})
			console.log(res.data)
			props.dispatch({type: "SET_EXAMS", payload: res.data})
		} catch (err) {
			console.log("Ei toimi ", err)
		}
	}
	
	useEffect(() => {
		
		const getUsers = async () => {
			try {
				const result = await axios({
					method: "get",
					url:    props.server + '/users'
				})
				console.log(result.data)
				setUsers(result.data.users)
			} catch (err) {
				console.log(err)
			}
		}
		getExams()
		getUsers()
		console.log(users)
	}, [])
	
	return (<div>
		{props.user.role === 'admin' ?
			<>
				{users.map((item, index) => {
					return <User user={item} key={index} server={props.server} setUsers={setUsers} users={users}
					             exams={props.exams}/>
				})}
			</>
			:
			<>
				403 - Unauthorized
			</>
		}
	</div>)
}

const updateUser = async (props) => {
	try {
		const result = await axios({
			method: "put",
			url:    props.server + '/users',
			data:   {id: props.id, role: props.role}
		})
	} catch (err) {
		console.log(err)
	}
}

const deleteUser = async (props) => {
	try {
		const result = await axios({
			method: "delete",
			url:    props.server + '/users',
			data:   {id: props.id}
		})
		
	} catch (err) {
		console.log(err)
	}
}

const User = (props) => {
	const [addExam, setAddExam] = useState(false)
	
	console.log(props)
	return (<div className="user-container">
		<p className="username">{props.user.username}</p>
		<select id="role" defaultValue={props.user.role} onChange={(e) => {
			updateUser({server: props.server, id: props.user.id, role: e.target.value})
		}}>
			<option value="admin">Admin</option>
			<option value="user">User</option>
		</select>
		<button onClick={(e) => {
			deleteUser({server: props.server, id: props.user.id, setUsers: props.setUsers})
			props.setUsers((users) => users.filter((item) => item.id !== props.user.id))
		}}>Poista
		</button>
		<button onClick={() => setAddExam(current => !current)}>Lisää tentti</button>
		{addExam ? <ExamsList exams={props.exams} userId={props.user.id} server={props.server}/> : null}
	</div>)
}

const addExamToUser = async (props) => {
	console.log("LISÄTÄÄN TENTTI KÄYTTÄJÄLLE")
	try {
		console.log(props)
		const result = await axios({
			method: "post",
			url:    props.server + '/users/exam',
			data:   {examId: props.examId, userId: props.userId, name: props.name}
		})
	} catch (err) {
		console.log(err)
	}
}

const ExamsList = (props) => {
	console.log(props)
	return (<ul className="user-add-exam">
		{props.exams.map((item, index) => <li key={index} onClick={() => {
			addExamToUser({examId: item.id, userId: props.userId, server: props.server, name: item.name})
		}}>{item.name}</li>)}
	</ul>)
}

export default Users