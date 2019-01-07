import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers'
import browserHistory from '../history'

const history = browserHistory()

const historyMiddleware = routerMiddleware(history)

const configureStore = initialState => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(logger, historyMiddleware, thunk)
  )
}

export default configureStore
