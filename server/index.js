import express from 'express'
import appHandler from './appHandler'
import {assetsDir, assetsPath} from '../tools/env'
import serveFavicon from 'serve-favicon'
import path from 'path'

const favicon = require('file?name=favicon.ico!./favicon.ico')

const server = express()

server.use(serveFavicon(path.join(__dirname, favicon)))
server.use(assetsDir, express.static(assetsPath))

server.use(appHandler)

server.listen(3002)