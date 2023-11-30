import { useCallback, useContext, useEffect, useState } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import axios from "axios"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import AdminLanding from "./AdminLanding"
import AnalystLanding from "./AnalystLanding"


const Login = () =>{
    let {loginUser,user} = useContext(AuthContext)
    let history=useNavigate()

    if(user===null){

    }else if(user.role==="admin"){
        return(
            <AdminLanding/>
        )
    }else if(user.role==="analyst"){
        return(
            <AnalystLanding/>
        )
    }
    

    return(
        <>
            <section>
                <h2>Login</h2>
                <form class="form" onSubmit={loginUser}>
                    <div class="form-group">
                        <label for="username">Username:</label>
                        <input type="text" id="username" name="username"placeholder="Enter your username" required/>
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password"placeholder="Enter your password" required/>
                    </div>
                    <div class="form-group">
                        <label for="register-btn"></label>
                        <button type="submit" class="register-btn">Login</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login;