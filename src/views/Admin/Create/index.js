import React, { Component } from 'react'
import { BlogManager } from '../../../components/'

class Create extends Component {
  render() {
    return <BlogManager header="Create post" isAdmin type="create" />
  }
}

export default Create
