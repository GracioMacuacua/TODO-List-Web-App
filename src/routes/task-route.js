'use strict'

const controller = require('../controllers/task-controller');
const authService  = require('../services/auth-service');
const express = require('express');
const router = express.Router();

router.get('/', controller.get);
router.get('/id/:id', controller.getById);
router.get('/status/:status', controller.getByStatus)
router.get('/category/:category', controller.getByCategory);
router.post('/', authService.isAdmin, controller.post);
router.put('/:id', controller.put);
router.delete('/', authService.isAdmin, controller.delete);

module.exports = router;