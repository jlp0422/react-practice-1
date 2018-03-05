const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/demo_db', {
  logging: false
});

module.exports = conn
