import passport from "passport";
import { Router } from 'express'
import { isAuth } from '../middleware/isAuth.js'

const routes = Router()

//INDEX
routes.get('/', isAuth, (req, res) => res.render('products', {
    user: req.user
}))

//LOGIN
routes.get('/login', (req, res) => res.render('login'))

routes.post('/login', passport.authenticate('login', {
    successRedirect: '/products',
    failureRedirect: '/login-error',
    failureFlash: true
}))

//REGISTER
routes.get('/register', (req, res) => res.render('register'))

routes.post('/register', passport.authenticate('register', {
    successRedirect: '/products',
    failureRedirect: '/register-error',
    failureFlash: true
}))

//LOGOUT

routes.get('/logout', (req, res) => {
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
routes.get('/register-error', (req, res) => {
    if (req.isAuthenticated()) return res.redirect('/products')
    res.render('register-error')
})


export default routes