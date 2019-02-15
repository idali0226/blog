import React, { Component } from 'react'

import { Edit } from '../../../components/'

class EditView extends Component {
  render() {
    return <Edit formName="editPost" header="Edit post" isAdmin />
  }
}

export default EditView
