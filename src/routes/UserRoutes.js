const express = require("express");
const Router = express.Router();

const UserController = require("../controllers/UserController");

Router.post('/login', UserController.login); 

Router.get('/', UserController.getAll);
Router.post('/', UserController.create);


module.exports = Router;