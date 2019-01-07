import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Input, Label } from 'semantic-ui-react'

const propTypes = {
  autoComplete: PropTypes.string,
  disabled: PropTypes.bool,
  fluid: PropTypes.bool,
  icon: PropTypes.string,
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  placeholder: PropTypes.string,
  style: PropTypes.object,
}

const defaultProps = {
  autoComplete: undefined,
  disabled: false,
  fluid: false,
  icon: undefined,
  label: undefined,
  placeholder: undefined,
  style: undefined,
}

class TextInput extends PureComponent {
  render() {
    const {
      autoComplete,
      disabled,
      fluid,
      icon,
      input,
      label,
      meta: { touched, error },
      placeholder,
      style,
      ...rest
    } = this.props
    return (
      <div>
        <Input
          autoComplete={autoComplete}
          disabled={disabled}
          fluid
          icon={icon}
          label={label}
          placeholder={placeholder}
          style={style}
          {...input}
          {...rest}
        />
        {touched && error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    )
  }
}

TextInput.propTypes = propTypes
TextInput.defaultProps = defaultProps
export default TextInput
