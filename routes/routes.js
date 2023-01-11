import passport from "passport";
import { Router } from 'express'
import { isAuth } from '../middleware/isAuth.js'

const routes = Router()

//INDEX
routes.get('/', (req, res) => {
    res.render('products', {user: req.session.user});
});

//LOGIN
routes.get('/login', (req, res) => {
    if (req.isAuthenticated()) return res.redirect('/products')
    res.render('login')
})

routes.post('/login', passport.authenticate('login', {failureRedirect: '/login-error'}), (req, res) => res.redirect('/products'))

//SIGNUP
routes.get('/signup', (req, res) => {
    if (req.isAuthenticated()) return res.redirect('/login')
    res.render('signup')
})

routes.post('/signup', passport.authenticate('signup', {failureRedirect: '/signup-error'}), (req, res) => res.redirect('/login'))

//LOGOUT

routes.get('/logout', isAuth, (req, res) => {
    req.logout(err => {
        if (err) return err
        res.redirect('/login')
    })
})

//ERRORS
routes.get('/login-error', (req, res) => {
    if (req.isAuthenticated()) return res.redirect('/products')
    res.render('login-error')
})
routes.get('/signup-error', (req, res) => {
    if (req.isAuthenticated()) return res.redirect('/products')
    res.render('signup-error')
})


export default routes