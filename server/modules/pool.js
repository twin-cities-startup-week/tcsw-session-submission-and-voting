const pg = require('pg');
const Sequelize = require('sequelize');
const url = require('url');
const { logDebug, logError } = require('./logger');

// Postgres was converting the string to a date which shifted time by two hours.
// Setting the parser returns time as a string which avoids the time shift.
// https://60devs.com/working-with-postgresql-timestamp-without-timezone-in-node.html
// 1114 is OID for timestamp in Postgres, return string as is
pg.types.setTypeParser(1114, str => str);

const generateConfig = () => {
  let config = {};
  if (process.env.DATABASE_URL) {
    // Heroku gives a url, not a connection object
    // https://github.com/brianc/node-pg-pool
    const params = url.parse(process.env.DATABASE_URL);
    const auth = params.auth.split(':');
    config = {
      dialect: 'postgres',
      user: auth[0],
      username: auth[0],
      password: auth[1],
      host: params.hostname,
      port: params.port,
      database: params.pathname.split('/')[1],
      ssl: {
        rejectUnauthorized: false,
      },
      pool: {
        max: 10,
        min: 0,
        idle: 10000,
      },
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    };
  } else {
    config = {
      dialect: 'postgres',
      dialectOptions: {
        useUTC: true, // for reading from database
      },
      host: 'localhost', // Server hosting the postgres database
      port: '5432', // env var: PGPORT
      database: process.env.DATABASE_NAME || 'prime_staging',
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
    };
  }
  if (
    process.env.NODE_ENV === 'test'
    || process.env.NODE_ENV === 'production'
    || process.env.DB_LOG_TRACE === 'false'
  ) {
    config.logging = false;
  }
  if (process.env.NODE_ENV === 'test') {
    config.pool = {
      max: 2,
      min: 0,
      idle: 1000,
    };
  }
  return config;
};
const dbConfig = generateConfig();
// this creates the pool that will be shared by all other modules
const pool = new pg.Pool(dbConfig);

pool.on('connect', () => {
  logDebug('Connected to pg');
});

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err) => {
  logError('Unexpected error on idle client', err);
  process.exit(-1);
});

pool.on('remove', () => {
  logDebug('Pool connection removed');
});

const sequelize = new Sequelize(dbConfig);

module.exports = {
  pool,
  generateConfig,
  sequelize,
};
