import React, { Component } from 'react'
import { BlogManager } from '../../../components/'

class List extends Component {
  render() {
    return <BlogManager header="List posts" isAdmin type="list" />
  }
}

export default List
