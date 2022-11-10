import './examApp.css'

const Login = (props) => {
    return (<div className="login-window">
        <button className="close-window" onClick={() => {
            props.setLoginState(false)
        }}>X
        </button>
        <form id="login-form" className="login-form">
            <input id="user" name="username" placeholder="Käyttäjätunnus" required/><br/>
            <input id="pass" name="password" placeholder="Salasana" type="password" required/>
        </form>
        <button onClick={() => {
            props.login(document.getElementById("user").value, document.getElementById("pass").value)
        }}>Kirjaudu
        </button>
    </div>)
}

export default Login