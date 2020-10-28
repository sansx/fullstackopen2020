import React from "react";
import { CoursePart } from "../types"
import Part from './Part'

const Content: React.FC<{ parts: CoursePart[] }> = ({ parts }) => {
  const boxStyle = {
    border: '1px solid #eee',
    padding: '5px 20px',
    margin: ' 5px ',
    background: '#eee'
  }

  return <>
    { parts.map(part => <div key={part.name} style={boxStyle} >
      <Part part={part} >
      </Part>
    </div>)}
  </>
}


export default Content

