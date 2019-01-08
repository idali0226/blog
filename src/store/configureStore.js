import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers'
import browserHistory from '../history'

const historyMiddleware = routerMiddleware(browserHistory)

const configureStore = initialState => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      createLogger({
        collapsed: true,
      }),
      historyMiddleware,
      thunk
    )
  )
}

export default configureStore
