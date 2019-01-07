import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case types.AUTH_SUCCESS:
      return Object.assign({}, state, {
        authenticated: true,
        user: action.user,
      })

    case types.LOGOUT_SUCCESS: {
      return Object.assign({}, state, {
        authenticated: false,
        user: null,
      })
    }

    default:
      return state
  }
}
