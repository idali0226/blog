import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'
import auth from './authReducer'
import blogs from './blogReducer'

const rootReducer = combineReducers({
  auth,
  blogs,
  form: formReducer,
  routing: routerReducer,
})

export default rootReducer
