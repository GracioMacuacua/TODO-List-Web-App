'use strict'

const Task = require('../models/task');

exports.get = async () => {
    const res = await Task
        .findAll();
    return res;
}

exports.getById = async (id) => {
    const res = await Task
        .findByPk(id);
    return res;
}

exports.getByStatus = async (status) => {
    const res = await Task
        .findAll({
            where: {
                status: status
            }
        });
    return res;
}

exports.getByCategory = async (category) => {
    const res = await Task
        .findAll({
            where: {
                category: category
            }
        });
    return res;
}

exports.create = async (data) => {
    await Task
        .create(data);
}

exports.update = async (id, data) => {
    await Task
        .update(
            data,
            {
                where: {
                    id: id
                }
            });
}

exports.delete = async (id) => {
    await Task
        .destroy({
            where: {
                id: id
            }
        });
}