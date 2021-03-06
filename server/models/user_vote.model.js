const {
    Model,
    STRING,
    INTEGER,
    BOOLEAN,
    DATE,
    literal,
} = require('sequelize');
const { sequelize } = require('./../modules/pool.js');

class UserVote extends Model { }
UserVote.init({
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: INTEGER,
        references: {
            model: 'user',
            key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
        allowNull: false,
    },
    session_id: {
        type: INTEGER,
        references: {
            model: 'session',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
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
    modelName: 'user_vote',
    tableName: 'user_vote',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    sequelize,
    uniqueKeys: {
        actions_unique: {
            fields: ['session_id', 'user_id']
        }
    }
});

module.exports = UserVote;
