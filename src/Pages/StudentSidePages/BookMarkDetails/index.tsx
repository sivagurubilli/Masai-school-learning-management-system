import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../../components/AdminsideComponents/AdminNavbar'
import BookMarkDetailsNavbar from '../../../components/StudentSideComponents/BookMarks/BookMarkDetailNavbar'
import "../BookMarks/index.css"

const BookMarkDetails = () => {

const {id} = useParams()

  return (
    <div className="container">
       <Navbar />
       <BookMarkDetailsNavbar id={id}/>
    </div>
  )
}

export default BookMarkDetails
