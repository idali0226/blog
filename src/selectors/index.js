import { createSelector } from 'reselect'

const getPosts = (isAdmin, state) => {
  if (isAdmin) {
    return state.blogs.posts || []
  }
  return state.blogs.publishedPosts || []
}

const getCurrentPost = (isAdmin, state) => {
  return state.blogs.post || {}
}

export const getTotalNumberOfPost = createSelector([getPosts], posts => {
  return posts.length
})

export const getMaxPostId = createSelector([getPosts], posts => {
  return Math.max(...posts.map(p => p.id), 1)
})

export const getMinPostId = createSelector(
  [getPosts, getMaxPostId],
  (posts, maxId) => {
    return Math.min(...posts.map(p => p.id), maxId)
  }
)

export const getCurrentPostIndex = createSelector(
  [getPosts, getCurrentPost],
  (posts, post) => {
    return posts.findIndex(p => p.id === post.id)
  }
)

export const getPreviousPost = createSelector(
  [getPosts, getCurrentPostIndex],
  (posts, index) => {
    return posts[index - 1] || {}
  }
)

export const getNextPost = createSelector(
  [getPosts, getCurrentPostIndex],
  (posts, index) => {
    return posts[index + 1] || {}
  }
)
