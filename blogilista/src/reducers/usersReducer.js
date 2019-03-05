import usersService from '../services/users'

const usersReducer = (store = [], action) => {
  switch(action.type) {
  case 'SET_USERS':
    return action.users
  default:
    return store
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch({
      type: 'SET_USERS',
      users
    })
  }
}

export default usersReducer