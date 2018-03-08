/* eslint-disable */
import React from 'react';

const CreateTeam = ({ onNameChange, submitButton, name }) => {
  return (
    <div>
      <h1>Add a new team</h1>
      <form onSubmit={ submitButton }>
        <label>Team name</label>
        <input value={ name } onChange={ onNameChange }/>
        <button disabled={name.length === 0}>Create</button>
      </form>
    </div>
  )
}

export default CreateTeam;
