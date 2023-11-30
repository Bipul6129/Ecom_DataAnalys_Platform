import React, { Component, useContext } from 'react'
import { json, Navigate, redirect,Route } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const AnalystRoute = ({children})=>{
    let {user}=useContext(AuthContext)
    if(user==null){
        return <Navigate to="/"/>
    }else if(user.role!=="analyst"){
        return <Navigate to="/"/>
    }
    return children
}

export default AnalystRoute