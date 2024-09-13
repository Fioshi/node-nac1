const express = require('express');
const route = express.Router();
const controller = require('../controllers/produto-controller');

route.get('/', controller.get);

route.post('/', controller.post);

route.delete('/:id', controller.delete);

route.put('/:id', controller.update);

module.exports = route