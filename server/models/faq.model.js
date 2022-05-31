const {
    Model,
    STRING,
    INTEGER,
    TEXT,
    DATE,
    literal,
} = require('sequelize');
const { sequelize } = require('./../modules/pool.js');

class FAQ extends Model { }
FAQ.init({
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    order: {
        type: INTEGER,
        allowNull: true,
    },
    answer: {
        type: TEXT,
        allowNull: false,
    },
    question: {
        type: STRING,
        allowNull: false,
    },
    created_at: {
        type: DATE,
        allowNull: false,
        defaultValue: literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
        type: DATE,
        allowNull: false,
        defaultValue: literal('CURRENT_TIMESTAMP'),
    },
}, {
    underscored: true,
    modelName: 'faq',
    tableName: 'faq',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    sequelize,
});

module.exports = FAQ;
