import passport from "passport";
import { Router } from 'express'
import { isAuth } from '../middleware/isAuth.js'
import { loggerInfo, loggerError, loggerWarn } from '../utils/log4js.js'
const routes = Router()

//INDEX
routes.get('/', (req, res) => {
    try{
        loggerInfo.info('Se ha accedido a Productos')
        res.render('products', {user: req.session.user});
    } catch (error) {
        loggerError.error(`Error en / ${error}`)
        res.send('Error en /')
    }
});

//LOGIN
routes.get('/login', (req, res) => {
    try{
        loggerInfo.info('Se ha accedido a Login')
        if (req.isAuthenticated()) return res.redirect('/products')
        res.render('login')
    } catch (error) {
        loggerError.error(`Error en /login ${error}`)
        res.send('Error en /login')
    }
})

routes.post('/login', passport.authenticate('login', {failureRedirect: '/login-error'}), (req, res) => res.redirect('/products'))

//SIGNUP
routes.get('/signup', (req, res) => {
    try{
        loggerInfo.info('Se ha accedido a Signup')
        if (req.isAuthenticated()) return res.redirect('/login')
        res.render('signup')
    } catch (error) {
        loggerError.error(`Error en /signup ${error}`)
        res.send('Error en /signup')
    }
})

routes.post('/signup', passport.authenticate('signup', {failureRedirect: '/signup-error'}), (req, res) => res.redirect('/login'))

//LOGOUT

routes.get('/logout', isAuth, (req, res) => {
    try{
        loggerInfo.info('Se ha accedido a Logout')
        req.logout(err => {
            if (err) return err
            res.redirect('/login')
        })
    } catch (error) {
        loggerError.error(`Error en /logout ${error}`)
        res.send('Error en /logout')
    }
})

//ERRORS
routes.get('/login-error', (req, res) => {
    try{
        loggerInfo.info('Se ha accedido a Login-Error')
        if (req.isAuthenticated()) return res.redirect('/products')
        res.render('login-error')
    } catch (error) {
        loggerError.error(`Error en /login-error ${error}`)
        res.send('Error en /login-error')
    }
})
routes.get('/signup-error', (req, res) => {
    try{
        loggerInfo.info('Se ha accedido a Signup-Error')
        if (req.isAuthenticated()) return res.redirect('/products')
        res.render('signup-error')
    } catch (error) {
        loggerError.error(`Error en /signup-error ${error}`)
        res.send('Error en /signup-error')
    }
})


export default routes