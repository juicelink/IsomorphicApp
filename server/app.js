import {body, div, head, html, script, title} from '@cycle/dom'

import {main} from '../client/fileNames.json'
import {assetsUrl} from '../tools/env'
import app from '../app'

function template(appVTree){
  return html([
    head(
      title('Cycle Isomorphism Sample')
    ),
    body([
      div({id: "app"}, appVTree),
      script({src: main.js})
    ])
  ])
}

export default (responses) => {
  const {DOM, History} = app(responses);
  return {
    DOM : DOM.take(1).map(template),
    History : History
  }
}