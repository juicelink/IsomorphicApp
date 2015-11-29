import {a, div} from '@cycle/dom'
import {Observable} from 'rx'
import switchPath from 'switch-path'
import { filterLinks } from '@cycle/history'

export default ({ DOM, History }) => {
  const url$ = DOM
    .select('a')
    .events('click')
    .filter(filterLinks)
    .map(event => event.target.pathname)

  const view$ = History
    .map(({pathname}) => {
      const {value} = switchPath(pathname, {
            '/' : a({href: '/a'}, 'a link'),
            '/a' : a({href: '/'}, 'root link'),
            '*' : div('not found'),
        })
      return value
    })

  return {
    DOM: view$,
    History: url$
  }
}