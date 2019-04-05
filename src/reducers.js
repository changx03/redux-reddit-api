import { combineReducers } from 'redux'
import {
  INVALIDATE_SUBREDDIT,
  RECEIVE_POSTS,
  REQUEST_POSTS,
  SELECT_SUBREDDIT
} from './actions'

const initStateSubreddit = 'reactjs'

function selectedSubreddit(state = initStateSubreddit, action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
}

const initStatePost = {
  isFetching: false,
  didInvalidate: false,
  items: []
}
Object.freeze(initStatePost)

function posts(state = initStatePost, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return { ...state, didInvalidate: true }
    case RECEIVE_POSTS:
      return { ...state, isFetching: true, didInvalidate: false }
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

function postsBySubreddit(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {...state, [action.subreddit]: posts(state[action.subreddit], action)}
    default:
      return state
  }
}

const reducer = combineReducers({
  selectedSubreddit,
  postsBySubreddit
})

export default reducer
