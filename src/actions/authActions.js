import 'whatwg-fetch'
import * as actionTypes from './actionTypes'

export const login = ({ username }) => {
  return {
    authenticated: true,
    type: actionTypes.AUTH_SUCCESS,
    user: username,
  }
}

export const logout = () => {
  return {
    authenticated: false,
    type: actionTypes.LOGOUT_SUCCESS,
    user: null,
  }
}
