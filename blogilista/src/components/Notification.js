import React from 'react'
import { connect } from 'react-redux'
import './Notification.css'

const Notification = ({ notification }) => {
  if(notification.length > 0) {
    return <div className='notification'>{notification}</div>
  }
  else return null
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)