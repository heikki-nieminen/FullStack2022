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
                        <li>
                            <a href='/login' onClick={(e) => {
                                e.preventDefault()
                                props.setLoginState(true)
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