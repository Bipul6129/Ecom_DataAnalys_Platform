import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const AuthContext = createContext()
export default AuthContext;



export const AuthProvider = ({children})=>{

    

    let history = useNavigate()

    let [authTokens,setAuthTokens]=useState(()=>localStorage.getItem('authTokens')? JSON.parse(localStorage.getItem('authTokens')):null)
    let [user,setUser]=useState(()=>localStorage.getItem('userDetail')? JSON.parse(localStorage.getItem('userDetail')):null)
    let [loading,setLoading]=useState(true)
    let [adminLogin,setAdminLogin]=useState(false)
    let [serverUrl,setServerUrl]=useState('http://localhost:8000')
    console.log(user)
    let loginUser = async(e)=>{
        console.log('form submitted')
        e.preventDefault()
        let userCredential={
            username:e.target.username.value,
            password:e.target.password.value
        }
        
        try{
            let response = await axios.post(serverUrl+'/userApi/login/',userCredential)
            console.log(response.data)
            let mytokens={
                access:response.data.access,
                refresh:response.data.refresh
            }
            let userDetail={
                id:response.data.user_id,
                username:response.data.username,
                email:response.data.email,
                role:response.data.role
            }
            localStorage.setItem('authTokens',JSON.stringify(mytokens))
            localStorage.setItem('userDetail',JSON.stringify(userDetail))
            setAuthTokens(mytokens)
            setUser(userDetail)

            if(userDetail.role==='admin'){
                setAdminLogin(true)
                history('/admin/landing')
            }
            if(userDetail.role=='analyst'){
                history('/analyst/landing')
            }
        }catch(error){
            console.log(error)
            Swal.fire({
                icon:'error',
                title:'LoginError',
                text:"Login Error Check Credentials"
            })
        }
        console.log(userCredential)
    }

    let logoutUser= ()=>{
        setAuthTokens(null)
        setUser(null)
        setAdminLogin(false)
        localStorage.removeItem('authTokens')
        localStorage.removeItem('userDetail')
        history('/')
    }

    let updateToken=async()=>{
        console.log('tokenUpdated')
        try{
            let response = await axios.post(serverUrl+'api/token/refresh/', { refresh: authTokens.refresh });
            localStorage.setItem('authTokens',JSON.stringify(response.data))
            
        
        }catch(error){
            logoutUser()
        }
        if(loading){
            setLoading(false)
        }
    }

    let contextData={
        loginUser:loginUser,
        user:user,
        authTokens:authTokens,
        logoutUser:logoutUser,
        adminLogin:adminLogin,
        serverUrl:serverUrl
    }

    useEffect(()=>{
        if(loading){
            updateToken()
        }
        let interval=setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        },1000*60*25)
        return ()=>clearInterval(interval)
    },[authTokens,loading])


    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

