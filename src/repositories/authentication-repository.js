'use strict'

const User = require('../models/user');

exports.authenticate = async (data) => {
    const res = await User.findOne({
        where: {
            email: data.email,
            password: data.password
        }
    });
    return res;
}