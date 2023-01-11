import express from "express"
import session from "express-session"
import dotenv from "dotenv"
import mongoose from "mongoose"

const app = express()

import passport from "passport";
import { strategyLogin, strategySignup } from "./middleware/passportLocal.js"

passport.use('login', strategyLogin);
passport.use('signup', strategySignup)

import routes from './routes/routes.js'

app.set('view engine', 'ejs')
app.set('views', './public/views')

app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.use( session({
    secret: 'secret',
    resave:false,
    saveUninitialized: false,
    cookie: { maxAge:600000 }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get ('/products', (req, res) => {
    res.render('products')
})
app.use(routes)


app.listen(8080, ()=> {
    console.log('Server running on port http://localhost:8080/login')
})











