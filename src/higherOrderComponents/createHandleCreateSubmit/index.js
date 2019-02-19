import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getFormValues } from 'redux-form'
import { withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'

import { createPost } from '../../actionCreators/blogActions'

import Template from '../../components/Template'

const mapStateToProps = (state, { formName }) => {
  return {
    user: state.auth.user,
    values: getFormValues(formName)(state),
  }
}

const mapDispatchToProps = {
  createPost,
  push,
}

const propTypes = {
  authenticated: PropTypes.bool,
  createPost: PropTypes.func.isRequired,
  header: PropTypes.string,
  push: PropTypes.func.isRequired,
  user: PropTypes.string,
  values: PropTypes.object,
}

const defaultProps = {
  authenticated: true,
  header: undefined,
  user: undefined,
  values: undefined,
}

const createHandleCreateSubmit = ComposedComponent => {
  class CreateSubmitHandler extends Component {
    constructor(props) {
      super(props)

      this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
      event.preventDefault()
      const { user, values } = this.props

      this.props.createPost(values, user)
      this.props.push('/admin')
    }

    render() {
      const { header, ...rest } = this.props
      return (
        <Template header={header} {...rest}>
          <ComposedComponent {...this.props} onSubmit={this.handleSubmit} />
        </Template>
      )
    }
  }

  CreateSubmitHandler.propTypes = propTypes
  CreateSubmitHandler.defaultProps = defaultProps

  return compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(
    CreateSubmitHandler
  )
}
export default createHandleCreateSubmit
