import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function blogRedurcer(state = initialState.blogs, action) {
  switch (action.type) {
    case types.LOAD_POSTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        posts: action.payload,
      })

    case types.LOAD_POSTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })

    case types.LOAD_PUBLISH_POSTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })

    case types.LOAD_PUBLISH_POSTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        publishedPosts: action.payload,
      })

    case types.LOAD_POSTS_BY_USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })

    case types.LOAD_POSTS_BY_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        posts: action.payload,
      })

    case types.TOGGLE_POST:
      return Object.assign({}, state, {
        post: state.posts.find(p => {
          return p.id === action.id
        }),
      })

    case types.TOGGLE_PUBLISH_POST:
      return Object.assign({}, state, {
        post: state.publishedPosts.find(p => {
          return p.id === action.id
        }),
      })

    case types.CREATE_POST_SUCCESS:
      return Object.assign({}, state, {
        isSubmiting: false,
        post: {},
      })

    case types.UPDATE_POST_SUCCESS:
      return Object.assign({}, state, {
        posts: state.posts,
      })

    default:
      return state
  }
}
