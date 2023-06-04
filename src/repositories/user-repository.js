'use strict'

const User = require('../models/user');

exports.get = async () => {
    const res = await User
        .findAll({
            attributes: ['id', 'name', 'email', 'access']
        });
    return res;
}

exports.getById = async (id) => {
    const res = await User
        .findByPk(id, {
            attributes: ['id', 'name', 'email', 'access']
        });
    return res;
}

exports.create = async (data) => {
    await User
        .create(data);
}

exports.update = async (id, data) => {
    await User
        .update(
            data,
            {
                where: {
                    id: id
                }
            });
}

exports.delete = async (id) => {
    await User
        .destroy({
            where: {
                id: id
            }
        });
}