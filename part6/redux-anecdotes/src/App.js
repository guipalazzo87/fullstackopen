import React, {useEffect} from 'react'

import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'



import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import SearchField from './components/SearchField'

const App = () => {

  const dispatch = useDispatch()
  
  
  useEffect(() => {
    dispatch(initializeAnecdotes()) 
  },[dispatch]) 


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