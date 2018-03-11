/* eslint-disable */
const express = require('express');
const app = express();
const path = require('path');
const db = require('./db')
const { Player, Team } = db.models

app.use('/dist', express.static(path.join(__dirname, 'dist')))
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')))

app.use(require('body-parser').json())

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get('/api/players', (req, res, next) => {
  Player.findAll({
    include: [ Team ],
    order: [ 'name']
  })
  .then( players => res.send(players))
  .catch(next)
})

app.get('/api/teams', (req, res, next) => {
  Team.findAll({
    include: [ Player ],
  })
    .then( teams => res.send(teams))
    .catch(next)
})

app.post('/api/players', (req, res, next) => {
  Player.create(req.body)
    .then(player => {
      return Player.findById(player.id, {
        include: [ Team ]
      })
    })
    .then( player => res.send(player))
    .catch(next)
})

app.post('/api/teams', (req, res, next) => {
  Team.create(req.body)
    .then(team => {
      return Team.findById(team.id, {
        include: [ Player ]
      })
    })
    .then( team => res.send(team))
    .catch(next)
})

app.put('/api/players/:id', (req, res, next) => {
  // console.log(req.body)
  Player.findById(req.params.id)
    .then( player => {
      player.teamId = req.body.newTeam.id
      player.team = req.body.newTeam
      return player.save()
    })
    .then( player => res.send(player))
    .catch(next)
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`port of call: ${port}`))

db.sync()
  .then(() => db.seed())
