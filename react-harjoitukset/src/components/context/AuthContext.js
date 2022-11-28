import {createContext} from "react"
import axios from "axios"

export const AuthContext = createContext(async (userId) => {
	try {
		const result = await axios({
			method: "get",
			url:    "https://localhost:8080/isAdmin"
		})
		console.log(result)
	} catch (err) {
	
	}
})
