/* eslint-disable */
const conn = require('./conn')
const { Sequelize } = conn

const Player = conn.define('player', {
  name: Sequelize.STRING
})

module.exports = Player
