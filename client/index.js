import {run} from '@cycle/core'
import {makeDOMDriver} from '@cycle/dom'
import {makeHistoryDriver} from '@cycle/history'
import {Observable} from 'rx'
import app from './app'

run(app, { 
    DOM: makeDOMDriver('#app'),
    History: makeHistoryDriver()
})