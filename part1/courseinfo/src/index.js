import React from 'react'
import ReactDOM from 'react-dom'

import Header from "./components/Header"
import Content from "./components/Content"
import Total from "./components/Total"

const App = () => {
  const course = 'Half Stack application development'

  const parts = [
    {
      id: 1,
      title: 'Fundamentals of React',
      exercises: 10
    },
    {
      id: 2,
      title: 'Using props to pass data',
      exercises: 7
    },
    {
      id: 3,
      title: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} ></Header>
      <Content parts={parts} ></Content>
      <Total parts={parts} ></Total>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))