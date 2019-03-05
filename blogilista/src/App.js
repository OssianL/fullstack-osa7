import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Users from './components/Users'
import User from './components/User'
import UserLogIn from './components/UserLogIn'
import Blog from './components/Blog'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, setUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { Container, Button, Menu } from 'semantic-ui-react'

const App = props => {

  useEffect(() => {
    props.initializeBlogs()
    props.initializeUser()
    props.initializeUsers()
  }, [])

  return (
    <Container>
      <Router>
        <div>
          <Menu>
            <Menu.Item link>
              <Link to='/'>blogs</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/users'>users</Link>
            </Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item>
                {props.user ? <em>{props.user.name} logged in <Button basic color='red' onClick={() => props.setUser(null)}>logout</Button></em> : <Link to='/login'>login </Link>}
              </Menu.Item>
            </Menu.Menu>

          </Menu>
          <h2>blogs</h2>
          <Route exact path='/' render={() => <BlogList />} />
          <Route exact path='/users' render={() => <Users />} />
          <Route exact path='/users/:id' render={({ match }) => <User userId={match.params.id}/>} />
          <Route exact path='/blogs/:id' render={({ match }) => <Blog blogId={match.params.id}/>} />
          <Route exact path='/login' render={() => <UserLogIn />} />
        </div>
      </Router>
      <Notification />
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  initializeUser,
  initializeUsers,
  setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)