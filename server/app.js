import {body, div, head, html, script, title} from '@cycle/dom'
import {jsBaseUrl, prod} from '../tools/env'
import {main} from '../client/fileNames.json'
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
  responses.History = responses.History.take(1)
  const requests = app(responses)
  requests.DOM = requests.DOM.take(1).map(template)
  return requests
}