import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'

import BlogList from '../BlogList'
import { createHandleSearch } from '../../higherOrderComponents'

const mapStateToProps = (state, ownProps) => {
  const { isAdmin } = ownProps
  const posts = (isAdmin ? state.blogs.posts : state.blogs.publishedPosts) || []

  return {
    isFetching: state.blogs.isFetching,
    posts,
  }
}

const propTypes = {
  isAdmin: PropTypes.bool,
  isFetching: PropTypes.bool,
  posts: PropTypes.array,
}

const defaultProps = {
  isAdmin: false,
  isFetching: true,
  posts: undefined,
}

class List extends Component {
  render() {
    const { isAdmin, posts, isFetching } = this.props

    if (isFetching) {
      return (
        <div>
          <p>loading.....</p>
        </div>
      )
    }
    return <BlogList isAdmin={isAdmin} posts={posts} />
  }
}

List.propTypes = propTypes
List.defaultProps = defaultProps

export default compose(createHandleSearch, connect(mapStateToProps))(List)
