import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { users } from '../passport.js';

const router = Router();


router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Реєстрація', error: null });
});

router.get('/signin', (req, res) => {
    const showError = Boolean(req.query.error);
    res.render('signin', {
        title: 'Вхід',
        error: showError ? 'Невірний email або пароль' : null
    });
});



router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render('signup', {
            title: 'Реєстрація',
            error: 'Усі поля обов’язкові'
        });
    }

    if (users.some(u => u.email === email)) {
        return res.render('signup', {
            title: 'Реєстрація',
            error: 'Користувач уже існує'
        });
    }

    const hash = await bcrypt.hash(password, 10);
    users.push({ id: uuid(), email, hash });

    res.redirect('/signin');
});

router.post('/signin',
    passport.authenticate('local', {
        successRedirect: '/protected',
        failureRedirect: '/signin?error=1'
    })
);



router.get('/logout', (req, res, next) => {
    req.logout(err => (err ? next(err) : res.redirect('/')));
});

export default router;
