/* eslint-disable */
const conn = require('./conn');
const Team = require('./Teams');
const Player = require('./Players');

const sync = () => {
  return conn.sync({ force: true })
}

const seed = () => {
  return Promise.all([
    Player.create({ name: 'LeBron James'}),
    Player.create({ name: 'Dwyane Wade'}),
    Player.create({ name: 'Kevin Love'}),
    Team.create({ name: 'Miami Heat'}),
    Team.create({ name: 'Cleveland Cavaliers'})
  ])
  .then(([lebron, wade, love, heat, cavs]) => {
    lebron.setTeam(cavs)
    wade.setTeam(heat)
    love.setTeam(cavs)
  })
}

Player.belongsTo(Team)
Team.hasMany(Player)

module.exports = {
  sync,
  seed,
  models: {
    Team,
    Player
  }
}
