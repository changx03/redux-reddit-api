import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import reduxThunk from 'redux-thunk'
import reducer from './reducers'

const reduxLogger = createLogger()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore(preloadedState) {
  return createStore(
    reducer,
    preloadedState,
    composeEnhancers(applyMiddleware(reduxThunk, reduxLogger))
  )
}
