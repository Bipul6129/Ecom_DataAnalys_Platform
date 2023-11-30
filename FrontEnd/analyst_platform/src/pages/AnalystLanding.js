import { useContext } from "react"
import AdminLanding from "./AdminLanding"
import Login from "./Login"
import AuthContext from "../context/AuthContext"

const AnalystLanding=()=>{
    let {user} = useContext(AuthContext)

    if(user===null){
        return (
            <Login/>
        )
    }else if(user.role==="admin"){
        return(
            <AdminLanding/>
        )
    }
    return (
        <>
            <div style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
                <h1 style={{color:"black"}}>This is Analyst Landing</h1>
                <ol>
                    
                </ol>
            </div>
        </>
    )
}

export default AnalystLanding;