const express = require("express");
const Router = express.Router();

const TodoController = require("../controllers/TodoController");
const authMiddleware = require("../middleware/authMiddleware");

Router.get('/', authMiddleware, TodoController.getAll);
Router.post('/', authMiddleware, TodoController.create);
Router.get('/:id_order', authMiddleware, TodoController.getById); 
Router.put('/:id_order', authMiddleware, TodoController.update);
Router.delete('/:id_order', authMiddleware, TodoController.delete);


module.exports = Router;