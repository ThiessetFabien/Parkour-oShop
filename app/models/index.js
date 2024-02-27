const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const Role = require('./Role');

// Un produit peut avoir une catégorie
Product.belongsTo(Category, {
    foreignKey: 'category_id',
    // Associer les produits aux catégories (as category)
    as: 'category'
});
// Une catégorie peut avoir des produits
Category.hasMany(Product, {
    foreignKey: 'category_id',
    // Associer les catégories aux produits (as products)
    as: 'products'
});

Role.hasMany(User, {
    foreignKey: 'role_id',
    as: 'users',
});

User.belongsTo(Role, {
    foreignKey: 'role_id',
    as: 'role',
});

module.exports = { User, Category, Product, Role };
