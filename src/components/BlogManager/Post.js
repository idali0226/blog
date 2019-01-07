import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Grid } from 'semantic-ui-react'

import { getMaxPostId, getMinPostId } from '../../selectors'
import BlogItem from '../BlogItem'

const mapStateToProps = (state, ownProps) => {
  const { isAdmin } = ownProps
  return {
    maxId: getMaxPostId(isAdmin, state),
    minId: getMinPostId(isAdmin, state),
    post: state.blogs.post || {},
  }
}

const propTypes = {
  history: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
  maxId: PropTypes.number.isRequired,
  minId: PropTypes.number.isRequired,
  onClickNextPost: PropTypes.func.isRequired,
  onClickPreviousPost: PropTypes.func.isRequired,
  post: PropTypes.shape({
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
}

const defaultProps = {
  isAdmin: false,
}

class Post extends Component {
  constructor(props) {
    super(props)

    this.handleEdit = this.handleEdit.bind(this)
  }

  handleEdit() {
    const { history, post } = this.props
    history.push(`/admin/list/${post.id}/edit`)
  }

  render() {
    const {
      isAdmin,
      onClickNextPost,
      onClickPreviousPost,
      maxId,
      minId,
      post,
    } = this.props
    return (
      <Grid>
        <Grid.Column width={16}>
          <BlogItem
            onEdit={isAdmin ? this.handleEdit : undefined}
            post={post}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Button
            content="Previous"
            disabled={post.id === maxId}
            icon="left arrow"
            labelPosition="left"
            onClick={onClickPreviousPost}
          />
          <Button
            content="Next"
            disabled={post.id === minId}
            icon="right arrow"
            labelPosition="right"
            onClick={onClickNextPost}
          />
        </Grid.Column>
      </Grid>
    )
  }
}

Post.propTypes = propTypes
Post.defaultProps = defaultProps
export default connect(mapStateToProps)(Post)
