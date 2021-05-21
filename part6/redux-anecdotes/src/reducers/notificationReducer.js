const notificationReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_VOTE':
            return ['voted for: ', action.data.content]
        case 'NEW_ANECDOTE':
            return ['created: ', action.data.content]
        case 'HIDE_NOTIFICATION':
            return []
        default:
            return state
    }
}

export const hide = () => {
    return {
      type: 'HIDE_NOTIFICATION'
    }
  }

export default notificationReducer

