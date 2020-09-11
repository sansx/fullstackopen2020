import React from 'react'
import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} ></Header>
            <Content parts={course.parts} ></Content>
            <Total parts={course.parts} ></Total>
        </div>
    )
}

export default Course