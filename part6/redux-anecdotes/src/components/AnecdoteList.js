import React from 'react'
import { connect } from 'react-redux'
import { vote, hideNotification } from '../reducers/anecdoteReducer'


const AnecdoteList = (props) => {

  let match = new Set()

  let anecdotes = props.anecdotes

  if (props.filter) {
    const re = new RegExp(`(.+)?${props.filter}(.+)?`, 'i')
    for (let i = 0; i < Object.keys(props.anecdotes).length; i++) {
      if (props.anecdotes[i].content.search(re) !== -1) {
        match.add(props.anecdotes[i])
      }
    }
    const array = Array.from(match)
    match.clear()
    anecdotes = array
  } 

  const clickHandler = async (anecdote) => {
    props.vote(anecdote)
    props.hideNotification()
  }

  return (
    <div>
      {anecdotes && anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    anecdotes: state.anecdotes
  }
}
const mapDispatchToProps = {
  vote,
  hideNotification,
}


const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList