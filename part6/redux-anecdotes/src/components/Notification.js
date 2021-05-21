
<<<<<<< Updated upstream
import React from 'react'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      render here notification...
=======
const Notification = () => {

  let style = {}
  const notification = useSelector(({ anecdotes, notification }) => {

    if (notification.length === 0) {
      style = { display: 'none' }
    } else {
      style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
      }
    }
    return notification
  })


  return (
    <div style={style}>
      {notification ? notification : null}
>>>>>>> Stashed changes
    </div>
  )
}

export default Notification