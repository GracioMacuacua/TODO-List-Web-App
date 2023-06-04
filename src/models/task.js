'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../bin/db');
const User = require('./user');

const Task = sequelize.define('Task', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    expiresAt: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        enum: ['Pendente', 'Concluída'],
        defaultValue: 'Pendente'
    },
    nota: {
        type: Sequelize.STRING
    },
    actor_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
},
{
    timestamps: true,
    createdAt: false,
    updatedAt: true
});

module.exports = Task;