import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'

import Template from '../../components/Template'
import {
  createPost,
  loadPosts,
  loadPostsByUser,
  loadPublishedPosts,
  updatePost,
} from '../../actionCreators/blogActions'

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated || false,
    user: state.auth.user,
  }
}

const mapDispatchToProps = {
  createPost,
  loadPosts,
  loadPostsByUser,
  loadPublishedPosts,
  push,
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
  push: PropTypes.func.isRequired,
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

export default function blogManagerHOC(WrappedComponent) {
  class BlogManager extends Component {
    constructor(props) {
      super(props)

      this.handleSave = this.handleSave.bind(this)
    }

    componentDidMount() {
      const { authenticated, user } = this.props
      if (authenticated) {
        this.props.loadPostsByUser(user)
      }
      this.props.loadPublishedPosts()
    }

    handleSave(value) {
      const { user } = this.props

      if (value.id) {
        this.props.updatePost(value)
      } else {
        this.props.createPost(value, user)
      }

      this.props.push('/admin')
    }

    render() {
      const { header, ...rest } = this.props
      return (
        <Template header={header} {...rest}>
          <WrappedComponent {...rest} onSave={this.handleSave} />
        </Template>
      )
    }
  }

  BlogManager.propTypes = propTypes
  BlogManager.defaultProps = defaultProps
  return withRouter(connect(mapStateToProps, mapDispatchToProps)(BlogManager))
}
