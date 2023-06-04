'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../bin/db');

const User = sequelize.define('User', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    access: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['admin', 'user'],
        defaultValue: 'user'
    }
},
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    });

module.exports = User;