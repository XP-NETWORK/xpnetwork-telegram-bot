import * as express from 'express'
import * as bodyParser from 'body-parser'
import {TelegramBot} from './service/telegramBot'
import {randomId} from './tools/string'
import * as path from 'path'
import * as fs from 'fs'
const app = express()

app.use(bodyParser.json())
app.use('/public', express.static(path.resolve(__dirname + '/../public')))


app.post('/', (req,res) => {
    new TelegramBot().processTelegramUpdate(req.body)
    res.send({ok: true})
})
app.post('/new-captcha', (req,res) => {
    new TelegramBot().newCaptcha(req.body)
    res.send({ok: true})
})

app.listen(process.env.PORT || 3005, () => console.log('Server is up'))