import './examApp.css'
import axios from "axios"

const Login = (props) => {
	
	const login = async (username, password) => {
		try {
			let res = await axios({
				method: 'post', url: props.server + '/login', data: {
					username: username, password: password
				}
			})
			console.log("?????")
			if (res.data.correct === true) {
				console.log(res.data)
				props.dispatch({type: "LOGIN", payload: {id: res.data.id, role: res.data.role, token: res.data.token}})
				//props.dispatch({type: "SET_USER", payload: {role: res.data.role, id: res.data.id}})
				props.setLoginState(false)
			}
		} catch (err) {
			console.log(err)
			if (err.response.data.message === 'Wrong username or password') {
				props.dispatch({type: "SET_ALERT", payload: "Käyttäjätunnus tai salasana väärin"})
				let timeOutId
				timeOutId = setTimeout(() => {
					props.dispatch({type: "SET_ALERT", payload: ""})
					clearTimeout(timeOutId)
				}, 3000)
			} else {
				console.log(err)
				props.dispatch({type: "SET_ALERT", payload: "Ei yhteyttä palvelimeen"})
			}
		}
	}
	
	return (<div className="login-window">
		<button className="close-window" onClick={() => {
			props.setLoginState(false)
		}}>X
		</button>
		<form id="login-form" className="login-form">
			<input id="user" name="username" placeholder="Käyttäjätunnus" required/><br/>
			<input id="pass" name="password" placeholder="Salasana" type="password" required onKeyPress={(e) => {
				if (e.key === "Enter") {
					e.preventDefault()
					document.getElementById("login-button").click()
				}
			}}/>
		</form>
		<button id="login-button" onClick={() => {
			login(document.getElementById("user").value, document.getElementById("pass").value)
		}}>Kirjaudu
		</button>
	</div>)
}

export default Login