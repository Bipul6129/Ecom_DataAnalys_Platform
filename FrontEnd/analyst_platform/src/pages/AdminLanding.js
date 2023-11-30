import Header from "../components/Header"
import Cookies from 'js-cookie'
import Login from "./Login"
import AuthContext from "../context/AuthContext"
import { useContext } from "react"
import AnalystLanding from "./AnalystLanding"
const AdminLanding=()=>{
    let {user} = useContext(AuthContext)

    if(user===null){
        return (
            <Login/>
        )
    }else if(user.role==="analyst"){
        return(
            <AnalystLanding/>
        )
    }

    return (
        <>
            <div style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
                <h1 style={{color:"black"}}>This is Admin Landing</h1>
                <ol>
                    <li>Add Products</li>
                    <li>View Products</li>
                </ol>
            </div>
        </>
    )
}

export default AdminLanding;