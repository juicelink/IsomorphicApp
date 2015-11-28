import { createServer } from 'http'
import handler from './handler'

const server = createServer()

server.on('request', handler)
 
server.listen(3002)