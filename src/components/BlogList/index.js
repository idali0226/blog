import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import BlogItem from '../BlogItem'

const propTypes = {
  isAdmin: PropTypes.bool,
  posts: PropTypes.array.isRequired,
}

const defaultProps = {
  isAdmin: false,
}

class BlogList extends Component {
  render() {
    const { isAdmin, posts } = this.props

    return (
      <React.Fragment>
        {posts.map(post => {
          const url = isAdmin
            ? `/admin/list/${post.slug}`
            : `/list/${post.slug}`
          return (
            <Link key={post.id} to={url}>
              <BlogItem isAdmin={isAdmin} key={post.id} post={post} />
            </Link>
          )
        })}
      </React.Fragment>
    )
  }
}

BlogList.propTypes = propTypes
BlogList.defaultProps = defaultProps
export default BlogList
