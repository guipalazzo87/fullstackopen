import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (!props[0]) {
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback has been given</p>
      </>)
  } else {
    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <Statistic text="good" value={props[1]} />
            <Statistic text="neutral" value={props[2]} />
            <Statistic text="bad" value={props[3]} />
            <Statistic text="sum" value={props[4]} />
            <Statistic text="average" value={props[5]} />
            <Statistic text="percentual" value={props[6] + " %"} />
          </tbody>
        </table>
      </div>)
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [hasFeedback, setHasFeedback] = useState(false);

  const addToBad = () => {
    setBad(bad + 1)
    setHasFeedback(true)
  }
  const addToNeutral = () => {
    setNeutral(neutral + 1)
    setHasFeedback(true)
  }
  const addToGood = () => {
    setGood(good + 1)
    setHasFeedback(true)
  }

  const sum = bad + neutral + good
  const average = Math.round(((good - bad) / sum) * 100) / 100
  const percentual = Math.round(((good * 100) / sum) * 100) / 100

  const bundle = [hasFeedback, good, neutral, bad, sum, average, percentual]

  return (
    <div>
      <h1>Give feedback!</h1>
      <Button handleClick={addToGood} text={"Good"} />
      <Button handleClick={addToNeutral} text={"Neutral"} />
      <Button handleClick={addToBad} text={"Bad"} />
      <Statistics {...bundle} />
    </div>
  )
}

export default App