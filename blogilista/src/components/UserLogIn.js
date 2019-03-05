import React from 'react'
import { useField } from '../hooks/index'
import { connect } from 'react-redux'
import { setUser, userLogIn } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'semantic-ui-react'

const UserLogIn = props => {
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async event => {
    event.preventDefault()
    try {
      props.userLogIn(username.value, password.value)
    }
    catch(exception) {
      props.setNotification('käyttäjätunnus tai salasana virheellinen', 5)
    }
  }

  const handleLogout = () => {
    props.setUser(null)
  }

  if(props.user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Form onSubmit={handleLogin}>
          <Form.Field>
            <label>käyttäjätunnus</label>
            <input {...username} reset='' />
          </Form.Field>
          <Form.Field>
            <label>salasana</label>
            <input {...password} reset='' />
          </Form.Field>
          <Button basic color='green' type='submit'>kirjaudu</Button>
        </Form>
      </div>
    )
  }
  return (
    <div>
      <div>
        {props.user.name} logged in
      </div>
      <Button basic color='red' onClick={handleLogout}>logout</Button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  userLogIn,
  setNotification,
  setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogIn)