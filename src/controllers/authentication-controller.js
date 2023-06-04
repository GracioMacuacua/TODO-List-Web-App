'use strict'

const repository = require('../repositories/authentication-repository');
const userRepository = require('../repositories/user-repository');
const authService = require('../services/auth-service');
const { saltKey } = require('../../config');
const md5 = require('md5');

exports.authenticate = async (req, res, next) => {
    try {
        const user = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + saltKey)
        });

        if (!user) {
            res.status(404).send({
                message: 'Usuário ou senha inválidos!'
            });
            return;
        }
        
        const token = await authService.generateToken({
            id: user.id,
            email: user.email,
            name: user.name,
            access: user.access
        });

        res.status(200).send({
            token: token,
            user: {
                email: user.email,
                name: user.name,
                access: user.access
            }
        });
    } catch (e) {
        console.log('Erro em authenticate / authentication-controller')
    }
}

exports.refreshToken = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const user = await userRepository.getById(data.id);
        
        if (!user) {
            res.status(404).send({
                message: 'Usuário não encontrado!'
            });
            return;
        }
        
        const tokenData = await authService.generateToken({
            id: user.id,
            email: user.email,
            name: user.name,
            access: user.access
        });

        res.status(201).send({
            token: tokenData,
            user: {
                email: user.email,
                name: user.name,
                access: user.access
            }
        });
    } catch (e) {
        console.log('Erro em refreshToken / authentication-controller.')
    }
}