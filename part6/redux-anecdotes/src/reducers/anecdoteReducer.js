import anecdoteService from '../services/anecdotes'



const reducer = (state = [], action) => {

  switch (action.type) {

    case 'ADD_VOTE':
      const id = action.data.id
      const toVote = state.find(n => n.id === id)
      const voted = {
        ...toVote,
        votes: action.data.votes
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : voted).sort((a, b) => b.votes - a.votes)
    case 'NEW_ANECDOTE':
      console.log(action.data);
      return [...state, action.data].sort((a, b) => b.votes - a.votes)
    case 'INIT_ANECDOTES':
      return action.data

    default:
      return state.sort((a, b) => b.votes - a.votes)
  }
}
export default reducer

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}


export const vote = (anecdote) => {
  return async dispatch => {
    const content = { id: anecdote.id, content: anecdote.content, votes: anecdote.votes + 1 }
    const voted = await anecdoteService.update(content)
    dispatch({
      type: 'ADD_VOTE',
      data: voted
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}
