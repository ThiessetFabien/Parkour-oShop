const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const { User, Role } = require('../models');

const sessionController = {
    index: (req, res) => {
        res.render('login');
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            // !! Votre code à partir d'ici
            if (!emailValidator.validate(email)) {
                return res.render('login', {
                    error: 'Email incorrect',
                });
            }
            // On récupère user avec email et inclure le role
            // Si on ne trouve pas l'user :
            const user = await User.findOne({
                where: { email },
                attribute: 'id',
                include: 'role',
            });
            // console.log('user ', user);
            // Est-ce que l'utilisateur existe en BDD ?
            if (!user) {
                return res.render('login', {
                    error: "Utilisateur n'existe pas",
                    //      on envoie un message d'erreur dans un objet:  {error: "Utilisateur ou mot de passe incorrect"} et on render `login` en lui passant l'erreur
                });
            }
            // Sinon on continue.
            // Le mot de passe est il correct ?
            const passwordIsValid = await bcrypt.compare(
                // On compare le mots de passe du formulaire avec celui de l'utilisateur
                password,
                user.password
            );
            // console.log('validation password ', passwordIsValid);
            if (!passwordIsValid) {
                // Si le mot de passe est incorrect : on envoie un message d'erreur dans un objet:  {error: "Utilisateur ou mot de passe incorrect"} et on render `login` en lui passant l'erreur
                return res.render('login', {
                    error: 'Utilisateur ou mot de passe incorrect',
                });
            }

            // On ajoute user a la session
            const formattedUser = {
                id: user.id,
                name: user.name,
                role: {
                    name: user.role.name,
                },
            };
            req.session.user = formattedUser;
            // console.log('a ', formattedUser);

            // console.log('c ', user.id);
            // On enlève le mot de passe de la session.

            // !! Ne pas modifier cette ligne
            res.redirect('/');
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Server Error');
        }
    },

    logout: (req, res) => {
        // !! Votre code ici
        req.session.user = null;
        res.redirect('/');
    },
};

module.exports = sessionController;
