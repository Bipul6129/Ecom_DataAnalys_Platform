import React, { Component, useContext } from 'react'
import { json, Navigate, redirect,Route, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const AdminRoute = ({children})=>{

    let {user}=useContext(AuthContext)
    if(user==null){
        return <Navigate to="/"/>
    }else if(user.role!=="admin"){
        return <Navigate to="/"/>
    }
    return children
}

export default AdminRoute