
const {DataTypes, Model} = require('sequelize');
const sequelize          = require("../config/db");

class TodosModels extends Model {}

TodosModels.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: 
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    description:
    {
        type : DataTypes.STRING,
        allowNull: false, 
    }
},{
    sequelize,
    modelName: 'todos'
});

module.exports = TodosModels;