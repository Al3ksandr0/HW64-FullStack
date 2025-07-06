import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

export const users = [];

// LocalStrategy: email + пароль 
passport.use(new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
        const user = users.find(u => u.email === email);
        if (!user) {
            return done(null, false, { message: 'Email не зареєстровано' });
        }

        const ok = await bcrypt.compare(password, user.hash);
        if (!ok) {
            return done(null, false, { message: 'Пароль невірний' });
        }

        return done(null, user);
    }
));

// запихиваем id в сессию
passport.serializeUser((user, done) => done(null, user.id));

// вытаскиваем пользователя из id в сессии
passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id) || false;
    done(null, user);
});
