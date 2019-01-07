import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import BaseForm from './BaseForm'

const mapStateToProps = state => {
  return {
    post: state.blogs.post,
  }
}

const propTypes = {
  onSave: PropTypes.func.isRequired,
  post: PropTypes.shape({
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
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
export default connect(mapStateToProps)(Edit)
