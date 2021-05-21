import React from 'react'

import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import SearchField from './components/SearchField'

const App = () => {

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <SearchField />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App