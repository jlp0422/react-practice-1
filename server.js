/* eslint-disable */
const express = require('express');
const app = express();
const path = require('path');
const db = require('./db')
const { Player, Team } = db.models

app.use('/dist', express.static(path.join(__dirname, 'dist')))
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')))

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get('/api/players', (req, res, next) => {
  Player.findAll({
    include: [ Team ]
  })
  .then( players => res.send(players))
  .catch(next)
})

app.get('/api/teams', (req, res, next) => {
  Team.findAll({
    include: [ Player ]
  })
    .then( teams => res.send(teams))
    .catch(next)
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`port of call: ${port}`))

db.sync()
  .then(() => db.seed())
