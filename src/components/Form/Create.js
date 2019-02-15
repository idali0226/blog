import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseForm from './BaseForm'
import { createHandleCreateSubmit } from '../../higherOrderComponents'

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
export default createHandleCreateSubmit(Create)
