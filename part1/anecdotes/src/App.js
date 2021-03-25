import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const MostVoted = (props) => {
  let a = props.votes;
  let indexOfMax = a.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
  return (
    <div>
      {props.phrases[indexOfMax]}
    </div>)
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setVotes] = useState(Array(anecdotes.length).fill(0))

  const randomSelect = () => {
    setSelected(Math.floor(Math.random() * 6))
    return
  }

  const vote = () => {
    const copy = [...points]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        {anecdotes[selected]}
        <p>has {points[selected]} votes</p>
      </div>
      <div>
        <Button handleClick={randomSelect} text="next anecdote" />
        <Button handleClick={vote} selected={selected} text="vote" />
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <MostVoted votes={[...points]} phrases={[...anecdotes]} />
      </div>
    </div>
  )
}

export default App