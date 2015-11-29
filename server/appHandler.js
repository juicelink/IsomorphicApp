import app from './app'
import {run} from '@cycle/core'
import {makeHTMLDriver} from '@cycle/dom'
import {makeServerHistoryDriver} from '@cycle/history'
import { createLocation } from 'history'
import {Observable} from 'rx'


export default ({url}, res, next) => {   
    const {sources} = run(app, {
        DOM: makeHTMLDriver(),
        History: makeServerHistoryDriver(createLocation(url))
    })
    sources.DOM.map(html => `<!doctype html>${html}`)
        .subscribe(html => {
            res.send(html)
            next()
        })
}