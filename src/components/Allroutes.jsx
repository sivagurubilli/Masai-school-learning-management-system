import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Adminlogin from '../Pages/AdminLogin/Adminlogin.jsx'
import Adminsignup from '../Pages/AdminSignup/Adminsignup.jsx'
import ForgetPassword from './ForgetPassword/ForgetPassword.jsx'


const Allroutes = () => {

  return (
<div>
  <Routes>
     <Route path ="/" />
     <Route path="/lectures" element={<ForgetPassword/>} />
   
     <Route  path ="/admin/login" element ={<Adminlogin />}/>
     <Route  path ="/admin/signup" element ={<Adminsignup />}/>
     <Route path="/user/profile" />
     <Route path ="/transcript"  />
  </Routes>
</div>
  )
}

export default Allroutes