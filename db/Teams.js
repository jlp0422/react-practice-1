/* eslint-disable */
const conn = require('./conn')
const { Sequelize } = conn

const Team = conn.define('team', {
  name: Sequelize.STRING
})

module.exports = Team
