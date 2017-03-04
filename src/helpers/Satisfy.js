import React, {Component} from 'react';

export default class Satisfy extends Component {
  componentWillMount() {
    if (typeof this.props.condition === 'undefined' ||
      !this.props.condition) {
        this.fire(this.props)
    }
  }
  shouldComponentUpdate({ condition, children, ...rest }) {
    if (typeof this.props.condition === 'undefined') {
      return Object
        .keys(rest)
        .some((prop) => this.props[prop] !== rest[prop])
    }
    return !condition
  }
  componentWillUpdate(nextProps) {
    this.fire(nextProps)
  }
  fire = ({ action, condition, children, ...rest }) => {
    action(rest)
  }
  render = () => null
}
