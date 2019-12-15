require('dotenv').config();

const {
  PORT,
  PGHOST,
  PGUSER,
  PGPASSWORD,
  PGDB,
  APP_KEY,
} = process.env;

const port = PORT || 8000;

module.exports = {
  port,
  db: {
    host: PGHOST,
    user: PGUSER,
    password: PGPASSWORD,
    database: PGDB,
  },
  appKey: APP_KEY,
};
