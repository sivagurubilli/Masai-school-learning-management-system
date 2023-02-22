
import React,{useState,useEffect} from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface IPrtectedRoutes{
 children:any,
}

const PrivateRoute= () => {
    const state = useSelector((state:RootState)=>state.Authreducer)
    const username = localStorage.getItem("username");
    return (username ? <Outlet /> :<Navigate to ="/admin/login" replace />)

}

export default PrivateRoute