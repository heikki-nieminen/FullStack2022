import './examApp.css'
import {Link} from "react-router-dom"

const Navigation = (props) => {
	
	return (
		<div className="nav-bar">
			<ul className="nav">
				<li><Link to='/'>Etusivu</Link></li>
				{props.content.loggedIn && <li><Link to='/exams'>Tentit</Link></li>}
			</ul>
			<ul className="nav right">
				{props.content.loggedIn ?
					<li>
						<Link to='/' onClick={() => {props.dispatch({type: "LOGOUT"})}}>Kirjaudu ulos</Link>
					</li>
					:
					<>
						<li>
							<a className="login-button" onClick={(e) => {
								e.preventDefault()
								props.setLoginState(true)
							}}>Kirjaudu
							</a>
						</li>
						<li><a className="register-button" onClick={(e) => {
							e.preventDefault()
							props.setRegisterState(true)
						}}>Rekisteröidy</a></li>
					</>
				}
			</ul>
		</div>
	)
	
}
export default Navigation