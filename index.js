import express from "express"
import session from "express-session"
import dotenv from "dotenv"
import mongoose from "mongoose"
import PORT from "./utils/minimist.js"
const app = express()
import randomRoutes from "./routes/randomRoutes.js"
import passport from "passport";
import cluster from 'cluster'
import os from 'os'
import { strategyLogin, strategySignup } from "./middleware/passportLocal.js"

const args = minimist(process.argv.slice(2))
const numCPUs = os.cpus().length

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
app.use('/api', randomRoutes)





if (modoServer == 'CLUSTER') {
    if (cluster.isPrimary) {

        console.log(`Master ${process.pid} id running`)
    
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork()  
        }
        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`)
        })
    } else {
        app.listen(PORT, () => console.log(`http://localhost:${PORT}/login/ o http://localhost:${PORT}/api/random/`))
    
        console.log(`Worker ${process.pid} started`)
    }
} else {
    app.listen(PORT, () => console.log(`http://localhost:${PORT}/login/ o http://localhost:${PORT}/api/random/`))
}











