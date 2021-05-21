import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
<<<<<<< Updated upstream
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => dispatch(vote(anecdote.id))}>
              vote</button>
          </div>
=======

  const anecdotes = useSelector(({ anecdotes, notification }) => {
    return anecdotes
  })

const dispatch = useDispatch()

const clickHandler = ( anecdote ) => {
  dispatch(vote(anecdote.id, anecdote.content))
  setTimeout(() => {
    dispatch({ type: 'HIDE_NOTIFICATION' })
  }, 5000)
}

return (
  <div>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button
            onClick={() => clickHandler(anecdote)}>
            vote</button>
>>>>>>> Stashed changes
        </div>
      )}
    </div>
  )
}

export default AnecdoteList