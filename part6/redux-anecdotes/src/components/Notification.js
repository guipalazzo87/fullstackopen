import React from 'react'
import { connect } from 'react-redux'



const Notification = (props) => {
  let style = {}
  let notification = null
  if (props.notification.length === 0) {
    style = { display: 'none' }
    notification = null
  } else {
    style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
    }
    notification = `${props.notification[0]} ${props.notification[1]}`
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification