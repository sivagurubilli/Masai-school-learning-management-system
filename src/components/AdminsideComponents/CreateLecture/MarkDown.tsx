import React from "react"
import MDEditor from "@uiw/react-md-editor"

interface Props {
    content: string;
  }
  
const MarkDown= ({content}:Props) => {
  return (
    <div>
        <MDEditor.Markdown source ={content}/>
    </div>
  )
}

export default MarkDown