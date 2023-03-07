import { LectureSingleService } from '../../../Services/LectureServices'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../../components/AdminsideComponents/AdminNavbar'
import BookMarkDetailsNavbar from '../../../components/StudentSideComponents/BookMarks/BookMarkDetailNavbar'
import "../BookMarks/index.css"
import { ILectureResponse } from '../../../Services/LectureInterface'

const BookMarkDetails = () => {
const [lectureDetail,setLectureDetail] = useState<ILectureResponse>()
const [Error,setError] = useState<boolean>(false)


const {id} = useParams()
useEffect(() => {
  const fetchData = async ()=> {
    try{
  const response = await LectureSingleService(id);
  if(response.lectureid){
    setLectureDetail(response);
  }
    }catch(error){
     setError(true)
    }
  }
  fetchData()
}, [id]);
  return (
    <div className="container">
       <Navbar />
       <BookMarkDetailsNavbar id={id}/>
    </div>
  )
}

export default BookMarkDetails
