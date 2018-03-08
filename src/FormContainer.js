/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import CreateTeam from './CreateTeam';
import axios from 'axios';

export default class FormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
    this.onNameChange = this.onNameChange.bind(this)
    this.submitButton = this.submitButton.bind(this)

  }

  onNameChange(ev) {
    const name = ev.target.value
    this.setState({ name })
  }

  submitButton(ev) {
    ev.preventDefault()
    const { name } = this.state
    this.props.onCreateTeam({ name })
  }

  render() {
    const { onNameChange, submitButton } = this
    const { name } = this.state
    const { teams } = this.props
    return (
      <CreateTeam onNameChange={ onNameChange } submitButton={ submitButton } name={ name }/>
    )
  }
}
