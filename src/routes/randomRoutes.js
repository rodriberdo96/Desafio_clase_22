import { Router } from "express";
import {fork} from 'child_process'
import { loggerInfo, loggerError } from '../utils/log4js.js'

const router = Router();

router.get('/random', (req, res) => {
    try{
        loggerInfo.info('Se ha accedido a /random')
        let cant = req.query.cant || 10000
        let passcant = ['' + cant + '']
        const child = fork('./utils/random.js')
        child.send(passcant)
        child.on('message', (operation) => {
            res.render('random', {operation: operation})
        })
    } catch (error) {
        loggerError.error(`Error en /random ${error}`)
        res.send('Error en /random')
    }
})

export default router;