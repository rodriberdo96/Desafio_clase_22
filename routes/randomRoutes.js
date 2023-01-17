import { Router } from "express";
import {fork} from 'child_process'

const router = Router();

router.get('/random', (req, res) => {
    let cant = req.query.cant || 10000
    let passcant = ['' + cant + '']
    const child = fork('./utils/random.js')
    child.send(passcant)
    child.on('message', (operation) => {
        res.render('random', {operation: operation})
    })
})

export default router;