import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'

const propTypes = {
  input: PropTypes.object,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  style: PropTypes.object,
}

const defaultProps = {
  input: undefined,
  placeholder: undefined,
  rows: 2,
  style: undefined,
}

const TextArea = ({ input, placeholder, rows, style }) => {
  return (
    <Form.TextArea
      placeholder={placeholder}
      rows={rows}
      style={style}
      {...input}
    />
  )
}

TextArea.propTypes = propTypes
TextArea.defaultProps = defaultProps

export default TextArea
