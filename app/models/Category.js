const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Category extends Sequelize.Model {}

Category.init({
    name: {
        type: DataTypes.STRING,
    },
    sequelize,
    tableName: 'categories',
}),

(module.exports = sequelize);
/***
 * Voici les champs nécessaires pour le Model
 * name string
 * tableName: 'categories',
 */

module.exports = Category;
