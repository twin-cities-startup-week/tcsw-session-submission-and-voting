require('dotenv').config();

const development = {
    dialect: 'postgres',
    dialectOptions: {
        useUTC: true,
    },
    host: 'localhost',
    port: 5432,
    database: process.env.DATABASE_NAME,
    migrationStorageTableName: 'sequelize_meta',
};

const production = {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    ssl: {
        rejectUnauthorized: false,
    },
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    migrationStorageTableName: 'sequelize_meta',
};

let test = {};
if (process.env.DATABASE_URL) {
    test = production;
} else {
    test = development;
}

module.exports = {
    development,
    test,
    production,
};
