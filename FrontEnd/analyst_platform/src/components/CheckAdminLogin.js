import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const CheckAdminLogin=()=>{
    let {adminLogin} = useContext(AuthContext)
    let history = useNavigate()
    if(!adminLogin){
        return(
            history('/')
        )
    }
}

export default CheckAdminLogin;