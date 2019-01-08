import { createSelector } from 'reselect'

const getPosts = (state, isAdmin) => {
  if (isAdmin) {
    return state.blogs.posts || []
  }
  return state.blogs.publishedPosts || []
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

export const getNextPost = (state, isAdmin, slug) => {
  const posts = getPosts(state, isAdmin)
  const index = posts.findIndex(p => p.slug === slug)
  return posts[index + 1]
}

export const getPreviousPost = (state, isAdmin, slug) => {
  const posts = getPosts(state, isAdmin)
  const index = posts.findIndex(p => p.slug === slug)
  return posts[index - 1]
}

export const getPostBySlug = (state, isAdmin, slug) => {
  const posts = getPosts(state, isAdmin)
  const index = posts.findIndex(p => p.slug === slug)
  return posts[index]
}
