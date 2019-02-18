import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import BaseForm from './BaseForm'
import createPropsFilter, {
  createHandleCreateSubmit,
} from '../../higherOrderComponents'

const propTypes = {
  formName: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

class Create extends Component {
  render() {
    const { formName, onSubmit: handleSumbit } = this.props
    const initialValues = {
      initialValues: {},
    }

    return <BaseForm form={formName} onSave={handleSumbit} {...initialValues} />
  }
}

Create.propTypes = propTypes

export default compose(
  createPropsFilter({
    include: ['formName', 'header'],
  }),
  createHandleCreateSubmit
)(Create)
