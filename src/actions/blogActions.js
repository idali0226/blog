import 'whatwg-fetch'
import * as actionTypes from './actionTypes'
import { API } from '../constants/appConstants'

export const loadPosts = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.LOAD_POSTS_REQUEST,
    })
    return fetch(`${API}/blogs`).then(
      response => {
        return response.json().then(res => {
          dispatch({
            payload: res,
            type: actionTypes.LOAD_POSTS_SUCCESS,
          })
          return res
        })
      },
      error => {
        dispatch({
          error: true,
          payload: error,
          type: actionTypes.LOAD_POSTS_FAILURE,
        })
        return error
      }
    )
  }
}

const buildQuery = queryParms => {
  return Object.keys(queryParms).reduce((query, key) => {
    if (queryParms[key]) {
      const value = `${key}=${queryParms[key]}`
      if (query) {
        return `${query}&${value}`
      }
      return value
    }
    return query
  }, '')
}

export const loadPostsByUser = user => {
  const queryParms = {
    author: user,
  }

  const query = buildQuery(queryParms)
  return dispatch => {
    dispatch({
      type: actionTypes.LOAD_POSTS_BY_USER_REQUEST,
    })
    return fetch(`${API}/blogs/search?${query}`).then(
      response => {
        return response.json().then(res => {
          dispatch({
            payload: res,
            type: actionTypes.LOAD_POSTS_BY_USER_SUCCESS,
          })
          return res
        })
      },
      error => {
        dispatch({
          error: true,
          payload: error,
          type: actionTypes.LOAD_POSTS_BY_USER_FAILURE,
        })
        return error
      }
    )
  }
}

export const loadPublishedPosts = () => {
  const queryParms = {
    isPublish: true,
  }

  const query = buildQuery(queryParms)
  return dispatch => {
    dispatch({
      type: actionTypes.LOAD_PUBLISH_POSTS_REQUEST,
    })
    return fetch(`${API}/blogs/search?${query}`).then(
      response => {
        return response.json().then(res => {
          dispatch({
            payload: res,
            type: actionTypes.LOAD_PUBLISH_POSTS_SUCCESS,
          })
          return res
        })
      },
      error => {
        dispatch({
          error: true,
          payload: error,
          type: actionTypes.LOAD_PUBLISH_POSTS_FAILURE,
        })
        return error
      }
    )
  }
}

export const createPost = (
  { title, description, content, isPublish },
  user
) => {
  const slug = title.replace(/\s/g, '-')

  const newPost = {
    author: user,
    content,
    description,
    isPublish,
    slug,
    title,
  }

  return dispatch => {
    dispatch({
      type: actionTypes.CREATE_POST_REQUEST,
    })
    return fetch(`${API}/blogs`, {
      body: JSON.stringify(newPost),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then(
      response => {
        return response.json().then(res => {
          dispatch({
            isPublish,
            payload: res,
            type: actionTypes.CREATE_POST_SUCCESS,
          })
          return res
        })
      },
      error => {
        dispatch({
          error: true,
          payload: error,
          type: actionTypes.CREATE_POST_FAILURE,
        })
        return error
      }
    )
  }
}

export const updatePost = ({
  id,
  author,
  title,
  description,
  content,
  isPublish,
}) => {
  const slug = title.replace(/\s/g, '-')

  const editePost = {
    author,
    content,
    description,
    id,
    isPublish,
    slug,
    title,
  }
  const options = {
    body: JSON.stringify(editePost),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  }

  return dispatch => {
    dispatch({
      type: actionTypes.UPDATE_POST_REQUEST,
    })
    return fetch(`${API}/blogs/${id}`, options).then(
      response => {
        return response.json().then(res => {
          dispatch({
            payload: res,
            type: actionTypes.UPDATE_POST_SUCCESS,
          })
          return res
        })
      },
      error => {
        dispatch({
          error: true,
          payload: error,
          type: actionTypes.UPDATE_POST_FAILURE,
        })
        return error
      }
    )
  }
}

export const togglePost = (id, isAdmin) => {
  if (isAdmin) {
    return {
      id,
      type: actionTypes.TOGGLE_POST,
    }
  }
  return {
    id,
    type: actionTypes.TOGGLE_PUBLISH_POST,
  }
}
