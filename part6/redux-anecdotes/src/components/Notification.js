import React from 'react'
import { useSelector } from 'react-redux'


const Notification = () => {

  let style = {}
  const notification = useSelector(({ anecdotes, notification }) => {
    if (notification.length === 0) {
      style = { display: 'none' }
      notification = null
    } else {
      style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
      }
      return `${notification[0]} ${notification[1]}`

    } return notification
  })


  return (
    <div style={style}>
      {notification ? notification : null}
    </div>
  )
}

export default Notification