import app from './app'
import {run} from '@cycle/core'
import {makeHTMLDriver} from '@cycle/dom'
import {makeServerHistoryDriver} from '@cycle/history'
import { createLocation } from 'history'
import {Observable} from 'rx'


export default ({url}, res) => {
    if (url === '/favicon.ico') {
        res.writeHead(200, {'Content-Type': 'image/x-icon'})
        res.end()
        return
    }
    
    res.setHeader('Content-Type', 'text/html; charset=UTF–8')

    const {sources} = run(app, {
        DOM: makeHTMLDriver(),
        History: makeServerHistoryDriver(createLocation(url))
    })
    sources.DOM.map(html => `<!doctype html>${html}`).subscribe(html => res.end(html))
}