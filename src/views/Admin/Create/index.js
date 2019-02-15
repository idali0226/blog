import React, { Component } from 'react'
import { Create } from '../../../components/'

class CreateView extends Component {
  render() {
    return <Create formName="createPost" header="Create post" isAdmin />
  }
}

export default CreateView
