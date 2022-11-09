import './examApp.css'
import {Link} from "react-router-dom"

const server = 'https://localhost:8080'

const Navigation = (props) => {

    return (
        <div className="nav-bar">
            <ul className="nav">
                <li><Link to='/'>Etusivu</Link></li>
                <li><Link to='/exams'>Tentit</Link></li>
            </ul>
            <ul className="nav right">
                {props.content.loggedIn ?
                    <li>
                        <a href='/' onClick={() => {props.dispatch({type: "LOGOUT"})}}>Kirjaudu ulos</a>
                    </li>
                    :
                    <>
                        <form id="login-form" className="login">
                            <input id="user" name="username" placeholder="Käyttäjätunnus" required/>
                            <input id="pass" name="password" placeholder="Salasana" type="password" required/>
                        </form>
                        <li>
                            <a href='/login' onClick={(e) => {
                                e.preventDefault()
                                props.login(document.getElementById("user").value, document.getElementById("pass").value)
                            }}>Kirjaudu
                            </a>
                        </li>
                        <li><Link to="/register">Rekisteröidy</Link></li>
                    </>
                }
            </ul>
        </div>
    )

}
export default Navigation