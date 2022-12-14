import axios from "axios"
import './examApp.css'

const Register = (props) => {
	const register = async (username, password, email) => {
		console.log(password)
		let res
		try {
			res = await axios({
				method: 'post',
				url:    props.server + '/register',
				data:   {
					username: username,
					password: password,
					email:    email
				}
			})
			if (res.data === true) {
				props.dispatch({type: "SET_ALERT", payload: "Tili luotu onnistuneesti"})
				let timeOutId
				timeOutId = setTimeout(() => {
					props.dispatch({type: "SET_ALERT", payload: ""})
					clearTimeout(timeOutId)
				}, 3000)
			} else {
				props.dispatch({type: "SET_ALERT", payload: res.data})
				let timeOutId
				timeOutId = setTimeout(() => {
					props.dispatch({type: "SET_ALERT", payload: ""})
					clearTimeout(timeOutId)
				}, 3000)
			}
		} catch (err) {
			props.dispatch({type: "SET_ALERT", payload: err.response.data})
		}
	}
	
	const handleRegisterClick = async () => {
		if (document.getElementById("reg-pass1").value !== document.getElementById("reg-pass2").value) {
			props.dispatch({type: "SET_ALERT", payload: "Salasanat eivät täsmää"})
		} else {
			register(document.getElementById("reg-user").value, document.getElementById("reg-pass1").value, document.getElementById("reg-email").value)
		}
	}
	
	return (<div className="register-container">
		<button className="close-window" onClick={() => {
			props.setRegisterState(false)
		}}>X
		</button>
		<br/>
		<input id="reg-user" type="text" placeholder="Käyttäjätunnus"/><br/>
		<input id="reg-pass1" type="password" placeholder="Salasana"/><br/>
		<input id="reg-pass2" type="password" placeholder="Vahvista salasana"/><br/>
		<input id="reg-email" type="email" placeholder="Sähköposti"/><br/>
		<button onClick={handleRegisterClick}>Luo käyttäjä</button>
	</div>)
}

export default Register