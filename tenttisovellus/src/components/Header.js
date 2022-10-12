import './styles.css'

const Header = () => {
    return (
        <div className="nav-bar">
            <ul className="nav-list">
                <li className="left"><a href="/tentit">Tentit</a></li>
            </ul>
            <ul className="nav-list right">
                <li className="right">Kirjaudu</li>
                <li className="right">Rekisteröidy</li>
            </ul>
        </div>
    )
}

export default Header