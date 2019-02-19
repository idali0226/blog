import React, { Component } from 'react'

const createPropsFilter = (hocInput = {}) => ComposedComponent => {
  const { include, exclude } = hocInput

  class PropsFilter extends Component {
    render() {
      const { ...props } = this.props
      const keys = Object.keys(props)

      const filteredProps = {}

      keys.forEach(key => {
        if (include.includes(key)) {
          filteredProps[key] = props[key] && props[key]
        }

        if (exclude.includes(key)) {
          delete filteredProps[key]
        }
      })
      return <ComposedComponent {...filteredProps} />
    }
  }
  return PropsFilter
}
export default createPropsFilter
