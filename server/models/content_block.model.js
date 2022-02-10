const {
    Model,
    STRING,
    INTEGER,
    TEXT,
    DATE,
    literal,
} = require('sequelize');
const { sequelize } = require('./../modules/pool.js');

class ContentBlock extends Model { }
ContentBlock.init({
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: TEXT,
        allowNull: false,
    },
    name: {
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
    modelName: 'content_block',
    tableName: 'content_block',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    sequelize,
});

module.exports = ContentBlock;
