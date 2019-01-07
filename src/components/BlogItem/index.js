import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

const propTypes = {
  onClick: PropTypes.func,
  onEdit: PropTypes.func,
  post: PropTypes.shape({
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
}

const defaultProps = {
  onClick: undefined,
  onEdit: undefined,
}

class BlogItem extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const { onClick } = this.props
    if (onClick) {
      onClick(this.props.post)
    }
  }

  render() {
    const { onEdit: handleEdit, post } = this.props
    return (
      <Segment
        color={post.isPublish ? 'green' : 'red'}
        onClick={this.handleClick}
        raised
      >
        <Grid>
          <Grid.Column width={12}>
            <Header as="h1">{post.title}</Header>
          </Grid.Column>
          <Grid.Column width={4}>
            {handleEdit ? (
              <Button content="Edit" onClick={handleEdit} primary />
            ) : null}
          </Grid.Column>
          <Grid.Column width={16}>
            <Header as="h3">{post.author}</Header>
          </Grid.Column>
          <Grid.Column width={16}>
            <Header as="h4">Created at: {post.createdAt}</Header>
          </Grid.Column>
          <Grid.Column width={16}>
            <Header as="h3">{post.isPublish ? 'Publish' : 'Private'}</Header>
          </Grid.Column>
          <Grid.Column width={16}>{post.content}</Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

BlogItem.propTypes = propTypes
BlogItem.defaultProps = defaultProps
export default BlogItem
