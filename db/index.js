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
    Player.create({ name: 'Dion Waiters'}),
    Player.create({ name: 'Larry Nance Jr.'}),
    Player.create({ name: 'James Harden' }),
    Team.create({ name: 'Miami Heat'}),
    Team.create({ name: 'Cleveland Cavaliers'}),
    Team.create({ name: 'Houston Rockets'})
  ])
  .then(([lebron, wade, love, dion, nance, harden, heat, cavs, rockets]) => {
    lebron.setTeam(cavs)
    wade.setTeam(heat)
    love.setTeam(cavs)
    dion.setTeam(heat)
    nance.setTeam(cavs)
    harden.setTeam(rockets)
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
