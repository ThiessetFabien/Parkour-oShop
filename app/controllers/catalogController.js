const { Association } = require('sequelize');
const { Category, Product } = require('../models');

const catalogController = {
    index: async (req, res) => {
        res.render('index');
    },

    productsList: async (req, res) => {
        try {
            // todo, ici il faudra les vrais produits et catégories de la db
            const products = await Product.findAll();
            console.log('products ', { products });

            const categories = await Category.findAll({
                attributes: ['id', 'name'],
            });
            // console.log('categories ', categories);

            res.render('shop', {
                categories,
                products,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    },

    category: async (req, res) => {
        // todo, il faut récupérer la catégorie en fonction de l'id présent dans l'url et la passer à la vue
        try {
            const id = parseInt(req.params.category_id);
            // console.log('category_id ', typeof id);
            const category = await Category.findByPk(id, {
                include: [
                    {
                        association: 'products',
                        attributes: ['id', 'title', 'image', 'price'],
                    },
                ],
            });
            if (!category) {
                return res.redirect('/shop');
            }
            res.render('category', { category });
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    },

    product: async (req, res) => {
        // todo, récupérer le produit demandé en base de données.
        try {
            const id = parseInt(req.params.product_id);
            console.log('id ', id);
            const product = await Product.findByPk(id, {});
            if (!product) {
                return res.redirect('/shop');
            }
            res.render('product', { product });
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    },

    cart: (req, res) => {
        res.render('cart');
    },
};

module.exports = catalogController;
