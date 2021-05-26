import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote, hideNotification } from '../reducers/anecdoteReducer'



const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.hideNotification()
  }

  return (
    <>
      <h2>create new</h2>

      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </>
  )
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = {
  createAnecdote,
  hideNotification,
}

const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm

