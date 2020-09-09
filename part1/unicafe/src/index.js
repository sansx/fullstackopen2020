import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({ good, neutral, bad }) => <><h1>statistics</h1>
  {good || neutral || bad ? <div><div>good {good}</div>
    <div>neutral {neutral}</div>
    <div>bad {bad}</div>
    <div>all {good + neutral + bad}</div></div> : "No feedback given"} </>

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)} >good</button>
      <button onClick={() => setNeutral(neutral + 1)} >neutral</button>
      <button onClick={() => setBad(bad + 1)} >bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} ></Statistics>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)