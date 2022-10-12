import './styles.css'

const Header = () => {
    return (
        <div className="nav-bar">
            <ul className="nav-list">
                <li><a href="/tentit">Tentit</a></li>
            </ul>
            <ul className="nav-list right">
                <li>Kirjaudu</li>
                <li>Rekisteröidy</li>
            </ul>
        </div>
    )
}

export default Header