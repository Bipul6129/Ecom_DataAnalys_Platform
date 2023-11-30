import { Link, Routes } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { useState } from "react"
import axios from "axios"

const Register = ()=>{


    return (
        <>
            <section>
                <h2>Register</h2>
                <form class="form">
                    <div class="form-group">
                        <label for="username">User name:</label>
                        <input type="text" id="username" name="username" placeholder="Enter your username" required/>
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" required/>
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" required/>
                        <i class="uil uil-lock icon"></i>
                        <i class="uil uil-eye-slash showHidePw"></i>
                    </div>
                    <div class="form-group">
                        <label for="role">Role:</label>
                        <select id="role" name="role" >
                            <option value="user">User</option>
                            <option value="analyst">Analyst</option>
                            <option value="admin">Admin</option>
                        </select>
                        
                    </div>
                    <div class="form-group">
                        <label for="register-btn"></label>
                        <button type="submit" class="register-btn">Register</button>
                    </div>
                    <div class="account-exist">
                        Already have an account? <Link to="/login">Login</Link>
                    </div>
                </form>
            </section>
            
        </>
    )
    
}

export default Register