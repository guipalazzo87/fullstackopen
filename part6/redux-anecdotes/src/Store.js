import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'


const combinedReducers = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer
})

const store = createStore(combinedReducers,  composeWithDevTools())

const displayState = () => console.log(store.getState());

store.subscribe(displayState)

export default store