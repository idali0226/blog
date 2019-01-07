import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import List from './List'
import Post from './Post'
import { Create, Edit } from '../Form'
import Templete from '../Templete'
import {
  createPost,
  loadPosts,
  loadPostsByUser,
  loadPublishedPosts,
  togglePost,
  updatePost,
} from '../../actions/blogActions'

import { getNextPost, getPreviousPost } from '../../selectors'

const mapStateToProps = (state, ownProps) => {
  const { isAdmin } = ownProps
  return {
    authenticated: state.auth.authenticated || false,
    nextPost: getNextPost(isAdmin, state),
    previousPost: getPreviousPost(isAdmin, state),
    user: state.auth.user,
  }
}

const mapDispatchToProps = {
  createPost,
  loadPosts,
  loadPostsByUser,
  loadPublishedPosts,
  togglePost,
  updatePost,
}

const propTypes = {
  authenticated: PropTypes.bool.isRequired,
  createPost: PropTypes.func.isRequired,
  header: PropTypes.string,
  history: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
  loadPosts: PropTypes.func.isRequired,
  loadPostsByUser: PropTypes.func.isRequired,
  loadPublishedPosts: PropTypes.func.isRequired,
  nextPost: PropTypes.shape({
    author: PropTypes.string,
    content: PropTypes.string,
    id: PropTypes.number,
    slug: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  previousPost: PropTypes.shape({
    author: PropTypes.string,
    content: PropTypes.string,
    id: PropTypes.number,
    slug: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  togglePost: PropTypes.func.isRequired,
  type: PropTypes.string,
  updatePost: PropTypes.func.isRequired,
  user: PropTypes.string,
}

const defaultProps = {
  header: undefined,
  isAdmin: false,
  type: undefined,
  user: undefined,
}

class BlogManager extends Component {
  constructor(props) {
    super(props)

    this.handleSave = this.handleSave.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
    this.handlePreviousPost = this.handlePreviousPost.bind(this)
    this.handleNextPost = this.handleNextPost.bind(this)
  }

  componentDidMount() {
    const { authenticated, user } = this.props
    if (authenticated) {
      this.props.loadPostsByUser(user)
    }
    this.props.loadPublishedPosts()
  }

  handlePreviousPost() {
    const { isAdmin, previousPost: { id, slug } } = this.props

    this.props.togglePost(id, isAdmin)
    const url = isAdmin ? `/admin/list/${slug}` : `/list/${slug}`
    this.props.history.push(url)
  }

  handleNextPost() {
    const { isAdmin, nextPost: { id, slug } } = this.props

    this.props.togglePost(id, isAdmin)
    const url = isAdmin ? `/admin/list/${slug}` : `/list/${slug}`
    this.props.history.push(url)
  }

  handleOnClick({ id, slug }) {
    const { isAdmin } = this.props

    const url = isAdmin ? `/admin/list/${slug}` : `/list/${slug}`
    this.props.togglePost(id, isAdmin)

    this.props.history.push(url)
  }

  handleSave(value) {
    const { user } = this.props

    if (value.id) {
      this.props.updatePost(value)
    } else {
      this.props.createPost(value, user)
    }

    this.props.history.push('/admin')
  }

  renderComponent = () => {
    const { type, ...rest } = this.props
    switch (type) {
      case 'list': {
        return <List onClick={this.handleOnClick} {...rest} />
      }
      case 'post': {
        return (
          <Post
            onClickNextPost={this.handleNextPost}
            onClickPreviousPost={this.handlePreviousPost}
            {...rest}
          />
        )
      }
      case 'create': {
        return <Create onSave={this.handleSave} />
      }
      case 'edit': {
        return <Edit onSave={this.handleSave} />
      }

      default: {
        throw new Error(`Unknown type ${type}`)
      }
    }
  }

  render() {
    const { header, ...rest } = this.props

    return (
      <Templete header={header} {...rest}>
        {this.renderComponent()}
      </Templete>
    )
  }
}

BlogManager.propTypes = propTypes
BlogManager.defaultProps = defaultProps
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BlogManager)
)
