import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

const propTypes = {
  enableEdit: PropTypes.bool,
  post: PropTypes.shape({
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
}

const defaultProps = {
  enableEdit: false,
}

class BlogItem extends Component {
  render() {
    const { enableEdit, post } = this.props
    return (
      <Segment color={post.isPublish ? 'green' : 'red'} raised>
        <Grid>
          <Grid.Column width={12}>
            <Header as="h1">{post.title}</Header>
          </Grid.Column>
          <Grid.Column width={4}>
            {enableEdit ? (
              <Button
                as={Link}
                content="Edit"
                primary
                to={`/admin/list/${post.slug}/edit`}
              />
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
