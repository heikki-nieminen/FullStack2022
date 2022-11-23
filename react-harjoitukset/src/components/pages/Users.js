import {useEffect, useState} from "react"
import axios from "axios"
import './styles.css'

const Users = (props) => {
	const [users, setUsers] = useState([])
	
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
		getUsers()
		console.log(users)
	}, [])
	
	return (<div>
		{props.user.role === 'admin' ?
			<>
				{users.map((item, index) => {
					return <User user={item} key={index} server={props.server} setUsers={setUsers}/>
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
		console.log(props)
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
	return (<div className="user-container">
		<p className="username">{props.user.username}</p>
		<select id="role" defaultValue={props.user.role} onChange={(e) => {
			updateUser({server: props.server, id: props.user.id, role: e.target.value})
		}}>
			<option value="admin">Admin</option>
			<option value="user">User</option>
		</select>
		<button onClick={(e) => {
			props.setUsers(current => {
				current.filter((item) => item.id !== props.user.id)
			})
			deleteUser({server: props.server, id: props.user.id})
		}}>Poista
		</button>
	</div>)
}

export default Users