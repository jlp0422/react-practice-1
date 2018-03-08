/* eslint-disable */
import React from 'react';
import axios from 'axios';

export default class CreateTeam extends React.Component {
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
    const teams = this.props.teams
    // teams.forEach(team => (
    //   team.name === name ? (
    //     console.log('match')
    //   ) : (
    //     console.log('no match')
    //   )
    // ))
    this.setState({ name })
  }

  submitButton(ev) {
    ev.preventDefault()
    const { name } = this.state
    this.props.onCreateTeam({ name })
  }

  render() {
    const hash = location.hash
    const { onNameChange, submitButton } = this
    const { name } = this.state
    return (
      <_CreateTeam submitButton={submitButton} onNameChange={onNameChange} name={name}/>
    )
  }
}

const _CreateTeam = ({ submitButton, onNameChange, name }) => {
  return (
    <div>
      <h1>Add a new team</h1>
      <form onSubmit={submitButton}>
        <label>Team name</label>
        <input value={name} onChange={onNameChange} />
        <button disabled={name.length === 0}>Create</button>
      </form>
    </div>
  )
}
