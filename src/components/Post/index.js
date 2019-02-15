import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Button, Grid } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'

import { createHandleSearch } from '../../higherOrderComponents'
import {
  getMaxPostId,
  getMinPostId,
  getNextPost,
  getPreviousPost,
  getPostBySlug,
} from '../../selectors'
import BlogItem from '../BlogItem'

const mapStateToProps = (state, ownProps) => {
  const { isAdmin, match: { params: { slug } } } = ownProps
  return {
    maxId: getMaxPostId(state, isAdmin),
    minId: getMinPostId(state, isAdmin),
    nextPost: getNextPost(state, isAdmin, slug),
    post: getPostBySlug(state, isAdmin, slug),
    previousPost: getPreviousPost(state, isAdmin, slug),
  }
}

const propTypes = {
  isAdmin: PropTypes.bool,
  maxId: PropTypes.number.isRequired,
  minId: PropTypes.number.isRequired,
  nextPost: PropTypes.shape({
    author: PropTypes.string,
    content: PropTypes.string,
    id: PropTypes.number,
    slug: PropTypes.string,
    title: PropTypes.string,
  }),
  post: PropTypes.shape({
    author: PropTypes.string,
    content: PropTypes.string,
    id: PropTypes.number,
    title: PropTypes.string,
  }),
  previousPost: PropTypes.shape({
    author: PropTypes.string,
    content: PropTypes.string,
    id: PropTypes.number,
    slug: PropTypes.string,
    title: PropTypes.string,
  }),
}

const defaultProps = {
  isAdmin: false,
  nextPost: {},
  post: {},
  previousPost: {},
}

class Post extends Component {
  render() {
    const { isAdmin, maxId, minId, nextPost, post, previousPost } = this.props
    return (
      <Grid>
        <Grid.Column width={16}>
          <BlogItem enableEdit={isAdmin} isAdmin={isAdmin} post={post} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Button
            as={Link}
            content="Previous"
            disabled={post.id === maxId}
            icon="left arrow"
            labelPosition="left"
            to={
              isAdmin
                ? `/admin/list/${previousPost.slug}`
                : `/list/${previousPost.slug}`
            }
          />
          <Button
            as={Link}
            content="Next"
            disabled={post.id === minId}
            icon="right arrow"
            labelPosition="right"
            to={
              isAdmin
                ? `/admin/list/${nextPost.slug}`
                : `/list/${nextPost.slug}`
            }
          />
        </Grid.Column>
      </Grid>
    )
  }
}

Post.propTypes = propTypes
Post.defaultProps = defaultProps
export default compose(
  createHandleSearch,
  withRouter,
  connect(mapStateToProps)
)(Post)
