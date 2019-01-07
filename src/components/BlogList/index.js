import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BlogItem from '../BlogItem'

const propTypes = {
  onClick: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
}

class BlogList extends Component {
  render() {
    const { onClick: handleClick, posts } = this.props

    return (
      <React.Fragment>
        {posts.map(post => {
          return <BlogItem key={post.id} onClick={handleClick} post={post} />
        })}
      </React.Fragment>
    )
  }
}

BlogList.propTypes = propTypes
export default BlogList
