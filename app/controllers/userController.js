const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const { User, Role } = require('../models');

const userController = {
    index: (req, res) => {
        res.render('register');
    },

    register: async (req, res) => {
        try {
            // !! votre code à partir d'ici
            const { firstname, lastname, email, password, passwordConfirm } =
                req.body;
            // verifier l'email avec le package npm email-validator
            // console.log('email validator ', emailValidator.validate(email));
            if (!emailValidator.validate(email)) {
                return res.render('register', {
                    errorMessage: 'Email invalide',
                });
            }

            // verifier si password correspond à password confirm
            console.log('mdp identiques ', password === passwordConfirm);
            if (password !== passwordConfirm) {
                return res.render('register', {
                    errorMessage: 'Les mots de passe ne correspondent pas',
                });
            }
            const userExist = await User.findOne({
                name: `${this.name} ${this.lastname}`,
                email: this.email,
            });
            if (userExist) {
                return res.render('register', {
                    errorMessage: 'Ce compte existe déjà',
                });
            }
            // hash password
            const salt = await bcrypt.genSalt(15);
            // console.log('salt ', salt);
            const hash = await bcrypt.hash(password, salt);
            // console.log('hash ', hash);

            // attribuer un rôle ici, le role customer.

            await User.create({
                name: `${firstname} ${lastname}`,
                email,
                password: hash,
                role_id: 1,
            });

            // sauvegarder user

            // !! ne pas modifier cette ligne
            res.render('login', {
                message: 'Vous pouvez maintenant vous connecter !',
            });
        } catch (error) {
            console.log(error);
            res.render('register', { error: error.message });
        }
    },

    show: async (req, res) => {
        res.render('dashboard/dashboard');
    },
};

module.exports = userController;
