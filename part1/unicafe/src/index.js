import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;

  return <><h1>statistics</h1>
    {good || neutral || bad ? <div>
      <table>
        <tbody>
          <Statistic text={"good"} value={good}></Statistic>
          <Statistic text={"neutral"} value={neutral}></Statistic>
          <Statistic text={"bad"} value={bad}></Statistic>
          <Statistic text={"all"} value={all}></Statistic>
          <Statistic text={"average"} value={((good - bad) / all).toFixed(1)}></Statistic>
          <Statistic text={"positive"} value={(good / all * 100).toFixed(1) + "%"}></Statistic>
        </tbody>
      </table>
    </div> : "No feedback given"} </>
}

const Statistic = ({ text, value }) => <tr>
  <td>{text}</td><td>{value}</td>
</tr>

const IncBtn = ({ text, fn }) => <button onClick={fn} >{text}</button>

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <IncBtn text="good" fn={() => setGood(good + 1)} ></IncBtn>
      <IncBtn text="neutral" fn={() => setNeutral(neutral + 1)} ></IncBtn>
      <IncBtn text="bad" fn={() => setBad(bad + 1)} ></IncBtn>
      <Statistics good={good} neutral={neutral} bad={bad} ></Statistics>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)