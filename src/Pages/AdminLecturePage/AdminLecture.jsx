import React from 'react'
import "../../App.css"
import Secondnav from '../../components/AdminLecture/Secondnav'

import Navbar from '../../components/Navbar/Navbar.jsx'

const AdminLecture = () => {
  return (
    <div className='container'>
       <Navbar/>
       <Secondnav/>
        
  </div>
  )
}

export default AdminLecture