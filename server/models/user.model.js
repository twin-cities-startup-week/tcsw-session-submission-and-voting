const {
    Model,
    STRING,
    BOOLEAN,
    INTEGER,
    DATE,
    DATEONLY,
    TEXT,
    literal,
} = require('sequelize');
const { sequelize } = require('./../modules/pool.js');
const UserVote = require('./user_vote.model.js');
const Session = require('./session.model.js');

class User extends Model {
    toJSON() {
        // hide protected fields
        const attributes = Object.assign({}, this.get());
        delete attributes.password;
        delete attributes.reset_password_token;
        return attributes;
    }
}

User.init({
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: STRING,
        validate: {
            notEmpty: true,
            len: {
                args: [0, 50],
                msg: 'Please provide a value less than 50 characters.',
            },
        },
        allowNull: false,
    },
    email: {
        type: STRING,
        validate: {
            notNull: true,
            isEmail: true,
            len: {
                args: [0, 255],
                msg: 'Please provide a value less than 255 characters.',
            },
        },
        allowNull: false,
    },
    password: TEXT,
    google_id: TEXT,
    first_name: {
        type: STRING,
        validate: {
            notEmpty: true,
            len: {
                args: [0, 50],
                msg: 'Please provide a value less than 50 characters.',
            },
        },
        allowNull: false,
    },
    middle_name: {
        type: STRING,
        validate: {
            len: {
                args: [0, 50],
                msg: 'Please provide a value less than 50 characters.',
            },
        },
    },
    last_name: {
        type: STRING,
        validate: {
            notEmpty: true,
            len: {
                args: [0, 50],
                msg: 'Please provide a value less than 50 characters.',
            },
        },
        allowNull: false,
    },
    admin: {
        type: BOOLEAN,
        defaultValue: false,
    },
    photo_content_type: STRING,
    photo_file_size: INTEGER,
    photo_file_name: STRING,
    photo_updated_at: {
        type: DATE,
    },
    phone: {
        type: STRING,
        validate: {
            not: {
                args: ['[a-z]', 'i'], // will not allow letters
                msg: 'Phone must be numbers or dashes',
            },
            notEmpty: true,
        },
        allowNull: false,
    },
    linkedin_account: {
        type: STRING,
        validate: {
            len: {
                args: [0, 2048],
                msg: 'Please provide a value less than 2048 characters.',
            },
        },
    },
    twitter_account: {
        type: STRING,
        validate: {
            len: {
                args: [0, 2048],
                msg: 'Please provide a value less than 2048 characters.',
            },
        },
    },
    github_account: {
        type: STRING,
        validate: {
            len: {
                args: [0, 2048],
                msg: 'Please provide a value less than 2048 characters.',
            },
        },
    },
    website_link: {
        type: STRING,
        validate: {
            len: {
                args: [0, 2048],
                msg: 'Please provide a value less than 2048 characters.',
            },
        },
    },
    reset_password_token: STRING,
    reset_password_sent_at: {
        type: DATE,
    },
    remember_created_at: {
        type: DATE,
    },
    sign_in_count: INTEGER,
    current_sign_in_at: {
        type: DATE,
    },
    last_sign_in_at: {
        type: DATE,
    },
    current_sign_in_ip: STRING,
    last_sign_in_ip: STRING,
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
    modelName: 'user',
    tableName: 'user',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    sequelize,
});

User.hasMany(UserVote, { foreignKey: 'user_id' });
UserVote.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Session, { foreignKey: 'user_id' });
Session.belongsTo(User, { foreignKey: 'user_id' });
Session.hasMany(UserVote, { foreignKey: 'session_id' });
UserVote.belongsTo(Session, { foreignKey: 'session_id' });

module.exports = User;
