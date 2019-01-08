import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import BaseForm from './BaseForm'
import { blogManager } from '../../higherOrderComponents'
import { getPostBySlug } from '../../selectors'

const mapStateToProps = (state, ownProps) => {
  const { isAdmin, match: { params: { slug } } } = ownProps
  return {
    post: getPostBySlug(state, isAdmin, slug),
  }
}

const propTypes = {
  isAdmin: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
  post: PropTypes.shape({
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
}

const defaultProps = {
  isAdmin: true,
  post: {},
}

class Edit extends Component {
  render() {
    const { onSave: handleSave, post } = this.props

    const initialValues = {
      initialValues: post,
    }

    return (
      <BaseForm
        form="editPost"
        onSave={handleSave}
        post={post}
        {...initialValues}
      />
    )
  }
}

Edit.propTypes = propTypes
Edit.defaultProps = defaultProps
export default compose(blogManager, withRouter, connect(mapStateToProps))(Edit)
