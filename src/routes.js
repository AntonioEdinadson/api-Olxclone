const express = require('express');
const routes = express.Router();

const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const AdsController = require('./controllers/AdsController');

const Auth = require('./middlewares/Auth');
const AuthValidator = require('./validators/AuthValidator');

routes.get('/states', UserController.getStates);

routes.post('/user/signin', AuthValidator.signin, AuthController.signin);
routes.post('/user/signup', AuthValidator.signup, AuthController.signup);

routes.get('/user/me', Auth.private, UserController.info);
routes.put('/user/me', Auth.private, UserController.editAction);

routes.get('/categories', AdsController.getCategories);

routes.get('/ad/list', AdsController.getList);
routes.get('/ad/item', AdsController.getItem);

routes.post('/ad/add', Auth.private, AdsController.addAction);
routes.post('/ad/:id', Auth.private, AdsController.editAction);

module.exports = routes;