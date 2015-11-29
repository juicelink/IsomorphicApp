import {a, div} from '@cycle/dom'
import {Observable} from 'rx'
import switchPath from 'switch-path'
import { filterLinks } from '@cycle/history'

const intent = ({DOM, History}) => {
  return {
    nextUrl$ : DOM
          .select('a')
          .events('click')
          .filter(filterLinks)
          .map(event => event.target.pathname),
    url$ : History.map(({pathname}) => pathname)
  }
}

const model = ({nextUrl$, url$}) => {
  return {
    nextUrl$ : nextUrl$,
    page$ : url$.map(pathname =>
        switchPath(pathname, {
              '/' : {href: '/a',content: 'a link'},
              '/a' : {href: '/',content: 'root link'},
              '*' : {href: '/',content: 'not found'},
          }).value
      )
  }
}

const view = ({page$, nextUrl$}) => {
  return {
    History : nextUrl$,
    DOM : page$.map(page => a({href: page.href}, page.content))
  }
}

export default responses => view(model(intent(responses)))