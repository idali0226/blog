import * as types from '../actionTypes'
import initialState from './initialState'

export default function blogRedurcer(state = initialState.blogs, action) {
  switch (action.type) {
    case types.LOAD_POSTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        posts: action.payload,
      }

    case types.LOAD_POSTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      }

    case types.LOAD_PUBLISH_POSTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      }

    case types.LOAD_PUBLISH_POSTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        publishedPosts: action.payload,
      }

    case types.LOAD_POSTS_BY_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
      }

    case types.LOAD_POSTS_BY_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        posts: action.payload,
      }

    case types.CREATE_POST_SUCCESS:
      return {
        ...state,
        isSubmiting: false,
        post: {},
      }

    case types.UPDATE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts,
      }

    default:
      return state
  }
}
