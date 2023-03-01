import { RootState } from '@/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Navbar from '../../../components/AdminsideComponents/AdminNavbar'
import BookMarkDetailsNavbar from '../../../components/StudentSideComponents/BookMarks/BookMarkDetailNavbar'
import "../BookMarks/index.css"

const BookMarkDetails = () => {

const {id} = useParams()
const store = useSelector((state:RootState)=>state.Authreducer)

  return (
    <div className="container">
       <Navbar />
       <BookMarkDetailsNavbar id={id}/>
    </div>
  )
  
}

export default BookMarkDetails