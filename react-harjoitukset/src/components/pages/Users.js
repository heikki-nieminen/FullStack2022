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
	}, [])
	
	return (<div>
		{props.user.role === 'admin' ?
			<>
				{users.map((item, index) => {
					return <User user={item} key={index}/>
				})}
			</>
			:
			<>
				403 - Unauthorized
			</>
		}
	</div>)
}

const User = (props) => {
	return (<div className="user-container">
		<p className="username">{props.user.username}</p>
		<p className="user-role">{props.user.role}</p>
		<button>Vaihda rooli</button>
		<button>Poista</button>
	</div>)
}

export default Users