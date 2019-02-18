import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import BaseForm from './BaseForm'
import createPropsFilter, {
  createHandleEditSubmit,
} from '../../higherOrderComponents'
import { getPostBySlug } from '../../selectors'

const mapStateToProps = (state, ownProps) => {
  const { match: { params: { slug } } } = ownProps
  return {
    post: getPostBySlug(state, true, slug),
  }
}

const propTypes = {
  formName: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  post: PropTypes.shape({
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
}

const defaultProps = {
  post: {},
}

class Edit extends Component {
  render() {
    const { formName, onSubmit: handleSumbit, post } = this.props

    const initialValues = {
      initialValues: post,
    }
    return <BaseForm form={formName} onSave={handleSumbit} {...initialValues} />
  }
}

Edit.propTypes = propTypes
Edit.defaultProps = defaultProps
export default compose(
  createPropsFilter({
    exclude: ['header'],
    include: ['formName', 'header'],
  }),
  createHandleEditSubmit,
  withRouter,
  connect(mapStateToProps)
)(Edit)
