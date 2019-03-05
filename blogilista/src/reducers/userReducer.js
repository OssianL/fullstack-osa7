import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
  switch(action.type) {
  case 'SET_USER':
    return action.user
  default:
    return state
  }
}

export const setUser = user => {
  return async dispatch => {
    if(user === null) window.localStorage.removeItem('loggedUser')
    else window.localStorage.setItem('loggedUser', JSON.stringify(user))
    dispatch({
      type: 'SET_USER',
      user
    })
  }
}

export const userLogIn = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({ username: username, password: password })
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch({
      type: 'SET_USER',
      user
    })
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if(loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      blogService.setToken(user.token)
      dispatch({
        type: 'SET_USER',
        user
      })
    }
  }
}

export default userReducer