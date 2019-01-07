import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseForm from './BaseForm'

const propTypes = {
  onSave: PropTypes.func.isRequired,
}

class Create extends Component {
  render() {
    const { onSave: handleSave } = this.props
    const initialValues = {
      initialValues: {},
    }

    return <BaseForm form="createPost" onSave={handleSave} {...initialValues} />
  }
}

Create.propTypes = propTypes
export default Create
