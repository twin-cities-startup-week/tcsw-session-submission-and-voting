const Sequelize = require('sequelize');
const moment = require('moment');
const { sequelize: db } = require('../modules/pool');
const User = require('../models/user.model.js');
const encryptLib = require('../modules/encryption');

async function setPasswordWithToken(email, newPassword, token) {
    if (token.length < 32) {
        throw new Error('Unable to reset password.');
    }
    const user = await User.findOne({
        raw: true,
        attributes: [
            'email',
            'reset_password_sent_at',
        ],
        where: {
            email,
            reset_password_token: token,
        },
    });
    const encryptedPassword = await encryptLib.encryptPassword(newPassword);
    // Expire after 72 hours
    if (user && user.reset_password_sent_at && moment(user.reset_password_sent_at) < moment(new Date()).subtract(72, 'hour')) {
        throw new Error('Password reset link has expired.');
    }
    if (user) {
        await User.update({
            password: encryptedPassword,
        }, {
            where: {
                email,
                reset_password_token: token,
            },
        });
    }
    return user;
}

async function updateResetToken(email, token) {
    const user = await User.findOne({
        raw: true,
        attributes: [
            'email',
            'reset_password_sent_at',
        ],
        where: {
            email,
        },
    });
    if (user && user.reset_password_sent_at && moment(user.reset_password_sent_at) > moment(new Date()).subtract(1, 'hour')) {
        throw new Error('Password reset link already sent, please check your email.');
    }
    if (user) {
        await User.update({
            reset_password_sent_at: Sequelize.literal('CURRENT_TIMESTAMP'),
            reset_password_token: token,
        }, {
            where: {
                email,
            },
        });
    }
    return user;
}

module.exports = {
    setPasswordWithToken,
    updateResetToken,
};