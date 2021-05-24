import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'


const AnecdoteList = () => {
  let match = new Set()

  const anecdotes = useSelector(({ anecdotes, notification, filter }) => {
    if (filter) {
      const re = new RegExp(`(.+)?${filter}(.+)?`, 'i')
      for (let i = 0; i < Object.keys(anecdotes).length; i++) {
        if (anecdotes[i].content.search(re) !== -1) {
          match.add(anecdotes[i])
        }
      }
      const array = Array.from(match)
      match.clear()
      return array
    } else {
      return anecdotes
    }
  })

  const dispatch = useDispatch()

  const clickHandler = async (anecdote) => {
    
    dispatch(vote(anecdote))
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
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList