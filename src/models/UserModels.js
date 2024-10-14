
const {DataTypes, Model} = require('sequelize');
const sequelize          = require("../config/db");

class UserModels extends Model {}

UserModels.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: 
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    email:
    {
        type : DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password:{
        type : DataTypes.STRING,
        allowNull: false,
        unique: true
    }
},{
    sequelize,
    modelName: 'users'
});

module.exports = UserModels;