import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Header } from 'semantic-ui-react'

import TopMenu from '../TopMenu'

const propTypes = {
  children: PropTypes.object.isRequired,
  header: PropTypes.string,
}

const defaultProps = {
  header: undefined,
}

class Template extends Component {
  render() {
    const { children, header, ...rest } = this.props
    return (
      <Grid container>
        <Grid.Column className="container-fluid">
          <TopMenu {...rest} />
          <Grid.Column style={{ textAlign: 'center' }}>
            <Header as="h1">{header}</Header>
          </Grid.Column>
          {children}
        </Grid.Column>
      </Grid>
    )
  }
}

Template.propTypes = propTypes
Template.defaultProps = defaultProps

export default Template
