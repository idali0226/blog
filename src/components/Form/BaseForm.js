import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import { Button, Grid } from 'semantic-ui-react'

import { CheckboxInput, TextArea, TextInput } from './Fields'

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
}

const required = value => (value ? undefined : 'Required')

class BaseForm extends Component {
  render() {
    const {
      handleSubmit,
      onSave: handleSave,
      pristine,
      reset,
      submitting,
      valid,
    } = this.props
    return (
      <form onSubmit={handleSubmit(val => handleSave(val))}>
        <Grid
          container
          style={{
            marginBottom: '8.5em',
            marginTop: '7em',
            paddingLeft: '10em',
            paddingRight: '10em',
          }}
        >
          <Grid.Column width={16}>
            <Field
              component={TextInput}
              fluid
              label="Title"
              name="title"
              placeholder="Title"
              type="text"
              validate={[required]}
            />
          </Grid.Column>
          <Grid.Column width={16}>
            <Field
              component={TextArea}
              label="Content"
              name="content"
              placeholder="Content"
              rows="3"
              style={{ width: '100%' }}
              type="text"
            />
          </Grid.Column>
          <Grid.Column width={16}>
            <Field component={CheckboxInput} label="Publish" name="isPublish" />
          </Grid.Column>
          <Grid.Column style={{ textAlign: 'right' }} width={8}>
            <Button
              disabled={!valid || pristine || submitting}
              positive
              type="submit"
            >
              Submit
            </Button>
          </Grid.Column>
          <Grid.Column style={{ textAlign: 'left' }} width={8}>
            <Button onClick={reset} type="button">
              Reset
            </Button>
          </Grid.Column>
        </Grid>
      </form>
    )
  }
}

BaseForm.propTypes = propTypes

export default reduxForm({
  // form: 'PostForm',
})(BaseForm)
