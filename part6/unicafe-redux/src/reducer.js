const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}
export { initialState }

const counterReducer = (state = initialState, action) => {
  console.log(action)
  let classification = action.type.toLowerCase()
  let newState = {...state}
  switch (action.type) {
    case 'GOOD':
      newState[classification] = state[classification]+1
      return newState
    case 'OK':
      newState[classification] = state[classification]+1
      return newState
    case 'BAD':
      newState[classification] = state[classification]+1
      return newState
    case 'ZERO':
      newState = initialState
      return newState
    default: return state
  }

}

export default counterReducer