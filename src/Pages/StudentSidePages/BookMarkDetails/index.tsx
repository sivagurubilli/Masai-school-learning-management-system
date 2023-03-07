import { LectureSingleService } from '../../../Services/LectureServices'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../../components/AdminsideComponents/AdminNavbar'
import BookMarkDetailsNavbar from '../../../components/StudentSideComponents/BookMarks/BookMarkDetailNavbar'
import "../BookMarks/index.css"
import { ILectureResponse } from '../../../Services/LectureInterface'
import CommonModalComponent from '../../../components/Modal/commonModal'

const BookMarkDetails = () => {
const [lectureDetail,setLectureDetail] = useState<ILectureResponse>()
const [isOpen, setIsOpen] = useState<boolean>(false);
const [modalBody, setModalErrorBody] = useState<string>("");


const {id} = useParams()
useEffect(() => {
  const fetchData = async ()=> {
    try{
  const response = await LectureSingleService(id);
  if(response.lectureid){
    setLectureDetail(response);
  }
    }catch(error){
      setIsOpen(true);
        setModalErrorBody(
          "Sorry about that! There is a scheduled downtime on your servers, so please check them"
        );
    }
  }
  fetchData()
}, [id]);
  return (
    <div className="container">
       <Navbar />
       <BookMarkDetailsNavbar id={id}/>
       <CommonModalComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalBody={modalBody}
      />
    </div>
  )
}

export default BookMarkDetails
