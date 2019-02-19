import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'

import {
  loadPostsByUser,
  loadPublishedPosts,
} from '../../actionCreators/blogActions'

import Template from '../../components/Template'

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated || false,
    user: state.auth.user,
  }
}

const mapDispatchToProps = {
  loadPostsByUser,
  loadPublishedPosts,
  push,
}

const propTypes = {
  authenticated: PropTypes.bool.isRequired,
  header: PropTypes.string,
  loadPostsByUser: PropTypes.func.isRequired,
  loadPublishedPosts: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  user: PropTypes.string,
  values: PropTypes.object,
}

const defaultProps = {
  header: undefined,
  user: undefined,
  values: undefined,
}

const createHandleSearch = ComposedComponent => {
  class SearchHandler extends Component {
    componentDidMount() {
      const { authenticated, user } = this.props
      if (authenticated) {
        this.props.loadPostsByUser(user)
      }
      this.props.loadPublishedPosts()
    }

    render() {
      const { header, ...rest } = this.props
      return (
        <Template header={header} {...rest}>
          <ComposedComponent {...this.props} />
        </Template>
      )
    }
  }

  SearchHandler.propTypes = propTypes
  SearchHandler.defaultProps = defaultProps

  return compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(
    SearchHandler
  )
}
export default createHandleSearch
