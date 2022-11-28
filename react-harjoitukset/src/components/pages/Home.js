import {Link} from "react-router-dom"

const Home = () => {
	
	return (<div>
		<h1>Etusivu</h1>
		<p>Tänne tulee tosi hieno tenttisovellus</p>
		<Link to="/admin">Admin</Link>
	</div>)
}

export default Home