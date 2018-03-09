/* eslint-disable */
import React from 'react';
import axios from 'axios';

export default class CreatePlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      teamId: ''
    }
    this.onNameChange = this.onNameChange.bind(this)
    this.onTeamChange = this.onTeamChange.bind(this)
    this.submitButton = this.submitButton.bind(this)
  }

  onNameChange(ev) {
    const name = ev.target.value
    this.setState({ name })
  }

  onTeamChange(ev) {
    const teamId = ev.target.value
    this.setState({ teamId})
  }

  submitButton(ev) {
    ev.preventDefault()
    const { name, teamId } = this.state
    this.props.onCreatePlayer({ name, teamId })
  }

  render() {
    const hash = location.hash
    const { onTeamChange, onNameChange, submitButton } = this
    const { name, teamId } = this.state
    const { teams } = this.props
    return (
      <_CreatePlayer submitButton={submitButton} onTeamChange={onTeamChange} onNameChange={onNameChange} name={name} teamId={teamId} teams={ teams }/>
    )
  }
}

const _CreatePlayer = ({ submitButton, onTeamChange, onNameChange, name, teams, teamId }) => {
  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>Add a new player</h1>
      <form onSubmit={submitButton}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label className="font-weight-bold">Player name</label>
            <input value={name} className="form-control" onChange={onNameChange} />
          </div>

          <div className="form-group col-md-4">
            <label className="font-weight-bold">Team</label>
            <select className="form-control" value={ teamId } onChange={onTeamChange}>
              <option value=''>Select team</option>
              {
                teams.map(team => (
                  <option key={team.id} value={team.id}>{team.name}</option>
                ))
              }
            </select>
          </div>
        </div>
        <button className="btn btn-success" disabled={name.length === 0 || teamId === ''}>Create</button>
      </form>
    </div>
  )
}
