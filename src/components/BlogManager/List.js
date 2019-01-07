import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import BlogList from '../BlogList'

const mapStateToProps = (state, ownProps) => {
  const { isAdmin } = ownProps
  const posts = (isAdmin ? state.blogs.posts : state.blogs.publishedPosts) || []

  return {
    isFetching: state.blogs.isFetching,
    posts,
  }
}

const propTypes = {
  isFetching: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  posts: PropTypes.array,
}

const defaultProps = {
  isFetching: true,
  posts: undefined,
}

class List extends Component {
  render() {
    const { onClick: handleClick, posts, isFetching } = this.props

    if (isFetching) {
      return (
        <div>
          <p>loading.....</p>
        </div>
      )
    }

    return <BlogList onClick={handleClick} posts={posts} />
  }
}

List.propTypes = propTypes
List.defaultProps = defaultProps
export default connect(mapStateToProps)(List)
