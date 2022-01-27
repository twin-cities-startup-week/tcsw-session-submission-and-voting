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

class Session extends Model { }

Session.init({
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: STRING,
        validate: {
            notEmpty: true,
            len: {
                args: [0, 255],
                msg: 'Please provide a value less than 255 characters.',
            },
        },
        allowNull: false,
    },
    email: {
        type: STRING,
        validate: {
            notNull: true,
            isEmail: true,
        },
        allowNull: false,
    },
    phone: STRING,
    user_id: {
        type: INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
        allowNull: false,
    },
    industry: STRING,
    track: STRING,
    covid: BOOLEAN,
    speakers: STRING, /* Who would you like to speak at your event? */
    diversity: BOOLEAN,
    purpose: STRING,
    location: STRING,
    location_details: STRING,
    time: STRING,
    date: STRING,
    votes: INTEGER,
    host: STRING,
    description: STRING,
    attendees: STRING,
    length: STRING, /* Approx how long will your event be? */
    format: STRING,
    area_of_interest: STRING, /* Does your event cater to one or more of the following? */
    media: TEXT, /* links to youtube? */
    image: TEXT, /* STRETCH, AWS S3 bucket. */
    success: STRING,
    excited: STRING,
    other_hosts: STRING,
    other_info: STRING,
    awaiting_approval: {
        type: BOOLEAN,
        defaultValue: false,
    },
    approved: {
        type: BOOLEAN,
        defaultValue: false,
    },
    created_at: {
        type: DATE,
        allowNull: false,
        defaultValue: literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
        type: DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
}, {
    underscored: true,
    modelName: 'session',
    tableName: 'session',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    sequelize,
});

module.exports = Session;
